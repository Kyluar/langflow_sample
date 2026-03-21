import { z } from '@repo/config'

function swaggerDate() {
	const schema = z.coerce.date()
	// Zod v4 does not support z.date() in JSON Schema generation by default.
	// This hook tells the generator to represent it as an ISO 8601 datetime string.
	// biome-ignore lint/suspicious/noExplicitAny: Any is necessary here
	;(schema._zod as any).toJSONSchema = () => ({
		type: 'string',
		format: 'date-time'
	})
	return schema
}

export const timestampSchema = z.strictObject({
	createdAt: swaggerDate(),
	updatedAt: swaggerDate()
})

export type DataType = Record<string, unknown> | Record<string, unknown>[]
