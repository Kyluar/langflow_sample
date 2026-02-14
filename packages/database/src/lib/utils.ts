import type { Prisma, PrismaClient } from '../generated/prisma/client.js'

type SeedDatabaseParams = {
	prisma: PrismaClient
	models: {
		[key: string]: {
			data: unknown[]
			whereCb: (item: unknown) => unknown
		}
	}
	log?: boolean
}

export async function seedDatabase({
	prisma,
	models,
	log = true
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
		if (log)
			console.info(
				`✅ Database seeded successfully! ${result.length} records processed.`
			)
	} catch (error) {
		console.error('❌ Error seeding database:', error)
		throw error
	}
}

export async function cleanDatabase(
	prisma: PrismaClient,
	schema: string,
	log: boolean = true
): Promise<void> {
	const models = await prisma.$queryRaw<Array<{ tablename: string }>>`
	SELECT tablename FROM pg_tables
	WHERE schemaname = ${schema}
	AND tablename != '_prisma_migrations';
  `

	if (models.length === 0) {
		console.warn(`⚠️ Aviso: Nenhuma tabela encontrada no schema "${schema}".`)
		return
	}

	const requests = models.map((row) =>
		prisma.$executeRawUnsafe(
			`TRUNCATE TABLE "${schema}"."${row.tablename}" RESTART IDENTITY CASCADE;`
		)
	)

	try {
		await prisma.$transaction(requests)
		if (log) console.info(`Schema ${schema} cleaned successfully!`)
	} catch (error) {
		console.error(`❌ Error found when cleaning ${schema} schema:`, error)
	}
}
