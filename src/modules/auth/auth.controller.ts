import { Router } from '@shared/enums/routes.enum';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags(Router.USER)
@Controller(Router.USER)
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@Post()
	@ApiBody({ type: AuthDto })
	@ApiOperation({ summary: 'Criar usuário.' })
	async login(@Body() body: AuthDto): Promise<any> {
		return this.service.login(body);
	}
}
