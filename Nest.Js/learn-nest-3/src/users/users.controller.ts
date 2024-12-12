import { Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";

@Controller('user')
export class UserController {

    @Get()
    getUser(@Req() req: Request) {
        console.log(req["ua"])
        return "user"
    }
    @Post()
    addUser(@Req() req: Request) {
        if (req["ua"] === "postman")
            return "user added"
        throw new Error()
    }
}