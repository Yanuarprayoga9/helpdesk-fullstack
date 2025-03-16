const isProd = process.env.NODE_ENV === 'production';

// Import Prisma berdasarkan environment
const { PrismaClient } = isProd 
  ? require('@prisma/client/edge') 
  : require('@prisma/client');

const prismaClientSingleton = () => {
  const prisma = new PrismaClient();
  return isProd ? prisma.$extends(require('@prisma/extension-accelerate').withAccelerate()) : prisma;
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (!isProd) globalThis.prismaGlobal = prisma;
