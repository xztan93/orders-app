import { Document } from 'mongoose';

export interface Order extends Document {
  readonly name: string;
  readonly description: string;
  readonly status: string;
  readonly created_at: Date;
}
