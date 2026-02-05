import { INestApplication } from '@nestjs/common'
import { API_ROUTES } from '@repo/constants'
import { CreateUserSchema, UserSchema, userSchema } from '@repo/schemas'
import request from 'supertest'
import { setupTestEnvironment } from 'test/lib/utils/setup'
import { teardownTestEnvironment } from 'test/lib/utils/teardown'

describe('User: E2E PATCH Tests', () => {
	let app: INestApplication
	let existingUserId: string
	let duplicatedEmail: string
	let validUserData: CreateUserSchema

	beforeAll(async () => {
		app = await setupTestEnvironment()
		validUserData = {
			name: 'Patch User Test',
			email: 'patch.test@example.com'
		}
		await request(app.getHttpServer())
			.get(API_ROUTES.USERS.BASE)
			.expect((res) => {
				const users = res.body as UserSchema[]
				existingUserId = users[0].id
				duplicatedEmail = users[1].email
			})
	})

	describe(`Success cases`, () => {
		it('should update a user and return', async () => {
			await request(app.getHttpServer())
				.patch(API_ROUTES.USERS.BY_ID(existingUserId))
				.send(validUserData)
				.expect((res) => {
					const user = res.body as UserSchema
					expect(res.statusCode).toBe(200)
					expect(userSchema.safeParse(user).success).toBe(true)
					expect(user.id).toBe(existingUserId)
					expect(user.name).toBe(validUserData.name)
					expect(user.email).toBe(validUserData.email)
				})
		})
	})

	describe(`Fail cases`, () => {
		it('should fail to update user with duplicated email', async () => {
			await request(app.getHttpServer())
				.patch(API_ROUTES.USERS.BY_ID(existingUserId))
				.send({ ...validUserData, email: duplicatedEmail })
				.expect(({ statusCode }) => {
					expect(statusCode).toBe(409)
				})
		})
		it(`should fail when id is not an uuid (invalid format)`, async () => {
			await request(app.getHttpServer())
				.patch(API_ROUTES.USERS.BY_ID('invalid-id-format'))
				.send(validUserData)
				.expect(({ statusCode }) => {
					expect(statusCode).toBe(400)
				})
		})
		it(`should fail when uuid does not exist`, async () => {
			await request(app.getHttpServer())
				.patch(`${API_ROUTES.USERS.BASE}/550e8400-e29b-41d4-a716-446655440000`)
				.send(validUserData)
				.expect(({ statusCode }) => {
					expect(statusCode).toBe(404)
				})
		})
	})

	afterAll(async () => {
		await teardownTestEnvironment(app)
	})
})
