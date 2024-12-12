import { Type } from "class-transformer"
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator"
import { Types } from "mongoose"
import { Order_Status, Payment_Modes } from "src/Constants/constants"
import { Product } from "src/Schemas/product.schema"
import { DeliveryAddressDto } from "./delivery.address.dto"



export class CreateOrderDto {

    @IsArray()
    @ValidateNested({ each: true })
    @IsNotEmpty()
    products: OrderItemDto[]
}




export class OrderItemDto {

    @IsMongoId()
    @IsNotEmpty()
    product_id: string | Types.ObjectId | Product;


    @IsString()
    @IsNotEmpty()
    title: string;


    @IsString()
    @IsNotEmpty()
    description: string;


    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;


    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    total_price: number;


    @IsDate()
    @IsOptional()
    order_date: Date;

    @IsString()
    @IsOptional()
    payment_mode: Payment_Modes;


    @IsString()
    @IsOptional()
    order_status: Order_Status;

    @IsObject()
    @ValidateNested()
    @IsNotEmpty()
    @Type(() => DeliveryAddressDto)
    delivery_address: DeliveryAddressDto

}