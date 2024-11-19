import * as morgan from 'morgan';
import { INestApplication } from '@nestjs/common';
import { LoggerService } from '@common/utils/logger/logger.service';

export function morganConfig(app: INestApplication, logger: LoggerService): void {
	const format = ':method :url :status - :response-time ms';
	const info = (m: string) => logger.log(m.trim(), 'MorganService');

	app.use(morgan(format, { stream: { write: info } }));
}
