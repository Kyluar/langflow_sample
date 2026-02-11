import { INestApplication } from '@nestjs/common'
import { API_ROUTES } from '@repo/constants'
import { ApiSuccessResponse, UserSchema, userSchema } from '@repo/schemas'
import request from 'supertest'
import { setupTestEnvironment } from 'test/lib/utils/setup'
import { teardownTestEnvironment } from 'test/lib/utils/teardown'

describe('User: E2E DELETE Tests', () => {
	let app: INestApplication
	let existingUserId: string

	beforeAll(async () => {
		app = await setupTestEnvironment()
		await request(app.getHttpServer())
			.get(API_ROUTES.USERS.BASE)
			.expect((res) => {
				const { data } = res.body as ApiSuccessResponse<UserSchema[]>
				existingUserId = data[0].id
			})
	})

	describe(`Success cases`, () => {
		it(`should delete an user and return it`, async () => {
			await request(app.getHttpServer())
				.delete(API_ROUTES.USERS.BY_ID(existingUserId))
				.expect((res) => {
					const { data } = res.body as ApiSuccessResponse<UserSchema>
					expect(res.statusCode).toBe(200)
					expect(userSchema.safeParse(data).success).toBe(true)
				})
		})
	})

	describe(`Fail cases`, () => {
		it(`should fail when id is not an uuid (invalid format)`, async () => {
			await request(app.getHttpServer())
				.delete(API_ROUTES.USERS.BY_ID('invalid-id-format'))
				.expect(({ statusCode }) => {
					expect(statusCode).toBe(400)
				})
		})
		it(`should fail when id is not associated with a user (not found)`, async () => {
			await request(app.getHttpServer())
				.delete(API_ROUTES.USERS.BY_ID('550e8400-e29b-41d4-a716-446655440000'))
				.expect(({ statusCode }) => {
					expect(statusCode).toBe(404)
				})
		})
	})

	afterAll(async () => {
		await teardownTestEnvironment(app)
	})
})
