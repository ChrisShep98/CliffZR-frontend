import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// when we are not in production enviornment and prisma client has already run. Then it won't keep initalizing the prisma client again and again everytime we restart the server
declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export const db = prisma;
