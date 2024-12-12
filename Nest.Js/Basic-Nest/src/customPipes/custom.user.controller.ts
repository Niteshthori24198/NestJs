import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TrimAndValidationPipe } from "./custom.pipe";


@Controller('user')
export class CustomUserController {

    @Get(':un')
    getUserName(@Param('un', TrimAndValidationPipe) username: string) {
        return `Username is : ${username}`
    }

    @Post()
    createUser(@Body(TrimAndValidationPipe) desc: string) {

        return `User description :- ${desc}`
    }
}