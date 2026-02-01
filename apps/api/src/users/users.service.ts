import { Injectable } from '@nestjs/common'
import type { UserSchema } from '@repo/schemas'
import type { CreateUserDto, UpdateUserDto } from 'src/lib/types/dto/user.dto'
import type { IUserService } from 'src/lib/types/interfaces/user.interface'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService implements IUserService {
	constructor(private repository: UsersRepository) {}

	getUserById(id: string): Promise<UserSchema> {
		return this.repository.user({ id })
	}

	getUsers(): Promise<UserSchema[]> {
		return this.repository.users({})
	}

	createUser(data: CreateUserDto): Promise<UserSchema> {
		return this.repository.createUser(data)
	}

	updateUserById(id: string, data: UpdateUserDto): Promise<UserSchema> {
		return this.repository.updateUser({ where: { id }, data })
	}

	deleteUserById(id: string): Promise<UserSchema> {
		return this.repository.deleteUser({ id })
	}
}
