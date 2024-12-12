import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsObject, IsString, MinLength, ValidateNested } from "class-validator";
import { UserAddressDto } from "./user.address.dto";



export class CreateUserDto {

    @IsString()
    @MinLength(5)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;

    @IsObject()
    @ValidateNested()
    @IsNotEmpty()
    @Type(() => UserAddressDto)
    address: UserAddressDto

}