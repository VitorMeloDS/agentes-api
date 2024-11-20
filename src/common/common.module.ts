import { DatabaseProviderModule } from 'src/config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { LoggerModule } from './utils/logger/logger.module';

@Module({
	imports: [
		LoggerModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		DatabaseProviderModule,
	],
	exports: [LoggerModule],
})
export class CommonModule {}
