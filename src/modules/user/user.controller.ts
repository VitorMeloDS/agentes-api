/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiBody, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

@ApiTags('')
@Controller('')
export class UserController {
	@Get(':id')
	@ApiParam({ name: 'id', type: Number, description: 'Id do usuário.' })
	@ApiCreatedResponse({ description: 'Usuário encontrado.' })
	async findOne(@Param('id', ParseIntPipe /* UserIdExistPipe */) id: number): Promise<any> {
		return 'this.service.findOne(id)';
	}

	@Post()
	@ApiBody({ type: 'CreateRoleDto' })
	@ApiCreatedResponse({ description: 'Usuário criado.' })
	async create(@Body() body: any, /* @AuthUser() */ currentUser: any): Promise<any> {
		return 'this.service.create(body, currentUser)';
	}

	@Put(':id')
	@ApiParam({ name: 'id', type: Number, description: 'Id do usuário.' })
	@ApiBody({ type: 'UpdateUserDto' })
	@ApiCreatedResponse({ description: 'Usuário modificado.' })
	async update(@Param('id', ParseIntPipe /* UserIdExistPipe */) id: number, @Body() body: any): Promise<any> {
		return 'this.service.update(body)';
	}

	@Delete(':id')
	@ApiParam({ name: 'id', type: Number, description: 'Id do usuário.' })
	@ApiCreatedResponse({ description: 'Usuário removido.' })
	async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
		return 'this.service.delete(id)';
	}
}
