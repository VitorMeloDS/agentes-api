import { IsEmail, IsOptional, Validate } from 'class-validator';
import { checkPass } from '@shared/validations/check-pass.validation';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
	@ApiProperty({
		description: 'E-mail do usuário',
		example: 'joao.silva@example.com',
	})
	@IsOptional()
	@IsEmail({}, { message: 'O e-mail informado é inválido!' })
	email: string;

	@ApiProperty({
		description: 'Senha do usuário',
		example: 'SenhaForte123!',
	})
	@IsOptional()
	@Validate(checkPass, { message: 'A senha informada é fraca!' })
	password: string;
}
