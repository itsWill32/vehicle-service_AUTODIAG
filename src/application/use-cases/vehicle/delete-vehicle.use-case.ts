import { Injectable, Inject } from '@nestjs/common';
import { IVehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import {
  VehicleNotFoundException,
  VehicleNotOwnedByUserException,
} from '../../../domain/exceptions/vehicle.exceptions';


@Injectable()
export class DeleteVehicleUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(vehicleId: string, ownerId: string): Promise<void> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new VehicleNotFoundException(vehicleId);
    }

    if (vehicle.getOwnerId() !== ownerId) {
      throw new VehicleNotOwnedByUserException(vehicleId, ownerId);
    }

    await this.vehicleRepository.delete(vehicleId);
  }
}