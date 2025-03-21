import { PrismaClient } from "@prisma/client";

// Singleton pour éviter de créer plusieurs instances de PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton>;
}

// Utilise l'instance existante ou en crée une nouvelle
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// En mode développement, conserve l'instance dans globalThis
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}