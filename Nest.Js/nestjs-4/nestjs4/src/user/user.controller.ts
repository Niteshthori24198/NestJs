import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { LogInterceptor } from "src/interceptor/interceptor";

// @UseInterceptors(LogInterceptor)
@Controller('user')
export class UserController {

    // @UseInterceptors(LogInterceptor)
    @Get()
    sayHello(): string {
        return "Hello John"
    }

    @Get(':id')
    sayHelloToSpecificUser(@Param('id') id: string): string {
        return `Hello User ${id}`
    }
}