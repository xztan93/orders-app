import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(@Inject('ORDER_MODEL') private readonly orderModel: Model<Order>) { }

  async getOrderById(orderId: number): Promise<Order> {
    return await this.orderModel.findById(orderId).exec();
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderModel.find().exec();
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = new this.orderModel(createOrderDto);
    return await newOrder.save();
  }

  async updateOrder(orderId: number, newValue: Partial<Order>): Promise<Order> {
    const order = await this.orderModel.findById(orderId).exec();

    if (!order._id) {
      return null;
    }

    await this.orderModel.findByIdAndUpdate(orderId, newValue).exec();
    return await this.orderModel.findById(orderId).exec();
  }
}
