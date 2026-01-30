import { PrismaPg } from '@prisma/adapter-pg'
import { type Prisma, PrismaClient } from '../src/generated/prisma/client'
import { generateDatabaseUrl } from '../src/lib/utils'
import { seedUsers } from './data-seed/users'
import { seedDocuments } from './data-seed/documents'

const connectionString = generateDatabaseUrl()
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
    const transactionsUsers = seedUsers.map((u) =>
        prisma.user.upsert({ where: { email: u.email }, update: {}, create: u })
    )

    const transictionsDocuments = seedDocuments.map((d) =>
        prisma.document.upsert({ where: { title: d.title }, update: {}, create: d })
    )

    const users = await prisma.$transaction(transactionsUsers)
    const documents = await prisma.$transaction(transictionsDocuments)

    console.info(users)
    console.info(documents)
    console.info('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
