import { Injectable } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';

@Injectable()
export class CategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }
}
