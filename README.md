# Nest.js Restful Monolith

Base on Nest.js, Prisma, PostgreSQL to build a monolith project

## Installation

```bash
$ pnpm install
```

## Configuration

```bash
# Copy .env.example to .env
$ cp .env.example .env
```

## Running the app

```bash
# development mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Using Prisma

```bash
# Generate Prisma Client
$ pnpm run prisma:generate
 
# Push Prisma Schema to Database and Generate Prisma Client
$ pnpm run prisma
```
