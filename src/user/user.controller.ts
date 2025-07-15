import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';


//Rutas
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('create')
    //llamamos al create 
    async createUser(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(createUserDto);
        return { message: 'User created successfully' }
    }
    @Get()
    async getUsers() {
        const users = await this.userService.findAll();
        return users;
    }
}
