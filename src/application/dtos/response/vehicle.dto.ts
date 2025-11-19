import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class VehicleDto {
  @ApiProperty({
    description: 'ID del vehículo',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID del propietario',
    example: '987e6543-e21b-12d3-a456-426614174999',
  })
  ownerId: string;

  @ApiProperty({
    description: 'Marca del vehículo',
    example: 'Toyota',
  })
  brand: string;

  @ApiProperty({
    description: 'Modelo del vehículo',
    example: 'Corolla',
  })
  model: string;

  @ApiProperty({
    description: 'Año del vehículo',
    example: 2020,
  })
  year: number;

  @ApiProperty({
    description: 'Placa del vehículo',
    example: 'ABC-123-XYZ',
  })
  licensePlate: string;

  @ApiPropertyOptional({
    description: 'VIN del vehículo',
    example: '1HGBH41JXMN109186',
    nullable: true,
  })
  vin: string | null;

  @ApiProperty({
    description: 'Kilometraje actual',
    example: 45000,
  })
  currentMileage: number;

  @ApiPropertyOptional({
    description: 'URL de la foto',
    example: 'https://cdn.autodiag.com/vehicles/corolla2020.jpg',
    nullable: true,
  })
  photoUrl: string | null;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2024-11-01T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2024-11-15T14:30:00.000Z',
  })
  updatedAt: Date;
}