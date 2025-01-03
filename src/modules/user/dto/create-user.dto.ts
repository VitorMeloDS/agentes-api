import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { checkPass } from '@shared/validations/check-pass.validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({
		description: 'Primeiro nome do usuário',
		example: 'João',
	})
	@IsNotEmpty({ message: 'O campo "primeiro nome" é obrigatório!' })
	@MinLength(3, { message: 'O tamanho minimo para o "primeiro nome" são 3 caracteres!' })
	firstName: string;

	@ApiProperty({
		description: 'Último nome do usuário',
		example: 'Silva',
	})
	@IsNotEmpty({ message: 'O campo "ultimo nome" é obrigatório!' })
	@MinLength(3, { message: 'O tamanho minimo para o "ultimo nome" são 3 caracteres!' })
	lastName: string;

	@ApiProperty({
		description: 'E-mail do usuário',
		example: 'joao.silva@example.com',
	})
	@IsNotEmpty({ message: 'O campo "e-mail" é obrigatório!' })
	@IsEmail({}, { message: 'O e-mail informado é inválido!' })
	email: string;

	@ApiProperty({
		description: 'Senha do usuário',
		example: 'SenhaForte123!',
	})
	@IsNotEmpty({ message: 'O campo "senha" é obrigatório!' })
	@Validate(checkPass, { message: 'A senha informada é fraca!' })
	password: string;
}
