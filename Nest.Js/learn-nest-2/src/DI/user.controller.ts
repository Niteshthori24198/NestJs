import { Controller } from "@nestjs/common";
import { UserService } from "./user.token.service";


@Controller()
export class UserController {
    constructor(private readonly store: UserService) { 
        console.log(this.store);
    }
}
