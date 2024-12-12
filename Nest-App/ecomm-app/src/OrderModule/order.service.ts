import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Cart, CartDocument, CartModel } from "src/Schemas/cart.schema";
import { CreateOrderDto, OrderItemDto } from "src/Schemas/dtos/orderdto/create.order.dto";
import { DeliveryAddressDto } from "src/Schemas/dtos/orderdto/delivery.address.dto";
import { Order, OrderDocument, OrderModel } from "src/Schemas/order.schema";

import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { OrderResponseDto } from "src/Schemas/dtos/orderdto/order.response.dto";
import { CartService } from "src/CartModule/cart.service";
import { Order_Status } from "src/Constants/constants";



@Injectable()
export class OrderService {

    constructor(@InjectModel(OrderModel) private readonly orderModel: Model<OrderDocument>, @InjectModel(CartModel) private readonly cartModel: Model<CartDocument>, private readonly cartService: CartService) {
        console.log("Order Model :- ", orderModel)
    }


    async placeNewOrder(userId: string): Promise<OrderResponseDto> {

        console.log("Ordering userId Received :- ", userId);

        try {

            const userCartItems = await this.cartModel.findOne({ userId: new mongoose.Types.ObjectId(userId) })
                .populate({
                    path: "products.product_id",
                    select: "title price description"
                }).populate({
                    path: "userId",
                    select: "name address"
                }).exec();


            if (!userCartItems) {
                throw new BadRequestException("Please first add items to cart before placing a new order !!")
            }


            const orderItems = await mapAndValidate(userCartItems)

            console.log("Order items :- ", JSON.stringify(orderItems, null, 2))

            const userOrders = await this.orderModel.findOne({ userId: userId })

            if (userOrders) {

                const newOrders = new this.orderModel({ userId: new mongoose.Types.ObjectId(userId), products: orderItems.products });

                userOrders.products.push(...newOrders.products);

                await this.orderModel.findByIdAndUpdate({ userId: new mongoose.Types.ObjectId(userId) }, userOrders);

                this.cartService.emptyUsersCart(userId)

                return {
                    success: true,
                    msg: "Order Placed Successfully !!",
                    OrderItem: userOrders
                }

            } else {

                const newOrders = new this.orderModel({ userId: new mongoose.Types.ObjectId(userId), products: orderItems.products });

                await newOrders.save();
                this.cartService.emptyUsersCart(userId)
                return {
                    success: true,
                    msg: "Order Placed Successfully !!",
                    OrderItem: newOrders
                }

            }

        } catch (error) {
            throw new BadGatewayException(error.message)
        }

    }


    async getUserOrderInfo(orderId: string, userId: string): Promise<Order> {
        console.log("Order Id Received :-", orderId, userId)
        try {

            const userOrderData = await this.orderModel.findOne({ userId: new mongoose.Types.ObjectId(userId), _id: new mongoose.Types.ObjectId(orderId) });

            console.log("user order data :- ", userOrderData)

            return userOrderData;

        } catch (error) {
            throw new BadGatewayException(error.message)
        }
    }


    async getAllOrdersInfo(userId: string): Promise<Order[]> {
        console.log("User Id Received :-", userId)

        try {

            const userOrderData = await this.orderModel.find({ userId: new mongoose.Types.ObjectId(userId) });

            console.log("user orders data :- ", userOrderData)

            return userOrderData;

        } catch (error) {
            throw new BadGatewayException(error.message)
        }

    }


    async cancelOrder(orderId: string, userId: string): Promise<Order> {
        console.log("Cancel OrderInfo Received :-", orderId, typeof orderId, userId)

        try {

            const userOrder = await this.orderModel.findOne({ userId: new mongoose.Types.ObjectId(userId), _id: new mongoose.Types.ObjectId(orderId) });

            console.log("User Order is :- ", userOrder)

            if (userOrder) {

                let isDelivered = false;
                let isCancelled = false;

                for (let i = 0; i < userOrder.products.length; i++) {
                    const { order_status } = userOrder.products[i];

                    if (order_status == "Delivered") {
                        isDelivered = true;
                        break;
                    }

                    if (order_status == "Cancelled") {
                        isCancelled = true;
                        break;
                    }
                }


                if (isDelivered || isCancelled) {
                    throw new BadRequestException("Invalid request !! Cannot change the status of a order which is either Delivered or Cancelled !!")
                }

                for (let i = 0; i < userOrder.products.length; i++) {
                    userOrder.products[i].order_status = Order_Status.Order_Cancelled;
                }

                console.log("Updated Order Status data :- ", JSON.stringify(userOrder, null, 2))

                await this.orderModel.findByIdAndUpdate({ userId: new mongoose.Types.ObjectId(userId), _id: new mongoose.Types.ObjectId(orderId) }, userOrder);

                return userOrder;


            } else {
                throw new NotFoundException("User Order Doesn't exists At all !!")
            }

        } catch (error) {
            throw new BadGatewayException(error.message)
        }

    }

}




async function mapAndValidate(rawData: any) {

    // Step 1: Map products into OrderItemDto instances

    const products = rawData.products.map((item: any) => ({

        product_id: item.product_id._id,
        title: item.product_id.title,
        description: item.product_id.description,
        quantity: item.quantity,
        total_price: item.product_id.price * item.quantity,
        delivery_address: {
            name: rawData.userId.name,
            state: rawData.userId.address.state,
            city: rawData.userId.address.city,
            pincode: rawData.userId.address.pincode,
            phone: rawData.userId.address.phone,
        },
    }));

    // Step 2: Map entire order to CreateOrderDto

    const orderDto = plainToInstance(CreateOrderDto, { products });

    // Step 3: Validate the DTO
    const errors = await validate(orderDto);

    if (errors.length > 0) {
        console.error("Validation errors:", errors);
        throw new Error("Validation failed");
    }

    return orderDto;
}
