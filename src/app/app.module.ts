import { Module } from '@nestjs/common';
import { ModulesModule } from '@modules/modules.module';
import { CommonModule } from '@common/common.module';

@Module({
	imports: [CommonModule, ModulesModule],
})
export class AppModule {}
