import { Injectable, HttpService, Logger } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderStatus } from './order-status.enum';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class OrdersService {
  constructor(private httpService: HttpService, private ordersRepository: OrdersRepository) { }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.ordersRepository.createOrder(createOrderDto);

    if (newOrder) {
      const params = JSON.stringify({
        orderId: newOrder._id,
      });

      // API urls should be retrieved from config/another service.
      const paymentApiUrl = 'http://localhost:4001/api/payments';
      this.httpService.post(paymentApiUrl,
        params,
        {
          headers: {
            'Content-Type': 'application/json',
            // Auth information should be injected/retrieved using passport module.
            'Authorization': `Bearer ${jwt.sign({ id: 1, username: 'userA' }, process.env.SECRET)}`,
          },
        }).toPromise().then(response => {
          if (!response || !response.data) {
            return newOrder;
          }

          if (response.data.transactionStatus === 'confirmed') {
            this.ordersRepository.updateOrder(newOrder._id, {
              status: OrderStatus.Confirmed.toString(),
            });

            setTimeout(() => {
              this.ordersRepository.updateOrder(newOrder._id, {
                status: OrderStatus.Delivered.toString(),
              });
            }, 10000);

          } else if (response.data.transactionStatus === 'declined') {
            this.ordersRepository.updateOrder(newOrder._id, {
              status: OrderStatus.Canceled.toString(),
            });
          }
        }, response => {
          Logger.error(`Failed to make order payment. Url: '${response.config.url}'. Status: '${response.status}'. Data: '${response.data}'.`);
        });
    }

    return;
  }
}
