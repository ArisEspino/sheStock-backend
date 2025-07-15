import { Body, Controller, Post, Get, Param, ParseIntPipe, UseGuards, Request, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { UpdateProductDto } from './dto/update.ProductDto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createProducts(
        @Body() createProductsDto: CreateProductsDto,
        @Request() req
    ) {
        const user = req.user;
        await this.productService.create(createProductsDto, user);
        return { message: 'Products created successfully' }
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    async getProducts(@Request() req) {
        const userId = req.user.id;
        const products = await this.productService.findByUser(userId);
        return products;
    }

    @Get('user/:id')
    async getProductsByUser(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findByUserId(id);
    }

    @Patch('update/:id')
    @UseGuards(JwtAuthGuard)
    async updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductDto: UpdateProductDto,
        @Request() req
    ) {
        const user = req.user;
        return this.productService.Update(id, updateProductDto, user);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    async deleteProduct(
        @Param('id', ParseIntPipe) id: number,
        @Request() req
    ) {
        const user = req.user;
        return this.productService.remove(id, user);
    }
}
