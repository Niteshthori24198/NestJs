import { IsArray, IsNotEmpty, IsNumber, IsObject, ValidateNested } from "class-validator"
import { CartItemDto } from "./cart.item.dto"
import { Type } from "class-transformer"


export class CreateCartDto {

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => CartItemDto)
    products: CartItemDto

}



export class UpdateCartDto {

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}



export interface EmptyCartResponse {
    msg: string;
}