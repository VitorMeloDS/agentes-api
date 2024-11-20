import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
	constructor() {} // private readonly usersRepository: Repository<UsersEntity>, // @InjectRepository(UsersEntity)

	async findAll(): Promise<any> {
		return 'All users';
	}

	async findOne(id: number): Promise<any> {
		return 'User ' + id;
	}

	async create(data: any): Promise<any> {
		return 'Create user ' + data;
	}

	async update(data: any): Promise<any> {
		return 'Update user ' + data;
	}

	async delete(id: number): Promise<any> {
		return 'Delete user ' + id;
	}
}
