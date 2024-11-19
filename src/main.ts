import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { GLOBAL_PREFIX, SWAGGER_PREFIX } from '@common/constants/global.prefix';
import { swaggerConfig } from './config/docs/swagger/swagger.config';
import { corsConfig, helmetConfig, loggerConfig, morganConfig, validationPipeConfig } from './config/initializer';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const host = configService.get('APP_HOST');
	const port = configService.get('APP_PORT');
	const contextName = 'BootstrapApp';

	const logger = loggerConfig(app);

	validationPipeConfig(app);

	morganConfig(app, logger);

	helmetConfig(app);

	corsConfig(app);

	swaggerConfig(app);

	app.setGlobalPrefix(GLOBAL_PREFIX);

	await app.listen(port, () => {
		logger.log(`Swagger is created in listenner on: ${host}:${port}/${SWAGGER_PREFIX}`, contextName);
		logger.log(`Application is running on: ${host}:${port}`, contextName);
	});
}

bootstrap();
