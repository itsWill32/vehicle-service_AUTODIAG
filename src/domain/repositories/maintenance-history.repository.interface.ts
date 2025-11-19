import { MaintenanceHistory } from '../entities/maintenance-history.entity';


export interface IMaintenanceHistoryRepository {

  save(record: MaintenanceHistory): Promise<MaintenanceHistory>;


  findById(id: string): Promise<MaintenanceHistory | null>;


  findByVehicleId(vehicleId: string): Promise<MaintenanceHistory[]>;


  findByVehicleIdAndServiceType(
    vehicleId: string,
    serviceType: string,
  ): Promise<MaintenanceHistory[]>;


  findByVehicleIdAndDateRange(
    vehicleId: string,
    fromDate: Date,
    toDate: Date,
  ): Promise<MaintenanceHistory[]>;


  findLatestByVehicleId(vehicleId: string): Promise<MaintenanceHistory | null>;


  findLatestByVehicleIdAndServiceType(
    vehicleId: string,
    serviceType: string,
  ): Promise<MaintenanceHistory | null>;


  delete(id: string): Promise<void>;


  deleteByVehicleId(vehicleId: string): Promise<void>;


  countByVehicleId(vehicleId: string): Promise<number>;
}