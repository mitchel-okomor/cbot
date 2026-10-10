# Stage 1: Builder
FROM node:18 AS builder

# Install pnpm and required dependencies
RUN apt-get update && apt-get install -y openssl python3 make g++ && \
    corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .


RUN pnpm build

# Stage 2: Runtime
FROM node:18

# Install dependencies including build tools (needed for some native modules)
RUN apt-get update && apt-get install -y openssl python3 make g++ && \
    corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy necessary files from builder
# COPY --from=builder /app/package.json .
# COPY --from=builder /app/pnpm-lock.yaml .
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/tsconfig.build.json .
# COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app .
# COPY --from=builder /app/src/migration/migration.config.ts /app/src/migration/migration.config.ts
# COPY --from=builder /app/.env .

# Ensure crypto is available
ENV NODE_OPTIONS="--openssl-legacy-provider --experimental-global-webcrypto"

EXPOSE 7000

CMD ["pnpm", "start"]