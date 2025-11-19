import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';


export class UpdateVehicleDto {
  @ApiPropertyOptional({
    description: 'Nuevo kilometraje del vehículo',
    example: 48000,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(999999)
  currentMileage?: number;

  @ApiPropertyOptional({
    description: 'Nueva URL de la foto del vehículo',
    example: 'https://cdn.autodiag.com/vehicles/updated.jpg',
  })
  @IsOptional()
  @IsString()
  photoUrl?: string;
}