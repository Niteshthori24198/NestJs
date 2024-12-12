import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";



export class ProductQueryParamsDto {


    @IsString()
    @IsOptional()
    title: string


    @IsString()
    @IsOptional()
    category: string

}


export class GetProductParamsDto {

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page: number;
    
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit: number;

}