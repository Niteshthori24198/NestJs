import { Controller, Get } from "@nestjs/common";
import { UserStore } from "./store";


@Controller('myuser')
export class UserController {
    constructor(private store: UserStore) {
        console.log("user controller init")
        console.log(this.store)
    }

    @Get()
    sayHello() {
        return "Hello"
    }
}