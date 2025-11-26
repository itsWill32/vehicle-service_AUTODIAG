import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
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
    userId: string,
    userRole: string,  
    dto: CreateMaintenanceDto,
  ): Promise<MaintenanceHistoryDto> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new VehicleNotFoundException(vehicleId);
    }

    if (userRole === 'VEHICLE_OWNER') {
      if (vehicle.getOwnerId() !== userId) {
        throw new VehicleNotOwnedByUserException(vehicleId, userId);
      }
    } else if (userRole === 'WORKSHOP_ADMIN') {
      console.log(`[WORKSHOP_ADMIN] Creando registro para vehículo ${vehicleId}`);
    } else if (userRole === 'SYSTEM_ADMIN') {
      console.log(`[SYSTEM_ADMIN] Creando registro para vehículo ${vehicleId}`);
    } else {
      throw new ForbiddenException(
        `Rol no autorizado para crear registros de mantenimiento: ${userRole}`
      );
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
      userId,     
      userRole,   
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
      createdBy: record.getCreatedBy(),       
      createdByRole: record.getCreatedByRole(),  
      createdAt: record.getCreatedAt(),
    };
  }
}