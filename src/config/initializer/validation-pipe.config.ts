import { INestApplication, ValidationPipe } from '@nestjs/common';

export function validationPipeConfig(app: INestApplication): void {
	const validationPipe = new ValidationPipe({
		forbidUnknownValues: false,
		validationError: { target: false },
		whitelist: true,
		transform: true,
	});

	app.useGlobalPipes(validationPipe);
}
