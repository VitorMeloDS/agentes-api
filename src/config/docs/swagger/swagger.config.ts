import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { SWAGGER_PREFIX } from '@common/constants/global.prefix';

export function swaggerConfig(app: INestApplication): void {
	const config = new DocumentBuilder()
		.setTitle('Swagger')
		.setDescription('Documentação da API')
		.setVersion('1.0.3')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup(SWAGGER_PREFIX, app, document);
}
