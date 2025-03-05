import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ModulesModule } from '@modules/modules.module';
import { CommonModule } from '@common/common.module';

@Module({
	imports: [ConfigModule.forRoot(), CommonModule, ModulesModule],
})
export class AppModule {}
