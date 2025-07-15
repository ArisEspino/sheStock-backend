import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';

//service es para insertar a la tabla user
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    //create user, pasamos la clases de validacion, para la creacion.
    async create(createUserDto: CreateUserDto): Promise<User> {

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword
        });
        console.log(hashedPassword);
        return await this.userRepository.save(newUser);
    }
    //obtener todo los usuarios 
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    //Obtener el id (JWT)
    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }
}
