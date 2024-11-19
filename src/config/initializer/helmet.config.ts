import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export function helmetConfig(app: INestApplication): void {
	app.use(helmet());
}
