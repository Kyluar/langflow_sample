import type { Prisma, PrismaClient } from '../generated/prisma/client.js'

export function generateDatabaseUrl(): string {
	const {
		POSTGRES_USER,
		POSTGRES_PASSWORD,
		POSTGRES_HOST,
		POSTGRES_PORT,
		POSTGRES_DB_NAME,
		POSTGRES_DB_SCHEMA
	} = process.env

	return `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB_NAME}?schema=${POSTGRES_DB_SCHEMA}`
}

type SeedDatabaseParams = {
	prisma: PrismaClient
	models: {
		[key: string]: {
			data: unknown[]
			whereCb: (item: unknown) => unknown
		}
	}
}

export async function seedDatabase({
	prisma,
	models
}: SeedDatabaseParams): Promise<void> {
	const transactions: Prisma.PrismaPromise<unknown>[] = Object.entries(
		models
	).flatMap(([key, obj]) => {
		const { data, whereCb } = obj

		return data.map((item) =>
			// biome-ignore lint/suspicious/noExplicitAny: Required
			(prisma as any)[key].upsert({
				where: whereCb(item),
				update: {},
				create: item
			})
		)
	})

	try {
		const result = await prisma.$transaction(transactions)
		console.info(
			`✅ Database seeded successfully! ${result.length} records processed.`
		)
	} catch (error) {
		console.error('❌ Error seeding database:', error)
		throw error
	}
}
