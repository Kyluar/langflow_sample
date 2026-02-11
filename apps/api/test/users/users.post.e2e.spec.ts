import { INestApplication } from '@nestjs/common'
import { API_ROUTES } from '@repo/constants'
import {
	ApiSuccessResponse,
	CreateUserSchema,
	UserSchema,
	userSchema
} from '@repo/schemas'
import request from 'supertest'
import { setupTestEnvironment } from 'test/lib/utils/setup'
import { teardownTestEnvironment } from 'test/lib/utils/teardown'

describe('User: E2E POST Tests', () => {
	let app: INestApplication
	let validUserData: CreateUserSchema

	beforeAll(async () => {
		app = await setupTestEnvironment()
		validUserData = {
			name: 'Post User Test',
			email: 'post.test@example.com'
		}
	})

	describe(`Success cases`, () => {
		it('should create a new user and return', async () => {
			await request(app.getHttpServer())
				.post(API_ROUTES.USERS.BASE)
				.send(validUserData)
				.expect((res) => {
					const { data } = res.body as ApiSuccessResponse<UserSchema>
					expect(userSchema.safeParse(data).success).toBe(true)
					expect(res.statusCode).toBe(201)
				})
		})
	})

	describe(`Fail cases`, () => {
		it('should fail to create user with duplicated email', async () => {
			await request(app.getHttpServer())
				.post(API_ROUTES.USERS.BASE)
				.send(validUserData)
				.expect(({ statusCode }) => {
					expect(statusCode).toBe(409)
				})
		})
	})

	afterAll(async () => {
		await teardownTestEnvironment(app)
	})
})
