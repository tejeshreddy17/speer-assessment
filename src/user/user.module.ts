import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as controllers from './index.controllers';
import { CreateUserCommand } from './signUp/signUp.command';
import { User } from './entities/user.entity';
import { AuthenticateUserQuery } from './authentication/signIn/authentication.query';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './authentication/guards/jwt-guard';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
    ConfigModule.forRoot(),
  ],
  controllers: [...Object.values(controllers)],
  providers: [
    CreateUserCommand,
    AuthenticateUserQuery,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class userModule {}
