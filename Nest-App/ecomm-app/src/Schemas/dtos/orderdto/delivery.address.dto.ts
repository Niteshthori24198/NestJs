import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class DeliveryAddressDto {

    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    name: string;


    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    state: string;


    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    city: string;


    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    pincode: string;



    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    phone: number
}