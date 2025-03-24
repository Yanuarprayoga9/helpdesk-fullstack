const isProd = process.env.NODE_ENV === "production";

// Import Prisma berdasarkan environment
const { PrismaClient } =
  isProd
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("@prisma/client/edge")
    : // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("@prisma/client");

const prismaClientSingleton = () => {
  const prisma = new PrismaClient();
  return isProd
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      prisma.$extends(require("@prisma/extension-accelerate").withAccelerate())
    : prisma;
};

// Gunakan globalThis agar tidak membuat instance Prisma baru di development
declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

// Cek apakah `prismaGlobal` sudah ada agar tidak membuat instance baru di dev
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (!isProd) globalThis.prismaGlobal = prisma;

export default prisma;
