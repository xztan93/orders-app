import * as mongoose from 'mongoose';
import { OrderStatus } from '../order-status.enum';

export const OrderSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: {
    type: String,
    enum: [
      OrderStatus.Created,
      OrderStatus.Confirmed,
      OrderStatus.Delivered,
      OrderStatus.Canceled],
    default: OrderStatus.Created,
  },
  created_at: { type: Date, default: Date.now },
});
