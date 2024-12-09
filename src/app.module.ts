import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductController } from './controller/product/product.controller';
import { ProductRepository } from './infrastructure/repositories/product.repository';
import { Product } from './domain/entities/product.entity';
import { Category } from './domain/entities/category.entity';
import { AuditLog } from './domain/entities/audit-log.entity';
import { ProductsUseCase } from './usecase/product.usecase';
import { CategoriesController } from './controller/category/category.controller';
import { CategoryRepository } from './infrastructure/repositories/category.repository';
import { CategoryUseCase } from './usecase/category.usecase';
import { AuditLogRepository } from './infrastructure/repositories/audit-log.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make config globally available
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT'), 10),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Product, Category, AuditLog],
        synchronize: false, // Use migrations instead of auto-sync
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Product, Category, AuditLog]),
  ],
  controllers: [ProductController, CategoriesController],
  providers: [
    ProductRepository,
    ProductsUseCase,
    CategoryRepository,
    CategoryUseCase,
    AuditLogRepository,
  ],
})
export class AppModule {}
