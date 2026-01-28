import { createUserSchema, updateUserSchema } from '@repo/schemas'
import { createZodDto } from 'nestjs-zod'

export class CreateUserDto extends createZodDto(createUserSchema) {}
export class UpdateUserDto extends createZodDto(updateUserSchema) {}
