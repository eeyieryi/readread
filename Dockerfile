FROM node:lts-alpine3.18 AS base

WORKDIR /app

FROM base AS setup
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY package.json pnpm-lock.yaml /app/
RUN pnpm install --frozen-lockfile

FROM setup AS build
COPY . /app
ARG PRISMA_DB_URL="file:./dev.db"
RUN echo "DATABASE_URL=${PRISMA_DB_URL}" >> /app/.env
RUN pnpm prisma migrate dev
RUN pnpm run build
CMD pnpm run preview --host --port 3000
