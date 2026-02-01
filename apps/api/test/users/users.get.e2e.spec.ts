import { INestApplication } from '@nestjs/common'
import { UserSchema, userSchema } from '@repo/schemas'
import request from 'supertest'
import { createApp } from 'test/lib/utils/setup'
import { teardownTestEnvironment } from 'test/lib/utils/teardown'

describe('User: E2E GET Tests', () => {
	let app: INestApplication
	let existingUserId: string

	beforeAll(async () => {
		app = await createApp()
		await request(app.getHttpServer())
			.get('/users')
			.expect((res) => {
				const users = res.body as UserSchema[]
				existingUserId = users[0].id
			})
	})

	describe(`Success cases`, () => {
		describe(`users`, () => {
			it(`should return an array of users`, async () => {
				await request(app.getHttpServer())
					.get('/users')
					.expect((res) => {
						const users = res.body as UserSchema[]
						expect(Array.isArray(users)).toBe(true)
						expect(
							users.every((user) => userSchema.safeParse(user).success)
						).toBe(true)
						expect(res.statusCode).toBe(200)
					})
			})
		})
		describe(`users/:id`, () => {
			it(`should return a user by their uuid`, async () => {
				await request(app.getHttpServer())
					.get(`/users/${existingUserId}`)
					.expect((res) => {
						const user = res.body as UserSchema
						expect(userSchema.safeParse(user).success).toBe(true)
						expect(user.id).toBe(existingUserId)
						expect(res.statusCode).toBe(200)
					})
			})
		})
	})

	afterAll(async () => {
		await teardownTestEnvironment(app)
	})
})
