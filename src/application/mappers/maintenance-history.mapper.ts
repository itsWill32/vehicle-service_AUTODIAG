import { Injectable } from '@nestjs/common';
import { MaintenanceHistory } from '../../domain/entities/maintenance-history.entity';
import { MaintenanceHistoryDto } from '../dtos/response/maintenance-history.dto';


@Injectable()
export class MaintenanceHistoryMapper {

  toDto(record: MaintenanceHistory): MaintenanceHistoryDto {
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


  toDtoList(records: MaintenanceHistory[]): MaintenanceHistoryDto[] {
    return records.map((record) => this.toDto(record));
  }


  toJSON(record: MaintenanceHistory): Record<string, any> {
    return {
      id: record.getId(),
      vehicleId: record.getVehicleId(),
      serviceType: record.getServiceType(),
      serviceTypeDisplayName: record.getServiceTypeDisplayName(),
      description: record.getDescription(),
      serviceDate: record.getServiceDate().toISOString(),
      mileageAtService: record.getMileageAtService(),
      cost: record.getCost(),
      currency: record.getCurrency(),
      workshopName: record.getWorkshopName(),
      invoiceUrl: record.getInvoiceUrl(),
      notes: record.getNotes(),
      createdAt: record.getCreatedAt().toISOString(),
    };
  }


  groupByServiceType(records: MaintenanceHistory[]): Record<string, MaintenanceHistoryDto[]> {
    const grouped: Record<string, MaintenanceHistoryDto[]> = {};

    for (const record of records) {
      const serviceType = record.getServiceType();
      
      if (!grouped[serviceType]) {
        grouped[serviceType] = [];
      }
      
      grouped[serviceType].push(this.toDto(record));
    }

    return grouped;
  }

  calculateTotalCost(records: MaintenanceHistory[]): { total: number; currency: string } {
    let total = 0;
    const currency = records.length > 0 ? records[0].getCurrency() : 'MXN';

    for (const record of records) {
      const cost = record.getCost();
      if (cost !== null) {
        total += cost;
      }
    }

    return { total, currency };
  }
}