import { Body, Controller, DefaultValuePipe, Get, Param, ParseArrayPipe, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UserParamsDto } from "src/dto/get-user-param.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { UsersService } from "./users.service";


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get("/hello")
    sayHello(@Query('id', new ParseArrayPipe({ items: Number, separator: '-' })) ids: number[]) {
        console.log(ids)
        return "Hello users"
    }

    @Get()
    getAllUsers(@Query('name') name: string, @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number): CreateUserDto[] {
        console.log(page)
        return this.usersService.getAllUsers(name);
    }

    // "?" is used to make any params value optional by attaching "?" at the end of params name. 
    // Note :- All optional Params should be present at the End always !!
    // If we want to take only specific params then we can pass that inside Params('id') directly.

    @Get(':id/:isActive?')
    getSpecificUser(@Param() params: UserParamsDto): CreateUserDto {
        console.log("Params : ", params)
        return { id: 1, name: 'John', isActive: true, email: "john@gmail.com", gender: "M" }
        // return this.usersService.getSpecificUser(id);
    }


    @Post()
    createNewUser(@Body() user: CreateUserDto): string {
        // console.log(user)
        // const user: CreateUserDto = { name: 'Jack', isActive: false, gender: "M", email: "jack@gmail.com" }
        // return this.usersService.createNewUser(user);
        return "User Created"
    }

    @Patch()
    updateUser(@Body() user: UpdateUserDto): string {
        console.log(user)
        return "Updated user"
    }
}