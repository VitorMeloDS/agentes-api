import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@modules/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	private secret: string = this.configService.get('API_SECRET_KEY');

	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
		private userService: UsersService,
	) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const authHeader = request.headers.authorization;

		if (!authHeader) return false;

		const token = authHeader.split(' ')[1];
		try {
			const decoded = this.jwtService.verify(token, { secret: this.secret });

			delete decoded.iat;
			delete decoded.exp;
			request.user = decoded;
			return true;
		} catch {
			throw new UnauthorizedException('Usuário não autorizado.');
		}
	}
}
