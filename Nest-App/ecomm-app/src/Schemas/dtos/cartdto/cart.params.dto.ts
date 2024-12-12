import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CartParamsDto {

    @IsMongoId()
    @IsNotEmpty()
    @Type(() => String)
    cartId: string;


    @IsMongoId()
    @IsNotEmpty()
    @Type(() => String)
    productId: string;

}