type ContactBrief = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  launchDate: string;
  description: string;
};

const telegramTextLimit = 3900;

export function buildContactBrief(data: ContactBrief, requestId: string) {
  return [
    `Request ${requestId}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "—"}`,
    `Project: ${data.projectType}`,
    `Budget: ${data.budget}`,
    `Target launch: ${data.launchDate || "—"}`,
    "",
    data.description,
  ].join("\n");
}

export function buildTelegramMessage(data: ContactBrief, requestId: string) {
  const message = `New ELVN Studio inquiry\n\n${buildContactBrief(data, requestId)}`;
  return message.length <= telegramTextLimit
    ? message
    : `${message.slice(0, telegramTextLimit - 1)}…`;
}

export async function sendTelegramMessage(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("Telegram delivery is not configured");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message }),
    signal: AbortSignal.timeout(8000),
  });

  const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
  if (!response.ok || !result?.ok) throw new Error("Telegram delivery failed");
}
