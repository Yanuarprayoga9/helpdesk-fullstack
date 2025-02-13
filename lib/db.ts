import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma


    // This would be the validation logic that was previously in SQL CHECK constraint:
    // Prioritas tiket harus salah satu dari 'Critical', 'High', 'Medium', 'Low'

 // This would be the validation logic that was previously in SQL CHECK constraint:
    // Status tiket harus salah satu dari 'Open', 'InProgress', 'Escalated', 'Resolved', 'Reopened', 'Closed', 'OnHold'