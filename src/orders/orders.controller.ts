import { Controller, Get, HttpStatus, Response, Patch, Param, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersRepository: OrdersRepository, private readonly ordersService: OrdersService) {}

    @Get()
    public async getOrders(@Response() res) {
        const orders = await this.ordersRepository.getAllOrders();
        return res.status(HttpStatus.OK).json(orders);
    }

    @Get('/:id')
    public async getOrder(@Response() res, @Param() param) {
        const orders = await this.ordersRepository.getOrderById(param.id);
        return res.status(HttpStatus.OK).json(orders);
    }

    @Get('/:id/status')
    public async getOrderStatus(@Response() res, @Param() param) {
        const orders = await this.ordersRepository.getOrderById(param.id);
        return res.status(HttpStatus.OK).json(orders.status);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createOrder(@Response() res, @Body() createOrderDto: CreateOrderDto) {
        const order = await this.ordersService.createOrder(createOrderDto);
        return res.status(HttpStatus.NO_CONTENT).json(order);
    }

    @Patch('/:id')
    public async updateOrder(@Param() param, @Response() res, @Body() body) {
        const order = await this.ordersRepository.updateOrder(param.id, body);
        return res.status(HttpStatus.NO_CONTENT).json(order);
    }
}
