import { Router } from '@shared/enums/routes.enum';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { ExistIdUserPipe } from './pipe/exist-id-user.pipe';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags(Router.USER)
@Controller(Router.USER)
export class UserController {
	constructor(private readonly service: UsersService) {}

	@Post()
	@ApiBody({ type: CreateUserDto })
	@ApiOperation({ summary: 'Criar usuário.' })
	async create(@Body() body: CreateUserDto): Promise<any> {
		return this.service.create(body);
	}

	@Put(':id')
	@ApiBody({ type: CreateUserDto })
	@ApiOperation({ summary: 'Atualizar usuário.' })
	async update(@Param('id', ParseIntPipe, ExistIdUserPipe) id: number, @Body() body: any): Promise<any> {
		return this.service.update(id, body);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Deletar usuário.' })
	async delete(@Param('id', ParseIntPipe, ExistIdUserPipe) id: number): Promise<any> {
		return this.service.delete(id);
	}
}
