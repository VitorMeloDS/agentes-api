import * as morgan from 'morgan';
import { LoggerService } from '@shared/utils/logger/logger.service';
import { INestApplication } from '@nestjs/common';

export function morganConfig(app: INestApplication, logger: LoggerService): void {
	const format = ':method :url :status - :response-time ms';
	const info = (m: string) => logger.log(m.trim(), 'MorganService');

	app.use(morgan(format, { stream: { write: info } }));
}
