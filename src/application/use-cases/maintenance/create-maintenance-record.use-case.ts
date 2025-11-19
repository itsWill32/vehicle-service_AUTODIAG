import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IVehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import { IMaintenanceHistoryRepository } from '../../../domain/repositories/maintenance-history.repository.interface';
import { MaintenanceHistory } from '../../../domain/entities/maintenance-history.entity';
import {
  VehicleNotFoundException,
  VehicleNotOwnedByUserException,
} from '../../../domain/exceptions/vehicle.exceptions';
import { InvalidMileageAtServiceException } from '../../../domain/exceptions/maintenance.exceptions';
import { CreateMaintenanceDto } from '../../dtos/request/create-maintenance.dto';
import { MaintenanceHistoryDto } from '../../dtos/response/maintenance-history.dto';


@Injectable()
export class CreateMaintenanceRecordUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository,
    @Inject('IMaintenanceHistoryRepository')
    private readonly maintenanceRepository: IMaintenanceHistoryRepository,
  ) {}

  async execute(
    vehicleId: string,
    ownerId: string,
    dto: CreateMaintenanceDto,
  ): Promise<MaintenanceHistoryDto> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new VehicleNotFoundException(vehicleId);
    }

    if (vehicle.getOwnerId() !== ownerId) {
      throw new VehicleNotOwnedByUserException(vehicleId, ownerId);
    }

    if (dto.mileageAtService > vehicle.getCurrentMileage()) {
      throw new InvalidMileageAtServiceException(
        dto.mileageAtService,
        vehicle.getCurrentMileage(),
      );
    }

    const record = MaintenanceHistory.create(
      uuidv4(),
      vehicleId,
      dto.serviceType,
      new Date(dto.serviceDate),
      dto.mileageAtService,
      dto.description,
      dto.cost,
      dto.currency,
      dto.workshopName,
      dto.invoiceUrl,
      dto.notes,
    );

    const savedRecord = await this.maintenanceRepository.save(record);

    return this.toDto(savedRecord);
  }

  private toDto(record: MaintenanceHistory): MaintenanceHistoryDto {
    return {
      id: record.getId(),
      vehicleId: record.getVehicleId(),
      serviceType: record.getServiceType(),
      description: record.getDescription(),
      serviceDate: record.getServiceDate(),
      mileageAtService: record.getMileageAtService(),
      cost: record.getCost(),
      currency: record.getCurrency(),
      workshopName: record.getWorkshopName(),
      invoiceUrl: record.getInvoiceUrl(),
      notes: record.getNotes(),
      createdAt: record.getCreatedAt(),
    };
  }
}