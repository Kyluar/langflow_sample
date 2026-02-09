export interface Documentation {
	id: string
	title: string
	label: string // O que aparece no menu
	content: string // Conteúdo em Markdown
	category: string
	updatedAt: string
}

export const mockDocs: Documentation[] = [
	{
		id: 'overview',
		label: 'Visão Geral',
		title: 'Visão Geral',
		category: 'Introdução',
		updatedAt: '2023-10-27T10:00:00Z',
		content: '# Visão Geral'
	},
	{
		id: 'basic-tools',
		label: 'Ferramentas Básicas',
		title: 'Ferramentas Básicas de Desenvolvimento',
		category: 'Ferramentas',
		updatedAt: '2023-10-27T10:05:00Z',
		content: '# Ferramentas Básicas de Desenvolvimento'
	},
	{
		id: 'version-control',
		label: 'Controle de Versão',
		title: 'Controle de Versão e Colaboração',
		category: 'Versionamento',
		updatedAt: '2023-10-27T10:10:00Z',
		content: '# Controle de Versão e Colaboração'
	},
	{
		id: 'dependency-management',
		label: 'Dependências',
		title: 'Gerenciamento de Dependências',
		category: 'Ambiente',
		updatedAt: '2023-10-27T10:15:00Z',
		content: '# Gerenciamento de Dependências'
	},
	{
		id: 'runtime-environment',
		label: 'Ambiente de Execução',
		title: 'Ambiente de Execução',
		category: 'Ambiente',
		updatedAt: '2023-10-27T10:20:00Z',
		content: '# Ambiente de Execução'
	},
	{
		id: 'containers',
		label: 'Containers',
		title: 'Containers e Padronização de Ambiente',
		category: 'Infraestrutura',
		updatedAt: '2023-10-27T10:25:00Z',
		content: '# Containers e Padronização de Ambiente'
	},
	{
		id: 'databases',
		label: 'Banco de Dados',
		title: 'Banco de Dados',
		category: 'Banco de Dados',
		updatedAt: '2023-10-27T10:30:00Z',
		content: '# Banco de Dados'
	},
	{
		id: 'architecture-stack',
		label: 'Arquitetura',
		title: 'Arquitetura e Stack Tecnológica',
		category: 'Arquitetura',
		updatedAt: '2023-10-27T10:35:00Z',
		content: '# Arquitetura e Stack Tecnológica'
	},
	{
		id: 'language',
		label: 'Linguagem',
		title: 'Linguagem Base',
		category: 'Linguagem',
		updatedAt: '2023-10-27T10:40:00Z',
		content: '# Linguagem Base'
	},
	{
		id: 'frontend-web',
		label: 'Front-end Web',
		title: 'Front-end Web',
		category: 'Front-end',
		updatedAt: '2023-10-27T10:45:00Z',
		content: '# Front-end Web'
	},
	{
		id: 'frontend-mobile',
		label: 'Front-end Mobile',
		title: 'Front-end Mobile',
		category: 'Front-end',
		updatedAt: '2023-10-27T10:50:00Z',
		content: '# Front-end Mobile'
	},
	{
		id: 'backend',
		label: 'Back-end',
		title: 'Back-end',
		category: 'Back-end',
		updatedAt: '2023-10-27T10:55:00Z',
		content: '# Back-end'
	},
	{
		id: 'orm',
		label: 'Persistência',
		title: 'Persistência e ORM',
		category: 'Banco de Dados',
		updatedAt: '2023-10-27T11:00:00Z',
		content: '# Persistência e ORM'
	},
	{
		id: 'api-docs',
		label: 'Documentação da API',
		title: 'Documentação de APIs',
		category: 'Back-end',
		updatedAt: '2023-10-27T11:05:00Z',
		content: '# Documentação de APIs'
	},
	{
		id: 'code-quality',
		label: 'Qualidade de Código',
		title: 'Qualidade e Padronização de Código',
		category: 'Qualidade',
		updatedAt: '2023-10-27T11:10:00Z',
		content: '# Qualidade e Padronização de Código'
	},
	{
		id: 'commit-standards',
		label: 'Padrões de Commit',
		title: 'Padrões de Commit e Versionamento',
		category: 'Versionamento',
		updatedAt: '2023-10-27T11:15:00Z',
		content: '# Padrões de Commit e Versionamento'
	}
]
