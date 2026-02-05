import { INestApplication } from '@nestjs/common'
import { API_ROUTES } from '@repo/constants'
import { UserSchema, userSchema } from '@repo/schemas'
import request from 'supertest'
import { setupTestEnvironment } from 'test/lib/utils/setup'
import { teardownTestEnvironment } from 'test/lib/utils/teardown'

describe('User: E2E GET Tests', () => {
	let app: INestApplication
	let existingUserId: string

	beforeAll(async () => {
		app = await setupTestEnvironment()
		await request(app.getHttpServer())
			.get(API_ROUTES.USERS.BASE)
			.expect((res) => {
				const users = res.body as UserSchema[]
				existingUserId = users[0].id
			})
	})

	describe(`Success cases`, () => {
		describe(`${API_ROUTES.USERS.BASE}`, () => {
			it(`should return an array of users`, async () => {
				await request(app.getHttpServer())
					.get(API_ROUTES.USERS.BASE)
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
		describe(`${API_ROUTES.USERS.BASE}/:id`, () => {
			it(`should return a user by their uuid`, async () => {
				await request(app.getHttpServer())
					.get(API_ROUTES.USERS.BY_ID(existingUserId))
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
