import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

//supongo que son las clases de validacion de cada campo de la tabla user.
export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;   

    @IsNotEmpty()
    @IsEmail()
    password: string;   
} 