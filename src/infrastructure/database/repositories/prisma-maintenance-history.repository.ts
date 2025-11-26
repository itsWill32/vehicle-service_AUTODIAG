import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IMaintenanceHistoryRepository } from '../../../domain/repositories/maintenance-history.repository.interface';
import { MaintenanceHistory } from '../../../domain/entities/maintenance-history.entity';

@Injectable()
export class PrismaMaintenanceHistoryRepository implements IMaintenanceHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(record: MaintenanceHistory): Promise<MaintenanceHistory> {
    const data = {
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
    };

    const savedRecord = await this.prisma.maintenanceHistory.upsert({
      where: { id: record.getId() },
      update: data,
      create: {
        ...data,
        createdAt: record.getCreatedAt(),
      },
    });

    return this.toDomain(savedRecord);
  }

  async findById(id: string): Promise<MaintenanceHistory | null> {
    const record = await this.prisma.maintenanceHistory.findUnique({
      where: { id },
    });

    return record ? this.toDomain(record) : null;
  }

  async findByVehicleId(vehicleId: string): Promise<MaintenanceHistory[]> {
    const records = await this.prisma.maintenanceHistory.findMany({
      where: { vehicleId },
      orderBy: { serviceDate: 'desc' },
    });

    return records.map((r) => this.toDomain(r));
  }

  async findByVehicleIdAndServiceType(
    vehicleId: string,
    serviceType: string,
  ): Promise<MaintenanceHistory[]> {
    const records = await this.prisma.maintenanceHistory.findMany({
      where: { vehicleId, serviceType },
      orderBy: { serviceDate: 'desc' },
    });

    return records.map((r) => this.toDomain(r));
  }

  async findByVehicleIdAndDateRange(
    vehicleId: string,
    fromDate: Date,
    toDate: Date,
  ): Promise<MaintenanceHistory[]> {
    const records = await this.prisma.maintenanceHistory.findMany({
      where: {
        vehicleId,
        serviceDate: {
          gte: fromDate,
          lte: toDate,
        },
      },
      orderBy: { serviceDate: 'desc' },
    });

    return records.map((r) => this.toDomain(r));
  }

  async findLatestByVehicleId(vehicleId: string): Promise<MaintenanceHistory | null> {
    const record = await this.prisma.maintenanceHistory.findFirst({
      where: { vehicleId },
      orderBy: { serviceDate: 'desc' },
    });

    return record ? this.toDomain(record) : null;
  }

  async findLatestByVehicleIdAndServiceType(
    vehicleId: string,
    serviceType: string,
  ): Promise<MaintenanceHistory | null> {
    const record = await this.prisma.maintenanceHistory.findFirst({
      where: { vehicleId, serviceType },
      orderBy: { serviceDate: 'desc' },
    });

    return record ? this.toDomain(record) : null;
  }

  async findByCreatedBy(createdBy: string): Promise<MaintenanceHistory[]> {
    const records = await this.prisma.maintenanceHistory.findMany({
      where: { createdBy },
      orderBy: { serviceDate: 'desc' },
    });

    return records.map((r) => this.toDomain(r));
  }

  async findByWorkshop(workshopId: string): Promise<MaintenanceHistory[]> {
    const records = await this.prisma.maintenanceHistory.findMany({
      where: { workshopName: workshopId },
      orderBy: { serviceDate: 'desc' },
    });

    return records.map((r) => this.toDomain(r));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.maintenanceHistory.delete({
      where: { id },
    });
  }

  async deleteByVehicleId(vehicleId: string): Promise<void> {
    await this.prisma.maintenanceHistory.deleteMany({
      where: { vehicleId },
    });
  }

  async countByVehicleId(vehicleId: string): Promise<number> {
    return this.prisma.maintenanceHistory.count({
      where: { vehicleId },
    });
  }

  private toDomain(prismaRecord: any): MaintenanceHistory {
    return MaintenanceHistory.fromPrimitives(
      prismaRecord.id,
      prismaRecord.vehicleId,
      prismaRecord.serviceType,
      prismaRecord.description,
      prismaRecord.serviceDate,
      prismaRecord.mileageAtService,
      prismaRecord.cost,
      prismaRecord.currency,
      prismaRecord.workshopName,
      prismaRecord.invoiceUrl,
      prismaRecord.notes,
      prismaRecord.createdBy,      
      prismaRecord.createdByRole,  
      prismaRecord.createdAt,
    );
  }
}