import { PrismaPg } from '@prisma/adapter-pg'
import { type Prisma, PrismaClient } from '../src/generated/prisma/client'
import { generateDatabaseUrl } from '../src/lib/utils'

const connectionString = generateDatabaseUrl()
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const seedDocuments: Prisma.DocumentCreateInput[] = [
	{
		title: 'Visão Geral',
		content: '# Visão Geral'
	},
	{
		title: 'Ferramentas Básicas de Desenvolvimento',
		content: '# Ferramentas Básicas de Desenvolvimento'
	},
	{
		title: 'Controle de Versão e Colaboração',
		content: '# Controle de Versão e Colaboração'
	},
	{
		title: 'Gerenciamento de Dependências',
		content: '# Gerenciamento de Dependências'
	},
	{
		title: 'Ambiente de Execução',
		content: '# Ambiente de Execução'
	},
	{
		title: 'Containers e Padronização de Ambiente',
		content: '# Containers e Padronização de Ambiente'
	},
	{
		title: 'Banco de Dados',
		content: '# Banco de Dados'
	},
	{
		title: 'Arquitetura e Stack Tecnológica',
		content: '# Arquitetura e Stack Tecnológica'
	},
	{
		title: 'Linguagem Base',
		content: '# Linguagem Base'
	},
	{
		title: 'Front-end Web',
		content: '# Front-end Web'
	},
	{
		title: 'Front-end Mobile',
		content: '# Front-end Mobile'
	},
	{
		title: 'Back-end',
		content: '# Back-end'
	},
	{
		title: 'Persistência e ORM',
		content: '# Persistência e ORM'
	},
	{
		title: 'Documentação de APIs',
		content: '# Documentação de APIs'
	},
	{
		title: 'Qualidade e Padronização de Código',
		content: '# Qualidade e Padronização de Código'
	},
	{
		title: 'Padrões de Commit e Versionamento',
		content: '# Padrões de Commit e Versionamento'
	}
]

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

	// Seed de Documentos usando TITLE como chave
	const documentTransactions = seedDocuments.map((d) =>
		prisma.document.upsert({
			where: { title: d.title }, // Busca pelo título que agora é @unique
			update: {
				content: d.content
			},
			create: {
				title: d.title,
				content: d.content
			}
		})
	)

	const documents = await prisma.$transaction(documentTransactions)

	console.info(documents)
	console.info('Documents seeded successfully!')
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
