import { IsEmail, IsOptional, MinLength, Validate } from 'class-validator';
import { checkPass } from '@shared/validations/check-pass.validation';
import { ApiProperty } from '@nestjs/swagger';
import { IsPasswordMatch } from '../validation/Is-pass-match-contraint.validation';

export class UpdateUserDto {
	@ApiProperty({
		description: 'Primeiro nome do usuário',
		example: 'João',
	})
	@IsOptional()
	@MinLength(3, { message: 'O tamanho minimo para o "primeiro nome" são 3 caracteres!' })
	firstName: string;

	@ApiProperty({
		description: 'Último nome do usuário',
		example: 'Silva',
	})
	@IsOptional()
	@MinLength(3, { message: 'O tamanho minimo para o "ultimo nome" são 3 caracteres!' })
	lastName: string;

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

	@ApiProperty({
		description: 'Confirmação da senha do usuário',
		example: 'SenhaForte123!',
	})
	@IsOptional()
	@IsPasswordMatch('password', { message: 'A confirmação de senha deve ser igual à senha!' })
	confirmPassword: string;
}
