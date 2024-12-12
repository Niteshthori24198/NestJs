import { IsMongoId, IsNotEmpty, IsNumber, IsPositive } from "class-validator";


export class CartItemDto {

    @IsMongoId()
    @IsNotEmpty()
    product_id: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;
}