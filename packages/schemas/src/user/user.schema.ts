import { z } from '@repo/config'
import type { Prisma } from '@repo/database'
import type { ApiSuccessResponse } from '../api/api.response.types.js'

export const createUserSchema = z.strictObject({
	email: z.email(),
	name: z.string()
}) satisfies z.ZodType<Prisma.UserCreateInput>

export const updateUserSchema = createUserSchema.partial()

export const userSchema = z.strictObject({
	id: z.uuid(),
	...createUserSchema.shape
}) satisfies z.ZodType<Prisma.UserModel>

export const userResponseSchema = z.strictObject({
	data: userSchema
}) satisfies z.ZodType<ApiSuccessResponse<Prisma.UserModel>>

export type UserSchema = z.infer<typeof userSchema>
export type UserResponseSchema = z.infer<typeof userResponseSchema>
export type CreateUserSchema = z.infer<typeof createUserSchema>
export type UpdateUserSchema = z.infer<typeof updateUserSchema>
