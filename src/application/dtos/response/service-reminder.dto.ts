import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class ServiceReminderDto {
  @ApiProperty({
    description: 'ID del recordatorio',
    example: '789e0123-e45b-67c8-d901-426614174222',
  })
  id: string;

  @ApiProperty({
    description: 'ID del vehículo',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  vehicleId: string;

  @ApiProperty({
    description: 'Tipo de servicio',
    example: 'OIL_CHANGE',
  })
  serviceType: string;

  @ApiPropertyOptional({
    description: 'Descripción del recordatorio',
    example: 'Cambio de aceite cada 5,000 km',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Tipo de condición de vencimiento',
    example: 'MILEAGE',
    enum: ['MILEAGE', 'DATE'],
  })
  dueType: string;

  @ApiProperty({
    description: 'Valor de vencimiento',
    example: '50000',
  })
  dueValue: string;

  @ApiProperty({
    description: 'Estado del recordatorio',
    example: 'PENDING',
    enum: ['PENDING', 'OVERDUE', 'COMPLETED', 'DISMISSED'],
  })
  status: string;

  @ApiPropertyOptional({
    description: 'Fecha hasta la cual está pospuesto',
    example: '2024-12-01T00:00:00.000Z',
    nullable: true,
  })
  postponedUntil: Date | null;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2024-11-01T10:00:00.000Z',
  })
  createdAt: Date;
}