import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { AuthMiddleware } from "src/middleware/auth.middleware";
import { CartService } from "src/CartModule/cart.service";

@Module({
    controllers: [OrderController],
    providers: [OrderService, CartService]
})
export class OrderModule implements NestModule {

    constructor() { }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(OrderController)
    }

}