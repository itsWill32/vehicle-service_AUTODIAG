// autodiag-vehicle-service/src/application/dto/input/create-vehicle.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsUrl,
  Min,
  Max,
} from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'Corolla' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 2020, minimum: 1990, maximum: 2025 })
  @IsInt()
  @Min(1990)
  @Max(2025)
  year: number;

  @ApiProperty({ example: 'ABC-123-XYZ' })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiPropertyOptional({ example: '1HGBH41JXMN109186', minLength: 17, maxLength: 17 })
  @IsOptional()
  @IsString()
  @MinLength(17)
  @MaxLength(17)
  vin?: string;

  @ApiPropertyOptional({ example: 45000, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  currentMileage?: number;

  @ApiPropertyOptional({ format: 'uri', example: 'https://.../corolla.jpg' })
  @IsOptional()
  @IsUrl()
  photoUrl?: string;
}