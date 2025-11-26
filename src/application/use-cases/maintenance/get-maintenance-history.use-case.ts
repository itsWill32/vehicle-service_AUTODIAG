import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { IVehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import { IMaintenanceHistoryRepository } from '../../../domain/repositories/maintenance-history.repository.interface';
import { MaintenanceHistory } from '../../../domain/entities/maintenance-history.entity';
import {
  VehicleNotFoundException,
  VehicleNotOwnedByUserException,
} from '../../../domain/exceptions/vehicle.exceptions';
import { MaintenanceHistoryDto } from '../../dtos/response/maintenance-history.dto';

@Injectable()
export class GetMaintenanceHistoryUseCase {
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
    serviceType?: string,
    fromDate?: Date,
    toDate?: Date,
  ): Promise<MaintenanceHistoryDto[]> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new VehicleNotFoundException(vehicleId);
    }

    if (userRole === 'VEHICLE_OWNER') {
      if (vehicle.getOwnerId() !== userId) {
        throw new VehicleNotOwnedByUserException(vehicleId, userId);
      }
    } else if (userRole === 'WORKSHOP_ADMIN') {

      console.log(`[WORKSHOP_ADMIN] Consultando historial de vehículo ${vehicleId}`);
    } else if (userRole === 'SYSTEM_ADMIN') {
      console.log(`[SYSTEM_ADMIN] Consultando historial de vehículo ${vehicleId}`);
    } else {
      throw new ForbiddenException(
        `Rol no autorizado para consultar historial: ${userRole}`
      );
    }

    let history: MaintenanceHistory[];

    if (serviceType) {
      history = await this.maintenanceRepository.findByVehicleIdAndServiceType(
        vehicleId,
        serviceType,
      );
    } else if (fromDate && toDate) {
      history = await this.maintenanceRepository.findByVehicleIdAndDateRange(
        vehicleId,
        fromDate,
        toDate,
      );
    } else {
      history = await this.maintenanceRepository.findByVehicleId(vehicleId);
    }

    return history.map((record) => this.toDto(record));
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