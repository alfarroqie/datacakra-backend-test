import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryUseCase } from 'src/usecase/category.usecase';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoryUseCase: CategoryUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List Categories',
  })
  async getAll() {
    const data = await this.categoryUseCase.getAllCategories();

    return { message: 'Get List Category Succes', data };
  }
}
