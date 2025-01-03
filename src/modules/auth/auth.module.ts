import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class UserModule {}
