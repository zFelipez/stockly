import { PrismaClient } from "@prisma/client";
import {  PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Criar Pool do Postgres
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Criar adapter
const adapter = new PrismaPg(pool);

// Criar Prisma Client com adapter
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

// Evitar recriação em dev
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}