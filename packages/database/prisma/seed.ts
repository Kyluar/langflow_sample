import { PrismaPg } from '@prisma/adapter-pg'
import { type Prisma, PrismaClient } from '../src/generated/prisma/client'
import { generateDatabaseUrl } from '../src/lib/utils'
import { seedDocuments } from './data-seed/documents'
import { seedUsers } from './data-seed/users'

const connectionString = generateDatabaseUrl()
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })


async function main() {
    console.info('Seeding users...');
    for (const u of seedUsers) {
        await prisma.user.upsert({ 
            where: { email: u.email }, 
            update: {}, 
            create: u 
        });
    }
    console.info('Users seeded successfully!');
    console.info('Seeding documents...');
for (let i = 0; i < seedDocuments.length; i++) {
        const d = seedDocuments[i];
        
        const result = await prisma.document.upsert({
            where: { title: d.title },
            update: {
                content: d.content
            },
            create: {
                title: d.title,
                content: d.content
            }
        });

        console.info(`[${i + 1}/${seedDocuments.length}] Inserido: ${result.title}`);
    }

    console.info('Documents seeded successfully!');
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
