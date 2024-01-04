import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as controllers from './index.controllers';
import { CreateUserCommand } from './signUp/signUp.command';
import { User } from './entities/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [...Object.values(controllers)],
  providers: [CreateUserCommand],
})
export class userModule {}
