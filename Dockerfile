FROM node:22.18.0-alpine AS dependencies
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22.18.0-alpine AS build
WORKDIR /app
RUN corepack enable
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM dependencies AS worker-dependencies
RUN mkdir -p /worker/node_modules && cp -LR /app/node_modules/nodemailer /worker/node_modules/nodemailer

FROM node:22.18.0-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 studio && adduser --system --uid 1001 --ingroup studio studio
COPY --from=build --chown=studio:studio /app/public ./public
COPY --from=build --chown=studio:studio /app/.next/standalone ./
COPY --from=build --chown=studio:studio /app/.next/static ./.next/static
COPY --from=build --chown=studio:studio /app/lifecycle-schema.sql ./lifecycle-schema.sql
COPY --from=build --chown=studio:studio /app/scripts/outbox-worker.mjs ./outbox-worker.mjs
COPY --from=worker-dependencies --chown=studio:studio /worker/node_modules ./node_modules
USER studio
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node","server.js"]
