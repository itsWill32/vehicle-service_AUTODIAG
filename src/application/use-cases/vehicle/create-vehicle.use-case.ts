import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IVehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import { Vehicle } from '../../../domain/entities/vehicle.entity';
import { LicensePlate } from '../../../domain/value-objects/license-plate.vo';
import { VIN } from '../../../domain/value-objects/vin.vo';
import {
  VehicleAlreadyExistsException,
  DuplicateVINException,
} from '../../../domain/exceptions/vehicle.exceptions';
import { CreateVehicleDto } from '../../dtos/request/create-vehicle.dto';
import { VehicleDto } from '../../dtos/response/vehicle.dto';


@Injectable()
export class CreateVehicleUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(ownerId: string, dto: CreateVehicleDto): Promise<VehicleDto> {
    const licensePlateVO = LicensePlate.create(dto.licensePlate);
    const existingByPlate = await this.vehicleRepository.existsByLicensePlate(licensePlateVO);
    
    if (existingByPlate) {
      throw new VehicleAlreadyExistsException(dto.licensePlate);
    }

    if (dto.vin) {
      const vinVO = VIN.create(dto.vin);
      const existingByVIN = await this.vehicleRepository.existsByVIN(vinVO);
      
      if (existingByVIN) {
        throw new DuplicateVINException(dto.vin);
      }
    }

    const vehicle = Vehicle.create(
      uuidv4(),
      ownerId,
      dto.brand,
      dto.model,
      dto.year,
      dto.licensePlate,
      dto.currentMileage,
      dto.vin,
      dto.photoUrl,
    );

    const savedVehicle = await this.vehicleRepository.save(vehicle);

    return this.toDto(savedVehicle);
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