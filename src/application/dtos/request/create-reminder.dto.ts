import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, Length } from 'class-validator';
import { ServiceTypeEnum } from '../../../domain/value-objects/service-type.vo';
import { DueType } from '../../../domain/value-objects/due-condition.vo';


export class CreateReminderDto {
  @ApiProperty({
    description: 'Tipo de servicio a recordar',
    enum: ServiceTypeEnum,
    example: ServiceTypeEnum.OIL_CHANGE,
  })
  @IsEnum(ServiceTypeEnum)
  serviceType: ServiceTypeEnum;

  @ApiPropertyOptional({
    description: 'Descripción del recordatorio',
    example: 'Cambio de aceite cada 5,000 km',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiProperty({
    description: 'Tipo de condición de vencimiento',
    enum: DueType,
    example: DueType.MILEAGE,
  })
  @IsEnum(DueType)
  dueType: DueType;

  @ApiProperty({
    description: 'Valor de vencimiento (kilometraje o fecha ISO)',
    example: '50000',
  })
  @IsString()
  dueValue: string;
}