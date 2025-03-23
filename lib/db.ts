const isProd = process.env.NODE_ENV === "production";

// Import Prisma berdasarkan environment
const { PrismaClient } = isProd
// eslint-disable-next-line @typescript-eslint/no-require-imports
  ? require("@prisma/client/edge")
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  : require("@prisma/client");

const prismaClientSingleton = () => {
  const prisma = new PrismaClient();
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return isProd ? prisma.$extends(require("@prisma/extension-accelerate").withAccelerate()) : prisma;
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (!isProd) globalThis.prismaGlobal = prisma;
