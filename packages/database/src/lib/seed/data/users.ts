import type { Prisma } from '../../../generated/prisma/client.js'

export const seedUsers: Prisma.UserCreateInput[] = [
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
