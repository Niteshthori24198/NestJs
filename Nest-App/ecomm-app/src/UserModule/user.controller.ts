import { Body, Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "src/Schemas/dtos/userdto/create.user.dto";
import { User } from "src/Schemas/user.schema";
import { LogedOutUserResponse, LoginResponse, LoginUserDto } from "src/Schemas/dtos/userdto/login.user.dto";
import { Request } from "express";
const bcrypt = require('bcrypt')

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('/register')
    async addNewUser(@Body() userData: CreateUserDto): Promise<User> {
        console.log("User Data :- ", userData);

        const hashPass = bcrypt.hashSync(userData.password, 10);
        userData.password = hashPass;

        return await this.userService.addNewUser(userData);
    }



    @Get('/profile')
    async getUserInfo(@Req() req: Request): Promise<User> {
        const userId = req["userId"]
        console.log("UserId :- ", userId)
        return this.userService.getUserInfo(userId);
    }



    @Post('/login')
    loginUser(@Body() userCreds: LoginUserDto): Promise<LoginResponse> {
        console.log("User Creds :- ", userCreds)
        return this.userService.loginUser(userCreds)
    }



    @Delete('/logout')
    logoutUser(@Req() req: Request): Promise<LogedOutUserResponse> {

        const authToken = req.headers["authorization"].trim().split(' ')[1];

        return this.userService.logoutUser(authToken)
    }

}