import { INestApplication } from '@nestjs/common';

export function corsConfig(app: INestApplication): void {
	const configs = {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
		origin: '*',
	};

	app.enableCors(configs);
}
