import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	private readonly salt: string = genSaltSync(Math.floor(Math.random() * 17));

	constructor(
		@InjectRepository(UserEntity)
		private readonly repository: Repository<UserEntity>,
	) {}

	async findOne(where: FindOptionsWhere<UserEntity>, select: FindOptionsSelect<UserEntity> = {}): Promise<UserEntity> {
		return this.repository.findOne({ where, select });
	}

	async create(user: CreateUserDto): Promise<CreateUserDto> {
		const password = hashSync(user.password, this.salt);

		const userCreated = this.repository.create({ ...user, password });

		const _user = await this.repository.save(userCreated);

		delete _user.password;

		return _user;
	}

	async update(id: number, _user: UpdateUserDto): Promise<any> {
		const password = hashSync(_user.password, this.salt);

		const userUpdated = this.repository.create({ ..._user, password });

		await this.repository.update(id, userUpdated);

		const user = await this.findOne({ id });

		delete _user.password;

		return user;
	}

	async delete(id: number): Promise<any> {
		await this.repository.softDelete(id);
		return { message: 'Usuário excluído!' };
	}
}
