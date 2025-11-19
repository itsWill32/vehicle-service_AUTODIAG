import { Injectable } from '@nestjs/common';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleDto } from '../dtos/response/vehicle.dto';


@Injectable()
export class VehicleMapper {

  toDto(vehicle: Vehicle): VehicleDto {
    return {
      id: vehicle.getId(),
      ownerId: vehicle.getOwnerId(),
      brand: vehicle.getBrand(),
      model: vehicle.getModel(),
      year: vehicle.getYear(),
      licensePlate: vehicle.getLicensePlate(),
      vin: vehicle.getVIN(),
      currentMileage: vehicle.getCurrentMileage(),
      photoUrl: vehicle.getPhotoUrl(),
      createdAt: vehicle.getCreatedAt(),
      updatedAt: vehicle.getUpdatedAt(),
    };
  }


  toDtoList(vehicles: Vehicle[]): VehicleDto[] {
    return vehicles.map((vehicle) => this.toDto(vehicle));
  }


  toJSON(vehicle: Vehicle): Record<string, any> {
    return {
      id: vehicle.getId(),
      ownerId: vehicle.getOwnerId(),
      brand: vehicle.getBrand(),
      model: vehicle.getModel(),
      year: vehicle.getYear(),
      licensePlate: vehicle.getLicensePlate(),
      vin: vehicle.getVIN(),
      currentMileage: vehicle.getCurrentMileage(),
      photoUrl: vehicle.getPhotoUrl(),
      displayName: vehicle.getDisplayName(),
      createdAt: vehicle.getCreatedAt().toISOString(),
      updatedAt: vehicle.getUpdatedAt().toISOString(),
    };
  }
}