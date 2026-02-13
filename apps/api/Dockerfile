FROM node:lts-alpine3.23 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS pruner
RUN pnpm install -g turbo
COPY . .
RUN turbo prune --scope=api --docker

FROM base AS installer
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .

RUN pnpm db:generate

RUN pnpm run build

FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=builder --chown=nestjs:nodejs /app .

RUN chmod +x ./apps/api/entrypoint.sh

CMD ["./apps/api/entrypoint.sh"]
