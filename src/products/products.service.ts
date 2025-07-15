import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entity/products_entity';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/create-products';
import { User } from 'src/user/entity/user.entity';
import { UpdateProductDto } from './dto/update.ProductDto';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>
    ) { }
    async create(createProductsDto: CreateProductsDto, user: User): Promise<Products> {
        const newProducts = this.productsRepository.create({
            nombre: createProductsDto.nombre,
            categoria: createProductsDto.categoria,
            precio: Number(createProductsDto.precio),
            stock: createProductsDto.stock,
            date: new Date().toISOString().split('T')[0],
            user: user
        });
        console.log('DTO recibido:', createProductsDto);
        return await this.productsRepository.save(newProducts);
    }

    async findByUser(userId: number): Promise<Products[]> {
        return await this.productsRepository.find(
            {
                where: {
                    user: {
                        id: userId
                    },
                },
                relations: ['user'],
            }
        );
    }

    async findByUserId(userId: number): Promise<Products[]> {
        return this.productsRepository.find({
            where: { user: { id: userId } },
            relations: ['user']
        })
    }

    async Update(id: number, dto: UpdateProductDto, user: User) {
        const producto = await this.productsRepository.findOne({ where: { id, user } });

        if (!producto) throw new NotFoundException('Producto no encontrado');

        Object.assign(producto, dto);
        return await this.productsRepository.save(producto);
    }

    async remove(id: number, user: User) {
        const product = await this.productsRepository.findOne({ where: { id, user } });
        if (!product) throw new NotFoundException('Producto no encontrado');

        await this.productsRepository.remove(product);
        return { message: 'producto eliminado  correctamente' };

    }
} 
