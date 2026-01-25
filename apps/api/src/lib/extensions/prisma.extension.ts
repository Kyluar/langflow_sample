import type { PrismaClient } from '@repo/database/generated/prisma/client'
import { PrismaClientFactory } from '@repo/database/lib/utils'
import type { CustomPrismaService } from 'nestjs-prisma'

export const prisma = PrismaClientFactory()
export type CustomPrismaClient = CustomPrismaService<PrismaClient>
