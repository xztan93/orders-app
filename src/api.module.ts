import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { HttpExceptionsFilter } from './exception-filters/http-exceptions.filter';

@Module({
  imports: [OrdersModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
  ],
  exports: [OrdersModule],
})
export class ApiModule {}
