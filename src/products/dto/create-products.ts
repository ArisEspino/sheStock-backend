import { IsNotEmpty, IsString, IsDecimal, IsInt } from "class-validator";

export class CreateProductsDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    categoria: string;

    @IsNotEmpty()
    @IsDecimal()
    precio: number;

    @IsNotEmpty()
    @IsInt()
    stock: number;


}