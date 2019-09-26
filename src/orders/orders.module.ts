import { Module, HttpModule } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { ordersProviders } from './providers/orders.provider';
import { databaseProviders } from 'src/database/database.providers';
import { OrdersService } from './orders.service';

@Module({
  imports: [HttpModule],
  controllers: [OrdersController],
  providers: [...databaseProviders, OrdersRepository, ...ordersProviders, OrdersService],
})
export class OrdersModule {}
