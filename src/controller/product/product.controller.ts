import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsUseCase } from 'src/usecase/product.usecase';
import { AddProductDto, GetAllProductsDto } from './product.dto';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productsUseCase: ProductsUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List Product',
  })
  async getAll(@Query() dto: GetAllProductsDto) {
    const { data, totalData } = await this.productsUseCase.getAllProducts(dto);
    let responseData = {
      page: dto.page,
      totalItems: totalData,
      totalPages: Math.ceil(totalData / dto.pageSize),
      results: data,
    };

    return { message: 'Get List Product Succes', data: responseData };
  }

  @Get(':id')
  async getDetail(@Param('id') id: number) {
    const data = await this.productsUseCase.getDetail(id);

    return { message: 'Get Detail Product Success', data };
  }

  @Post()
  async addProduct(@Body() dto: AddProductDto) {
    await this.productsUseCase.addProduct(dto);
    return { message: 'Add Product Success' };
  }
}
