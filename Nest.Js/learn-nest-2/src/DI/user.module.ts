import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserStoreService } from "./user.service"; 
import { UserService } from "./user.token.service"; 

@Module({
    controllers: [UserController],
    providers: [
        { provide: UserService, useClass: UserStoreService } // Mapping UserService to UserStoreService
    ]
})
export class UserModule {}
