import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class UserParamsDto {

    @IsNumber()
    @Type(() => Number)
    id: number;

    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    isActive: boolean
}