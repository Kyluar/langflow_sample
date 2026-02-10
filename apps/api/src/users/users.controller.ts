import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Patch,
	Post
} from '@nestjs/common'
import { RESOURCES } from '@repo/constants'
import { ApiResponse, UserSchema } from '@repo/schemas'
import { ZodResponse } from 'nestjs-zod'
import {
	CreateUserDto,
	UpdateUserDto,
	UserDto
} from 'src/lib/types/dto/user.dto'
import { IUserController } from 'src/lib/types/interfaces/user.interface'
import { UsersService } from './users.service'

@Controller(RESOURCES.USERS)
export class UsersController implements IUserController {
	constructor(private readonly service: UsersService) {}

	@Get(':id')
	async getUserById(
		@Param('id', ParseUUIDPipe) id: string
	): Promise<ApiResponse<UserSchema>> {
		return {
			data: await this.service.getUserById(id),
			statusCode: HttpStatus.OK
		}
	}

	@Get()
	async getUsers(): Promise<ApiResponse<UserSchema[]>> {
		return {
			data: await this.service.getUsers(),
			statusCode: HttpStatus.OK
		}
	}

	@Post()
	@ZodResponse({ type: UserDto })
	async createUser(
		@Body() userData: CreateUserDto
	): Promise<ApiResponse<UserSchema>> {
		return {
			data: await this.service.createUser(userData),
			statusCode: HttpStatus.CREATED
		}
	}

	@Patch(':id')
	@ZodResponse({ type: UserDto })
	async updateUser(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() data: UpdateUserDto
	): Promise<ApiResponse<UserSchema>> {
		return {
			data: await this.service.updateUserById(id, data),
			statusCode: HttpStatus.OK
		}
	}

	@Delete(':id')
	async deleteUser(
		@Param('id', ParseUUIDPipe) id: string
	): Promise<ApiResponse<UserSchema>> {
		return {
			data: await this.service.deleteUserById(id),
			statusCode: HttpStatus.OK
		}
	}
}
