import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UserAddressDto {

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    city: string;


    @IsString()
    @IsNotEmpty()
    pincode: string;

    @IsNumber()
    @IsNotEmpty()
    phone: number;

}