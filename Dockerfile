# Base stage---------------------------
FROM node:20 AS base
RUN npm install -g pnpm

# Build stage---------------------------
FROM base AS builder
WORKDIR /app

# 종속성 파일 복사 및 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Production Stage---------------------------
FROM node:20-alpine AS runner

# 작업 디렉토리 설정
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -S nodejs && adduser -S -H -D -G nodejs nextjs

# 빌드 결과물과 필요한 파일만 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

# 환경 변수 설정 (예: 포트)
EXPOSE 3000

# 애플리케이션 시작
CMD ["node", "server.js"]