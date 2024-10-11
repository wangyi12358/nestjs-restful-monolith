import { PrismaClient } from '@prisma/client';
import { filterSoftDeleted, softDelete, softDeleteMany } from '~/utils/prisma';

// function to give us a prismaClient with extensions we want
export const customPrismaClient = (prismaClient: PrismaClient) => {
  return prismaClient
    .$extends(softDelete) // here we add our created extensions
    .$extends(softDeleteMany)
    .$extends(filterSoftDeleted);
};

// Our Custom Prisma Client with the client set to the customPrismaClient with extension
export class PrismaClientExtended extends PrismaClient {
  customPrismaClient: CustomPrismaClient;

  get client() {
    if (!this.customPrismaClient)
      this.customPrismaClient = customPrismaClient(this);

    return this.customPrismaClient;
  }
}

// Create a type to our custom prisma client
export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;
