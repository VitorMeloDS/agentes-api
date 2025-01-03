import helmet from 'helmet';
import { INestApplication } from '@nestjs/common';

export function helmetConfig(app: INestApplication): void {
	app.use(helmet());
}
