import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class ExistIdUserPipe implements PipeTransform {
	constructor(
		@InjectRepository(UserEntity)
		private readonly repository: Repository<UserEntity>,
	) {}

	async transform(id: number) {
		const user = await this.repository.findOne({ where: { id: id } });

		if (!user?.id) throw new NotFoundException('Não foi possivel encontrar o usuário.');

		return id;
	}
}
