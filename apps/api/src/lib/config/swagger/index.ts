import { NestExpressApplication } from '@nestjs/platform-express'
import {
	DocumentBuilder,
	SwaggerCustomOptions,
	SwaggerModule
} from '@nestjs/swagger'

import { cleanupOpenApiDoc } from 'nestjs-zod'

export function setupSwagger(app: NestExpressApplication) {
	const config = new DocumentBuilder()
		.setTitle('Langflow Sample API')
		.setDescription('Documentação da API da aplicação Langflow Sample')
		.setVersion('1.0')
		.build()

	const openApiDoc = SwaggerModule.createDocument(app, config)

	const swaggerPath = 'docs'
	const customOptions: SwaggerCustomOptions = {
		jsonDocumentUrl: `${swaggerPath}/json`,
		yamlDocumentUrl: `${swaggerPath}/yaml`,
		customSiteTitle: 'Langflow Sample - Docs',
		customfavIcon: '/favicon.ico'
	}

	SwaggerModule.setup(
		swaggerPath,
		app,
		cleanupOpenApiDoc(openApiDoc),
		customOptions
	)
}
