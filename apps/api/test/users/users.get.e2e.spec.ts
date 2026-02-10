import { INestApplication } from '@nestjs/common'
import { API_ROUTES } from '@repo/constants'
import { ApiResponse, UserSchema, userSchema } from '@repo/schemas'
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
				const { data } = res.body as ApiResponse<UserSchema[]>
				existingUserId = data[0].id
			})
	})

	describe(`Success cases`, () => {
		describe(`${API_ROUTES.USERS.BASE}`, () => {
			it(`should return an array of users`, async () => {
				await request(app.getHttpServer())
					.get(API_ROUTES.USERS.BASE)
					.expect((res) => {
						const { data } = res.body as ApiResponse<UserSchema[]>
						expect(Array.isArray(data)).toBe(true)
						expect(
							data.every((user) => userSchema.safeParse(user).success)
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
						const { data } = res.body as ApiResponse<UserSchema>

						expect(userSchema.safeParse(data).success).toBe(true)
						expect(data.id).toBe(existingUserId)
						expect(res.statusCode).toBe(200)
					})
			})
		})
	})

	describe(`Fail cases`, () => {
		describe(`${API_ROUTES.USERS.BASE}/:id`, () => {
			it(`should fail when id is not an uuid (invalid format)`, async () => {
				await request(app.getHttpServer())
					.get(API_ROUTES.USERS.BY_ID('invalid-id-format'))
					.expect(({ statusCode }) => {
						expect(statusCode).toBe(400)
					})
			})
			it(`should fail when uuid is not associated with a user (not found)`, async () => {
				await request(app.getHttpServer())
					.get(API_ROUTES.USERS.BY_ID('550e8400-e29b-41d4-a716-446655440000'))
					.expect(({ statusCode }) => {
						expect(statusCode).toBe(404)
					})
			})
		})
	})

	afterAll(async () => {
		await teardownTestEnvironment(app)
	})
})
