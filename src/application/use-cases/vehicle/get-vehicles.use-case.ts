import { Injectable, Inject } from '@nestjs/common';
import { IVehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import { Vehicle } from '../../../domain/entities/vehicle.entity';
import { VehicleDto } from '../../dtos/response/vehicle.dto';


@Injectable()
export class GetVehiclesUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(ownerId: string): Promise<VehicleDto[]> {
    const vehicles = await this.vehicleRepository.findByOwnerId(ownerId);
    
    return vehicles.map((vehicle) => this.toDto(vehicle));
  }

  private toDto(vehicle: Vehicle): VehicleDto {
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
}