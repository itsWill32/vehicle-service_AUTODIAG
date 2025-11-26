import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MaintenanceHistoryDto {
  @ApiProperty({
    description: 'ID del registro',
    example: '456e7890-e12b-34c5-d678-426614174111',
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
    description: 'Descripción del servicio',
    example: 'Cambio de aceite sintético 5W-30',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Fecha del servicio',
    example: '2024-11-01T00:00:00.000Z',
  })
  serviceDate: Date;

  @ApiProperty({
    description: 'Kilometraje al momento del servicio',
    example: 47500,
  })
  mileageAtService: number;

  @ApiPropertyOptional({
    description: 'Costo del servicio',
    example: 850.00,
    nullable: true,
  })
  cost: number | null;

  @ApiProperty({
    description: 'Moneda del costo',
    example: 'MXN',
  })
  currency: string;

  @ApiPropertyOptional({
    description: 'Nombre del taller',
    example: 'Taller Mecánico El Rayo',
    nullable: true,
  })
  workshopName: string | null;

  @ApiPropertyOptional({
    description: 'URL de la factura',
    example: 'https://cdn.autodiag.com/invoices/inv123.pdf',
    nullable: true,
  })
  invoiceUrl: string | null;

  @ApiPropertyOptional({
    description: 'Notas adicionales',
    example: 'Se cambió también filtro de aceite',
    nullable: true,
  })
  notes: string | null;

  @ApiProperty({
    description: 'ID del usuario que creó el registro',
    example: '789e0123-e45b-67c8-d901-234567890abc',
  })
  createdBy: string;

  @ApiProperty({
    description: 'Rol del usuario que creó el registro',
    example: 'WORKSHOP_ADMIN',
    enum: ['VEHICLE_OWNER', 'WORKSHOP_ADMIN', 'SYSTEM_ADMIN'],
  })
  createdByRole: string;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2024-11-01T10:00:00.000Z',
  })
  createdAt: Date;
}