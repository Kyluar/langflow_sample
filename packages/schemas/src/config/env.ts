import { z } from 'zod'

const nodeEnv = z.literal(['development', 'production', 'test'])

export const transformDatabaseUrl = z
	.object({
		POSTGRES_HOST: z.string(),
		POSTGRES_USER: z.string(),
		POSTGRES_PASSWORD: z.string(),
		POSTGRES_DB: z.string(),
		POSTGRES_DB_SCHEMA: z.string(),
		POSTGRES_PORT: z.coerce.number()
	})
	.transform((props) => {
		const {
			POSTGRES_DB,
			POSTGRES_DB_SCHEMA,
			POSTGRES_HOST,
			POSTGRES_PASSWORD,
			POSTGRES_PORT,
			POSTGRES_USER
		} = props
		return `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=${POSTGRES_DB_SCHEMA}`
	})

export type GenerateDatabaseUrlInput = z.input<typeof transformDatabaseUrl>
export type GenerateDatabaseUrlOutput = z.output<typeof transformDatabaseUrl>

export const apiEnvSchema = z.object({
	NODE_ENV: nodeEnv,
	API_PORT: z.coerce.number(),
	DATABASE_URL: z.string()
})

export type ApiEnvDtoInput = z.input<typeof apiEnvSchema>
export type ApiEnvDtoOutput = z.output<typeof apiEnvSchema>
export type NodeEnv = z.infer<typeof nodeEnv>
