import { Injectable, Inject } from '@nestjs/common';
import { IVehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import { Vehicle } from '../../../domain/entities/vehicle.entity';
import {
  VehicleNotFoundException,
  VehicleNotOwnedByUserException,
} from '../../../domain/exceptions/vehicle.exceptions';
import { VehicleDto } from '../../dtos/response/vehicle.dto';


@Injectable()
export class GetVehicleByIdUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(vehicleId: string, ownerId: string): Promise<VehicleDto> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new VehicleNotFoundException(vehicleId);
    }

    if (vehicle.getOwnerId() !== ownerId) {
      throw new VehicleNotOwnedByUserException(vehicleId, ownerId);
    }

    return this.toDto(vehicle);
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