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
import { UserSchema } from '@repo/schemas'
import { ZodResponse } from 'nestjs-zod'
import {
	CreateUserDto,
	UpdateUserDto,
	UserDto
} from 'src/lib/types/dto/user.dto'
import { IUserController } from 'src/lib/types/interfaces/user.interface'
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
	@ZodResponse({ type: UserDto })
	createUser(@Body() userData: CreateUserDto): Promise<UserSchema> {
		return this.service.createUser(userData)
	}

	@Patch(':id')
	@ZodResponse({ type: UserDto })
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
