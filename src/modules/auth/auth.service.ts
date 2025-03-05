/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOptionsSelect } from 'typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@modules/user/user.service';
import { UserEntity } from '@modules/user/entities/user.entity';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	private secret: string = this.configService.get('API_SECRET_KEY');
	private exp: string = this.configService.get('API_EXPIRES_ACCESS_TOKEN');
	private secretRefresh: string = this.configService.get('API_SECRET_KEY_REFRESH');
	private expRefresh: string = this.configService.get('API_EXPIRES_REFRESH_TOKEN');

	constructor(
		private readonly userService: UsersService,
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	private async validateUser(email: string, pass: string) {
		const select: FindOptionsSelect<UserEntity> = {
			id: true,
			email: true,
			firstName: true,
			lastName: true,
			password: true,
			createdAt: true,
			updatedAt: true,
		};
		const user = await this.userService.findOne({ email }, select);

		if (!user || !(await bcrypt.compare(pass, user.password))) {
			throw new UnauthorizedException('Credênciais invalidas!');
		}

		delete user.password;

		return user;
	}

	private async genSignatures(payload: UserEntity) {
		const JWTConfigAccess = { secret: this.secret, expiresIn: this.exp };
		const JWTConfigRefresh = { secret: this.secretRefresh, expiresIn: this.expRefresh };
		const accessToken = this.jwtService.sign({ ...payload }, JWTConfigAccess);
		const refreshToken = this.jwtService.sign({ ...payload }, JWTConfigRefresh);

		return { accessToken, refreshToken };
	}

	async login(auth: AuthDto) {
		const user = await this.validateUser(auth.email, auth.password);

		const { accessToken, refreshToken } = await this.genSignatures(user);

		return { accessToken, refreshToken };
	}

	async refreshToken(refreshToken: string) {
		try {
			if (!refreshToken) {
				throw new UnauthorizedException('Refresh token não fornecido!');
			}

			const decoded = this.jwtService.verify(refreshToken, { secret: this.secretRefresh });

			const payload = {
				id: decoded.id,
				email: decoded.email,
				firstName: decoded.firstName,
				lastName: decoded.lastName,
				createdAt: decoded.createdAt,
				updatedAt: decoded.updatedAt,
			};

			const accessToken = this.jwtService.sign({ ...payload }, { secret: this.secret, expiresIn: this.exp });

			return { accessToken };
		} catch (err: any) {
			console.log(err);
			throw new UnauthorizedException('Refresh token inválido!');
		}
	}

	async logout(req: Request, res: Response) {
		const token = req.headers.authorization.split(' ')[1];
		try {
			const decoded = this.jwtService.verify(token, { secret: this.secret });
			delete decoded.iat;
			delete decoded.exp;

			res.clearCookie('refreshToken');
			return { message: 'Usuário deslogado.' };
		} catch {
			throw new UnauthorizedException('Usuário não autorizado.');
		}
	}
}
