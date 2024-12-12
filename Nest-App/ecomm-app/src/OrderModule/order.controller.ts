import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Order } from "src/Schemas/order.schema";
import { CreateOrderDto } from "src/Schemas/dtos/orderdto/create.order.dto";
import { Request } from "express";
import { Cart } from "src/Schemas/cart.schema";
import { OrderResponseDto } from "src/Schemas/dtos/orderdto/order.response.dto";
import { CartService } from "src/CartModule/cart.service";
const mongoose = require('mongoose')


@Controller('order')
export class OrderController {

    constructor(private readonly orderService: OrderService) { }


    @Post('/placeOrder')
    placeNewOrder(@Req() req: Request): Promise<OrderResponseDto> {
        console.log("inside controller", req["userId"])
        return this.orderService.placeNewOrder(req["userId"]);
    }

    @Get('/get/:orderId')
    getUserOrderInfo(@Req() req: Request, @Param('orderId') orderId: string): Promise<Order> {
        console.log("Order Id :-", orderId)
        const userId = req["userId"];
        return this.orderService.getUserOrderInfo(orderId, userId);
    }


    @Get('/getAll')
    getAllOrdersInfo(@Req() req: Request): Promise<Order[]> {
        const userId = req["userId"];
        return this.orderService.getAllOrdersInfo(userId);
    }


    @Delete('/delete/:orderId')
    cancelOrder(@Req() req: Request, @Param('orderId') orderId: string): Promise<Order> {
        console.log("Cancel OrderId :-", orderId)
        const userId = req["userId"];
        return this.orderService.cancelOrder(orderId, userId)
    }



}