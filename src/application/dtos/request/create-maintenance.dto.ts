import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsEnum,
  Min,
  Max,
  Length,
} from 'class-validator';
import { ServiceTypeEnum } from '../../../domain/value-objects/service-type.vo';
import { Currency } from '../../../domain/value-objects/money.vo';


export class CreateMaintenanceDto {
  @ApiProperty({
    description: 'Tipo de servicio realizado',
    enum: ServiceTypeEnum,
    example: ServiceTypeEnum.OIL_CHANGE,
  })
  @IsEnum(ServiceTypeEnum)
  serviceType: ServiceTypeEnum;

  @ApiPropertyOptional({
    description: 'Descripción del servicio',
    example: 'Cambio de aceite sintético 5W-30',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiProperty({
    description: 'Fecha en que se realizó el servicio',
    example: '2024-11-01',
    type: String,
    format: 'date',
  })
  @IsDateString()
  serviceDate: string;

  @ApiProperty({
    description: 'Kilometraje del vehículo al momento del servicio',
    example: 47500,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @Max(999999)
  mileageAtService: number;

  @ApiPropertyOptional({
    description: 'Costo del servicio',
    example: 850.00,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(9999999.99)
  cost?: number;

  @ApiPropertyOptional({
    description: 'Moneda del costo',
    enum: Currency,
    example: Currency.MXN,
    default: Currency.MXN,
  })
  @IsOptional()
  @IsEnum(Currency)
  currency?: Currency;

  @ApiPropertyOptional({
    description: 'Nombre del taller donde se realizó el servicio',
    example: 'Taller Mecánico El Rayo',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  workshopName?: string;

  @ApiPropertyOptional({
    description: 'URL de la factura o comprobante',
    example: 'https://cdn.autodiag.com/invoices/inv123.pdf',
  })
  @IsOptional()
  @IsString()
  invoiceUrl?: string;

  @ApiPropertyOptional({
    description: 'Notas adicionales sobre el servicio',
    example: 'Se cambió también filtro de aceite',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  notes?: string;
}