import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthMiddleware } from "src/middleware/auth.middleware";

@Module({
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule implements NestModule {

    constructor() { }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).exclude({
            path: "user/register", method: RequestMethod.POST
        }, {
            path: "user/login", method: RequestMethod.POST
        }).forRoutes(UserController)
    }

}