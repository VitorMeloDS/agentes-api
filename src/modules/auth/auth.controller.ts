import { Request, Response } from 'express';
import { JWTUserInterface } from '@shared/interfaces/jwt.user.interface';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { Router } from '@shared/enums/routes.enum';
import { AuthUser } from '@shared/decorators/auth.user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Get, UseGuards, Res, Req } from '@nestjs/common';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags(Router.AUTH)
@Controller(Router.AUTH)
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() dto: AuthDto, @Res({ passthrough: true }) response: Response) {
		const auth = await this.authService.login(dto);

		response.cookie('refreshToken', auth.refreshToken, {
			httpOnly: true,
			expires: new Date(Date.now() + 24000 * 60 * 60),
		});

		return { toke: auth.accessToken };
	}

	@Post('refresh')
	async refreshToken(@Body() dto: RefreshTokenDto) {
		return this.authService.refreshToken(dto.refreshToken);
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	async me(@AuthUser() user: JWTUserInterface) {
		return user;
	}

	@UseGuards(JwtAuthGuard)
	@Get('check')
	async checkToken() {
		return { message: true };
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return this.authService.logout(req, res);
	}
}
