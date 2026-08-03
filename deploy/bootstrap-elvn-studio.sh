#!/bin/sh
set -eu

if [ "$(id -u)" -ne 0 ]; then
  echo "Run this bootstrap as root." >&2
  exit 1
fi

deploy_user=elvn-deploy
studio_domain=studio.elvn.monster
studio_port=3021
app_root=/srv/elvn-studio
deploy_command=/usr/local/sbin/elvn-studio-deploy
nginx_available=/etc/nginx/sites-available/studio.elvn.monster.conf
nginx_enabled=/etc/nginx/sites-enabled/studio.elvn.monster.conf
sudoers_file=/etc/sudoers.d/elvn-studio-deploy
acme_root=/var/www/letsencrypt
script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

test -f "$script_dir/elvn-studio-deploy"
test -f "$script_dir/studio.elvn.monster.conf"
id "$deploy_user" >/dev/null 2>&1
command -v docker >/dev/null 2>&1
command -v nginx >/dev/null 2>&1
command -v certbot >/dev/null 2>&1
command -v visudo >/dev/null 2>&1

if ss -ltn "sport = :$studio_port" | sed '1d' | grep -q .; then
  echo "Port $studio_port is already in use." >&2
  exit 1
fi

install -d -m 0755 "$app_root" "$app_root/releases"
install -d -m 0750 "$app_root/shared"
install -d -m 0755 "$acme_root"

if [ ! -f "$app_root/shared/runtime.env" ]; then
  umask 077
  printf 'STUDIO_PORT=%s\n' "$studio_port" > "$app_root/shared/runtime.env"
fi

if [ ! -f "$app_root/shared/studio.env" ]; then
  signing_secret=$(openssl rand -hex 32)
  umask 077
  {
    printf 'NODE_ENV=production\n'
    printf 'NEXT_PUBLIC_SITE_URL=https://%s\n' "$studio_domain"
    printf 'CONTACT_MODE=test\n'
    printf 'CONTACT_SIGNING_SECRET=%s\n' "$signing_secret"
    printf 'CONTACT_RECIPIENT=elvnask@gmail.com\n'
  } > "$app_root/shared/studio.env"
fi

chown -R root:root "$app_root"
chmod 0600 "$app_root/shared/runtime.env" "$app_root/shared/studio.env"
install -o root -g root -m 0750 "$script_dir/elvn-studio-deploy" "$deploy_command"

umask 077
printf '%s ALL=(root) NOPASSWD: %s /tmp/elvn-studio-release.tar.gz *\n' "$deploy_user" "$deploy_command" > "$sudoers_file"
chmod 0440 "$sudoers_file"
visudo -cf "$sudoers_file"

if [ -e "$nginx_available" ]; then
  backup="$nginx_available.backup.$(date -u +%Y%m%dT%H%M%SZ)"
  cp -a "$nginx_available" "$backup"
fi

temporary_nginx=$(mktemp)
trap 'rm -f "$temporary_nginx"' EXIT HUP INT TERM
{
  printf 'server {\n'
  printf '    listen 80;\n'
  printf '    listen [::]:80;\n'
  printf '    server_name %s;\n' "$studio_domain"
  printf '    location /.well-known/acme-challenge/ { root %s; }\n' "$acme_root"
  printf '    location / { return 503; }\n'
  printf '}\n'
} > "$temporary_nginx"
install -o root -g root -m 0644 "$temporary_nginx" "$nginx_available"
ln -sfn "$nginx_available" "$nginx_enabled"
nginx -t
systemctl reload nginx

if [ ! -f "/etc/letsencrypt/live/$studio_domain/fullchain.pem" ]; then
  certbot certonly \
    --non-interactive \
    --agree-tos \
    --email elvnask@gmail.com \
    --webroot \
    --webroot-path "$acme_root" \
    --domain "$studio_domain"
fi

sed "s/__STUDIO_PORT__/$studio_port/g" "$script_dir/studio.elvn.monster.conf" > "$temporary_nginx"
install -o root -g root -m 0644 "$temporary_nginx" "$nginx_available"
nginx -t
systemctl reload nginx

echo "ELVN Studio server provisioning completed."
