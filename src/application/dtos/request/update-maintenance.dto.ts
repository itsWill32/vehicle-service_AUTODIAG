import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, Min, Max, Length } from 'class-validator';
import { Currency } from '../../../domain/value-objects/money.vo';


export class UpdateMaintenanceDto {
  @ApiPropertyOptional({
    description: 'Nueva descripción del servicio',
    example: 'Cambio de aceite sintético 5W-40',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Nuevo costo del servicio',
    example: 900.00,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(9999999.99)
  cost?: number;

  @ApiPropertyOptional({
    description: 'Nueva moneda del costo',
    enum: Currency,
    example: Currency.MXN,
  })
  @IsOptional()
  @IsEnum(Currency)
  currency?: Currency;

  @ApiPropertyOptional({
    description: 'Nueva URL de la factura',
    example: 'https://cdn.autodiag.com/invoices/inv456.pdf',
  })
  @IsOptional()
  @IsString()
  invoiceUrl?: string;

  @ApiPropertyOptional({
    description: 'Nuevas notas adicionales',
    example: 'Actualizado con nueva información',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @Length(0, 1000)
  notes?: string;
}