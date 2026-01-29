import type { PrismaClient } from '@repo/database'
import type { CustomPrismaService } from 'nestjs-prisma'

export type CustomPrismaClient = CustomPrismaService<PrismaClient>
