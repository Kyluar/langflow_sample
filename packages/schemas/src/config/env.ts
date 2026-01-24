import { z } from 'zod'

const nodeEnv = z.literal(['development', 'production', 'test'])

// Can possibly be used in the future
// const databaseEnvSchema = z.object({
// 	host: z.string(),
// 	user: z.string(),
// 	password: z.string(),
// 	name: z.string(),
// 	schema: z.string(),
// 	port: z.coerce.number(),
// 	url: z.string()
// })

export const apiEnvSchema = z.object({
	nodeEnv,
	port: z.coerce.number()
})

export type ApiEnvDtoInput = z.input<typeof apiEnvSchema>
export type ApiEnvDtoOutput = z.output<typeof apiEnvSchema>
export type NodeEnv = z.infer<typeof nodeEnv>
