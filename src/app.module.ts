import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ApiModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
