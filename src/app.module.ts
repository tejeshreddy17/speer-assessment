import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { DataSource } from 'typeorm';
import { noteModule } from './notes/notes.module';
import { userModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dataSourceOptions;
      },
    }),
    noteModule,
    userModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
