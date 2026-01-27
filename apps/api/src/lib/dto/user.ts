import { userSchema } from '@repo/schemas'
import { createZodDto } from 'nestjs-zod'

export class CredentialsDto extends createZodDto(userSchema) {}
