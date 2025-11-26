import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { IVehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import { IMaintenanceHistoryRepository } from '../../../domain/repositories/maintenance-history.repository.interface';
import { MaintenanceHistory } from '../../../domain/entities/maintenance-history.entity';
import {
  VehicleNotFoundException,
  VehicleNotOwnedByUserException,
} from '../../../domain/exceptions/vehicle.exceptions';
import {
  MaintenanceRecordNotFoundException,
  MaintenanceRecordNotOwnedByVehicleException,
} from '../../../domain/exceptions/maintenance.exceptions';
import { UpdateMaintenanceDto } from '../../dtos/request/update-maintenance.dto';
import { MaintenanceHistoryDto } from '../../dtos/response/maintenance-history.dto';

@Injectable()
export class UpdateMaintenanceRecordUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository,
    @Inject('IMaintenanceHistoryRepository')
    private readonly maintenanceRepository: IMaintenanceHistoryRepository,
  ) {}

  async execute(
    vehicleId: string,
    recordId: string,
    userId: string,
    userRole: string,  
    dto: UpdateMaintenanceDto,
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

      console.log(`[WORKSHOP_ADMIN] Actualizando registro ${recordId}`);
    } else if (userRole === 'SYSTEM_ADMIN') {
      console.log(`[SYSTEM_ADMIN] Actualizando registro ${recordId}`);
    } else {
      throw new ForbiddenException(
        `Rol no autorizado para actualizar registros: ${userRole}`
      );
    }

    const record = await this.maintenanceRepository.findById(recordId);

    if (!record) {
      throw new MaintenanceRecordNotFoundException(recordId);
    }

    if (record.getVehicleId() !== vehicleId) {
      throw new MaintenanceRecordNotOwnedByVehicleException(recordId, vehicleId);
    }

    record.updateInfo(
      dto.description,
      dto.cost,
      dto.currency,
      dto.invoiceUrl,
      dto.notes,
    );

    const updatedRecord = await this.maintenanceRepository.save(record);

    return this.toDto(updatedRecord);
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