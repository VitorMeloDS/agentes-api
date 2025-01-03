import { LoggerService } from '@shared/utils/logger/logger.service';
import { INestApplication } from '@nestjs/common';

export function loggerConfig(app: INestApplication): LoggerService {
	const logger = app.get(LoggerService);
	app.useLogger(logger);

	return logger;
}
