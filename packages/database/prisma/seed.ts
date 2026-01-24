import type { Prisma } from '../src/generated/prisma/client'
import { PrismaClientFactory } from '../src/lib/utils'

const prisma = PrismaClientFactory()

const seedUsers: Prisma.UserCreateInput[] = [
	{
		name: 'Ana Beatriz Silva',
		email: 'ana.silva@mock.com'
	},
	{
		name: 'Lucas Oliveira Lima',
		email: 'lucas.lima@mock.com'
	},
	{
		name: 'Mariana Costa',
		email: 'mariana.costa@mock.com'
	},
	{
		name: 'Ricardo Augusto Pires',
		email: 'ricardo.pires@mock.com'
	},
	{
		name: 'Juliana Mendes',
		email: 'juliana.mendes@mock.com'
	},
	{
		name: 'Enzo Valentim',
		email: 'enzo.valentim@mock.com'
	},
	{
		name: 'Camila Ferreira',
		email: 'camila.ferreira@mock.com'
	},
	{
		name: 'Thiago Souza',
		email: 'thiago.souza@mock.com'
	},
	{
		name: 'Fernanda Rocha',
		email: 'fernanda.rocha@mock.com'
	},
	{
		name: 'Bruno Henrique Vaz',
		email: 'bruno.vaz@mock.com'
	}
]

async function main() {
	const transactions = seedUsers.map((u) =>
		prisma.user.upsert({ where: { email: u.email }, update: {}, create: u })
	)

	const users = await prisma.$transaction(transactions)

	console.info(users)
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
