import { Injectable, Inject } from '@nestjs/common';
import { IVehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import { Vehicle } from '../../../domain/entities/vehicle.entity';
import {
  VehicleNotFoundException,
  VehicleNotOwnedByUserException,
} from '../../../domain/exceptions/vehicle.exceptions';
import { UpdateVehicleDto } from '../../dtos/request/update-vehicle.dto';
import { VehicleDto } from '../../dtos/response/vehicle.dto';


@Injectable()
export class UpdateVehicleUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(vehicleId: string, ownerId: string, dto: UpdateVehicleDto): Promise<VehicleDto> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new VehicleNotFoundException(vehicleId);
    }

    if (vehicle.getOwnerId() !== ownerId) {
      throw new VehicleNotOwnedByUserException(vehicleId, ownerId);
    }

    if (dto.currentMileage !== undefined) {
      vehicle.updateMileage(dto.currentMileage);
    }

    if (dto.photoUrl !== undefined) {
      vehicle.updateInfo(dto.photoUrl);
    }

    const updatedVehicle = await this.vehicleRepository.save(vehicle);

    return this.toDto(updatedVehicle);
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