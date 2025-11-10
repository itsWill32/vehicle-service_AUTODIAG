import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUrl, Min } from 'class-validator';

export class UpdateVehicleDto {
  @ApiPropertyOptional({ example: 48000, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  currentMileage?: number;

  @ApiPropertyOptional({ format: 'uri', example: 'https://.../updated.jpg' })
  @IsOptional()
  @IsUrl()
  photoUrl?: string;
}