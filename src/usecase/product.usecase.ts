import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { STATUS_CODES } from 'http';
import {
  AddProductDto,
  GetAllProductsDto,
} from 'src/controller/product/product.dto';
import { AuditLog } from 'src/domain/entities/audit-log.entity';
import { Category } from 'src/domain/entities/category.entity';
import { Product } from 'src/domain/entities/product.entity';
import { AuditLogRepository } from 'src/infrastructure/repositories/audit-log.repository';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';

@Injectable()
export class ProductsUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly auditLogRepository: AuditLogRepository,
  ) {}

  async getAllProducts(
    dto: GetAllProductsDto,
  ): Promise<{ totalData: number; data: Product[] }> {
    return this.productRepository.findAll(dto);
  }

  async getDetail(id: number): Promise<Product> {
    const data = await this.productRepository.findOneById(id);

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  async addProduct(dto: AddProductDto): Promise<void> {
    const category = await this.categoryRepository.findById(dto.categoryId);

    if (!category) {
      throw new BadRequestException({
        message: 'Category not found',
        statusCode: 400,
      });
    }

    const newProduct = new Product();
    newProduct.category = category;
    newProduct.sku = dto.sku;
    newProduct.name = dto.name;
    newProduct.description = dto.description;
    newProduct.weight = dto.weight;
    newProduct.width = dto.width;
    newProduct.length = dto.length;
    newProduct.height = dto.height;
    newProduct.image = dto.image;
    newProduct.price = dto.price;

    const productSaved = await this.productRepository.save(newProduct);

    const auditLog = new AuditLog();
    auditLog.action = 'CREATE';
    auditLog.entity = 'Products';
    auditLog.details = `New data products just added with id: ${productSaved.id}`;
    auditLog.createdAt = new Date();

    await this.auditLogRepository.create(auditLog);
  }
}
