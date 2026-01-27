import {
	type ApiEnvDtoInput,
	type ApiEnvDtoOutput,
	apiEnvSchema,
	type NodeEnv
} from '@repo/schemas'

export function getConfig(): ApiEnvDtoOutput {
	const config: ApiEnvDtoInput = {
		nodeEnv: process.env.NODE_ENV as NodeEnv,
		port: process.env.PORT
		// Can possibly be used in the future
		// database: {
		// 	host: process.env.POSTGRES_HOST,
		// 	user: process.env.POSTGRES_USER,
		// 	password: process.env.POSTGRES_PASSWORD,
		// 	name: process.env.POSTGRES_DB,
		// 	schema: process.env.POSTGRES_DB_SCHEMA,
		// 	port: process.env.POSTGRES_PORT,
		// 	url: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}?schema=${process.env.POSTGRES_DB_SCHEMA}`
		// }
	}
	return apiEnvSchema.parse(config)
}
