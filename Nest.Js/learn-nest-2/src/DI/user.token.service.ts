import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor() {
        console.log('User Service init');
    }

}
