# Build stage
FROM node:20 AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 파일 복사 및 설치
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# Next.js 프로덕션 빌드
RUN pnpm run build

# Production Stage
FROM node:20-alpine AS runner

# 작업 디렉토리 설정
WORKDIR /app

# 빌드 결과물과 필요한 파일만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules 

# 환경 변수 설정 (예: 포트)
EXPOSE 3000

# 애플리케이션 시작
CMD ["pnpm", "start"]