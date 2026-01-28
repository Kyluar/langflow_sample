import type { PrismaClient } from '@repo/database'
import type { CustomPrismaService } from 'nestjs-prisma'
import { PrismaClientFactory } from '../utils/prisma.utils'

export const prisma = PrismaClientFactory()
export type CustomPrismaClient = CustomPrismaService<PrismaClient>
