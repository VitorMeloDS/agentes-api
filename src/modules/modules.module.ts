import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
	exports: [UserModule],
	providers: [UserModule],
})
export class ModulesModule {}
