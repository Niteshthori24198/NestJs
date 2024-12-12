import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MinLength, minLength } from "class-validator";

export class CreateUserDto {
    @IsNumber()
    id: number;

    @IsString({ message: "Name must be string !" })
    @MinLength(3, { message: "Name must be of 3 char atleast " })
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    gender: string;

    @IsBoolean()
    isActive: boolean;
}