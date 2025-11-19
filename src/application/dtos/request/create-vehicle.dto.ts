import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, Matches, Min, Max, Length } from 'class-validator';


export class CreateVehicleDto {
  @ApiProperty({
    description: 'Marca del vehículo',
    example: 'Toyota',
  })
  @IsString()
  @Length(1, 50)
  brand: string;

  @ApiProperty({
    description: 'Modelo del vehículo',
    example: 'Corolla',
  })
  @IsString()
  @Length(1, 50)
  model: string;

  @ApiProperty({
    description: 'Año del vehículo',
    example: 2020,
    minimum: 1990,
  })
  @IsInt()
  @Min(1990)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @ApiProperty({
    description: 'Placa del vehículo (formato: ABC-123-XYZ)',
    example: 'ABC-123-XYZ',
    pattern: '^[A-Z]{3}-\\d{3}-[A-Z]{3}$',
  })
  @IsString()
  @Matches(/^[A-Z]{3}-\d{3}-[A-Z]{3}$/i, {
    message: 'Formato de placa inválido. Debe ser: ABC-123-XYZ',
  })
  licensePlate: string;

  @ApiPropertyOptional({
    description: 'VIN del vehículo (17 caracteres)',
    example: '1HGBH41JXMN109186',
    minLength: 17,
    maxLength: 17,
  })
  @IsOptional()
  @IsString()
  @Length(17, 17)
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/i, {
    message: 'VIN debe tener 17 caracteres alfanuméricos (sin I, O, Q)',
  })
  vin?: string;

  @ApiProperty({
    description: 'Kilometraje actual del vehículo',
    example: 45000,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @Max(999999)
  currentMileage: number;

  @ApiPropertyOptional({
    description: 'URL de la foto del vehículo',
    example: 'https://cdn.autodiag.com/vehicles/corolla2020.jpg',
  })
  @IsOptional()
  @IsString()
  photoUrl?: string;
}