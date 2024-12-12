import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { AuthMiddleware } from "src/middleware/auth.middleware";

@Module({
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService]
})
export class CartModule implements NestModule {

    constructor() { }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(CartController)
    }

}