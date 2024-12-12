import { IsBoolean, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    title: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    description: string;


    @IsString()
    @IsNotEmpty()
    category: string;


    @IsNumber()
    @IsNotEmpty()
    quantity: number;


    @IsNumber()
    @IsNotEmpty()
    price: number;


    @IsBoolean()
    @IsNotEmpty()
    inStock: Boolean

}