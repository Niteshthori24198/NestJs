
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";



export class LoginUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}


export interface LoginResponse {
    token: string,
    msg: string
}


export interface LogedOutUserResponse {
    msg: string
}