import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../domain/entities/product.entity';
import { GetAllProductsDto } from 'src/controller/product/product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async save(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async findOneById(id: number): Promise<Product> {
    const query = this.productRepository
      .createQueryBuilder('products')
      .leftJoin('products.category', 'categories')
      .addSelect(['categories.id', 'categories.name'])
      .where('products.id = :id', { id });

    return query.getOne();
  }

  async findAll(
    dto: GetAllProductsDto,
  ): Promise<{ totalData: number; data: Product[] }> {
    const query = this.productRepository
      .createQueryBuilder('products')
      .select([
        'products.id',
        'products.sku',
        'products.name',
        'products.description',
      ]);

    if (dto.search) {
      query
        .where('products.name ILIKE :search', { search: `%${dto.search}%` })
        .orWhere('products.sku ILIKE :search', { search: `%${dto.search}%` })
        .orWhere('products.description ILIKE :search', {
          search: `%${dto.search}%`,
        });
    }

    query.skip((dto.page - 1) * dto.pageSize).take(dto.pageSize);

    const [data, totalData] = await query.getManyAndCount();
    return { data, totalData };
  }

  async update(id: number, product: Product): Promise<Product> {
    await this.productRepository.update(id, product);
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
