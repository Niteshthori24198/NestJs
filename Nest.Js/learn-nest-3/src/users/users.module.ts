import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserAgentMiddleware, userAgentMiddleware } from "src/middleware/user-agent.middleware";

@Module({
    controllers: [UserController]
})


export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserAgentMiddleware)
            .exclude({ path: "user", method: RequestMethod.GET })
            .forRoutes(UserController)
    }
}