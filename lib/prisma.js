import { PrismaClient } from '@/lib/generated/prisma';

export const db = globalThis.prisma||new PrismaClient();//This avoids creating multiple database connections — which can crash your app in development!

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}

// Because in dev mode, Next.js auto-restarts or hot reloads often.

// Every time it reloads, it runs your code again.

// Without this globalThis.prisma, you'd create a new DB connection every reload.

// And Too many connections = app crashes.