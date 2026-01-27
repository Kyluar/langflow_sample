import { z } from 'zod'

export const userSchema = z.strictObject({
	id: z.uuid(),
	email: z.email(),
	name: z.string()
})

export type UserSchema = z.infer<typeof userSchema>
