import { ApiPreconditionRequiredResponse, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class GetAllProductsDto {
  @ApiProperty({
    type: Number,
    required: true,
    default: 1,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number;

  @ApiProperty({
    type: Number,
    required: true,
    default: 1,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(10)
  pageSize: number;

  @ApiProperty({ required: false })
  @IsOptional()
  search: string;
}

export class AddProductDto {
  @ApiProperty()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty()
  @IsNotEmpty()
  sku: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  width: number;

  @ApiProperty()
  length: number;

  @ApiProperty()
  height: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;
}
