import { IsDecimal, IsInt, IsNumber, isNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    categoria?: string;

    @IsOptional()
    @IsNumber()
    precio?: number;

    @IsOptional()
    @IsNumber()
    stock?: number;

}