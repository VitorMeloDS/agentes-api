import { INestApplication } from '@nestjs/common';
import { LoggerService } from '@common/utils/logger/logger.service';

export function loggerConfig(app: INestApplication): LoggerService {
	const logger = app.get(LoggerService);
	app.useLogger(logger);

	return logger;
}
