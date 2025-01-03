import { DataSource } from 'typeorm';
import { LoggerService } from '@shared/utils/logger/logger.service';
import { LoggerModule } from '@shared/utils/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, OnModuleInit } from '@nestjs/common';
import * as path from 'path';
import { entities } from './entities';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService): Promise<any> => ({
				type: configService.get('DB_DRIVER') as any,
				host: configService.get('DB_HOST') as string,
				port: +configService.get('DB_PORT'),
				username: configService.get('DB_USER') as string,
				password: configService.get('DB_PASSWORD') as string,
				database: configService.get('DB_NAME') as string,
				entities: entities,
				migrations: [path.join(__dirname, '../../database/migrations/*{.ts,.js}')],
				synchronize: configService.get('APP_MODE') === 'dev',
				logging: false,
			}),
		}),
		LoggerModule,
	],
})
export class DatabaseProviderModule implements OnModuleInit {
	private readonly contextName = 'Database Conection';

	constructor(
		private readonly dataSource: DataSource,
		private readonly logger: LoggerService,
	) {}

	async onModuleInit() {
		try {
			if (!this.dataSource.isInitialized) {
				await this.dataSource.initialize();
				this.logger.log('Database agents Data Source has been initialized!', this.contextName);
			} else {
				this.logger.warn('Database connection is already initialized.', this.contextName);
			}
		} catch (error) {
			this.logger.error(`Error during agents Postgres Data Source initialization: ${error}`, this.contextName);
			throw error;
		}
	}
}
