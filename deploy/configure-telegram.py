#!/usr/bin/env python3
import getpass
import json
import os
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
from pathlib import Path

ENV_FILE = Path("/srv/elvn-studio/shared/studio.env")
RUNTIME_ENV_FILE = Path("/srv/elvn-studio/shared/runtime.env")
CURRENT_RELEASE = Path("/srv/elvn-studio/current")
DEPLOYED_COMMIT_FILE = Path("/srv/elvn-studio/DEPLOYED_COMMIT")
HEALTH_URL = "http://127.0.0.1:3021/api/health"


def telegram_call(token: str, method: str, payload: dict | None = None) -> dict:
    data = None
    headers = {}
    if payload is not None:
        data = json.dumps(payload).encode()
        headers["content-type"] = "application/json"
    request = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/{method}", data=data, headers=headers
    )
    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            result = json.load(response)
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
        raise RuntimeError(f"Telegram API request failed: {type(error).__name__}") from error
    if not result.get("ok"):
        raise RuntimeError("Telegram rejected the request")
    return result


def latest_private_chat(updates: dict) -> str | None:
    for update in reversed(updates.get("result", [])):
        message = update.get("message") or update.get("edited_message")
        chat = message.get("chat") if message else None
        if chat and chat.get("type") == "private" and chat.get("id") is not None:
            return str(chat["id"])
    return None


def update_environment(token: str, chat_id: str) -> None:
    existing = ENV_FILE.read_text().splitlines()
    replacements = {
        "CONTACT_MODE": "telegram",
        "TELEGRAM_BOT_TOKEN": token,
        "TELEGRAM_CHAT_ID": chat_id,
    }
    output = []
    seen = set()
    for line in existing:
        key = line.split("=", 1)[0] if "=" in line else ""
        if key in replacements:
            output.append(f"{key}={replacements[key]}")
            seen.add(key)
        else:
            output.append(line)
    for key, value in replacements.items():
        if key not in seen:
            output.append(f"{key}={value}")

    file_descriptor, temporary_name = tempfile.mkstemp(dir=ENV_FILE.parent, prefix="studio.env.")
    try:
        with os.fdopen(file_descriptor, "w") as temporary_file:
            temporary_file.write("\n".join(output) + "\n")
        os.chmod(temporary_name, 0o600)
        os.replace(temporary_name, ENV_FILE)
    finally:
        if os.path.exists(temporary_name):
            os.unlink(temporary_name)


def read_environment(path: Path) -> dict[str, str]:
    values = {}
    for line in path.read_text().splitlines():
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            values[key] = value
    return values


def recreate_container() -> None:
    compose_file = CURRENT_RELEASE / "compose.production.yml"
    if not compose_file.is_file() or not RUNTIME_ENV_FILE.is_file() or not DEPLOYED_COMMIT_FILE.is_file():
        raise RuntimeError("Production release metadata is incomplete")

    environment = os.environ.copy()
    environment.update(read_environment(RUNTIME_ENV_FILE))
    environment["RELEASE_TAG"] = DEPLOYED_COMMIT_FILE.read_text().strip()
    subprocess.run(
        [
            "docker",
            "compose",
            "--project-name",
            "elvn-studio",
            "--file",
            str(compose_file),
            "up",
            "--detach",
            "--force-recreate",
            "--no-build",
        ],
        check=True,
        env=environment,
        stdout=subprocess.DEVNULL,
    )


def wait_for_health() -> None:
    for _ in range(12):
        try:
            with urllib.request.urlopen(HEALTH_URL, timeout=3) as response:
                if response.status == 200:
                    return
        except (urllib.error.URLError, OSError):
            time.sleep(2)
    raise RuntimeError("The site did not become healthy after recreation")


def main() -> int:
    if os.geteuid() != 0:
        print("Run this configurator as root.", file=sys.stderr)
        return 1
    if not ENV_FILE.is_file():
        print(f"Missing {ENV_FILE}", file=sys.stderr)
        return 1

    token = getpass.getpass("Telegram Bot Token (hidden): ").strip()
    if ":" not in token or len(token) < 20:
        print("The token format is invalid.", file=sys.stderr)
        return 1

    bot = telegram_call(token, "getMe").get("result", {})
    chat_id = latest_private_chat(telegram_call(token, "getUpdates"))
    if chat_id is None:
        print("No private chat found. Send /start to the bot and run this command again.", file=sys.stderr)
        return 1

    update_environment(token, chat_id)
    recreate_container()
    wait_for_health()
    telegram_call(
        token,
        "sendMessage",
        {"chat_id": chat_id, "text": "ELVN Studio contact delivery is connected."},
    )
    print(f"Telegram delivery enabled for @{bot.get('username', 'bot')}.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (RuntimeError, subprocess.CalledProcessError) as error:
        print(str(error), file=sys.stderr)
        raise SystemExit(1)
