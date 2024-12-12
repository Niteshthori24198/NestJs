import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { AuthMiddleware } from "src/middleware/auth.middleware";

@Module({
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule implements NestModule {

    constructor() { }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(ProductController)
    }

}