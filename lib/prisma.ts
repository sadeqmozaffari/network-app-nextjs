import { PrismaClient } from '@prisma/client';

// TypeScript type casting for global variable, used to store Prisma Client instance
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Check if there's already a PrismaClient instance stored globally, if not, create a new instance
export const prisma = globalForPrisma.prisma || new PrismaClient();

// In development environment, store the Prisma Client instance in the global object to reuse across requests
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
