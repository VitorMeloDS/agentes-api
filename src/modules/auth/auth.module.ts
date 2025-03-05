import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersService } from '@modules/user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule],
	controllers: [AuthController],
	providers: [AuthService, UsersService],
	exports: [AuthService],
})
export class AuthModule {}
