import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post
} from '@nestjs/common'
import type { UserSchema } from '@repo/schemas'
import type { CreateUserDto, UpdateUserDto } from 'src/lib/types/dto/user'
import type { IUserController } from 'src/lib/types/interfaces/user.interface'
// biome-ignore lint/style/useImportType: Required
import { UsersService } from './users.service'

@Controller('users')
export class UsersController implements IUserController {
	constructor(private readonly service: UsersService) {}

	@Get(':id')
	getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<UserSchema> {
		return this.service.getUserById(id)
	}

	@Get()
	getUsers(): Promise<UserSchema[]> {
		return this.service.getUsers()
	}

	@Post()
	createUser(@Body() userData: CreateUserDto): Promise<UserSchema> {
		return this.service.createUser(userData)
	}

	@Patch(':id')
	updateUser(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() data: UpdateUserDto
	): Promise<UserSchema> {
		return this.service.updateUserById(id, data)
	}

	@Delete(':id')
	deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserSchema> {
		return this.service.deleteUserById(id)
	}
}
