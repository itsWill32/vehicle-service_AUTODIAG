import { ServiceReminder } from '../entities/service-reminder.entity';


export interface IServiceReminderRepository {

  save(reminder: ServiceReminder): Promise<ServiceReminder>;


  findById(id: string): Promise<ServiceReminder | null>;


  findByVehicleId(vehicleId: string): Promise<ServiceReminder[]>;


  findByVehicleIdAndStatus(vehicleId: string, status: string): Promise<ServiceReminder[]>;


  findPendingByVehicleId(vehicleId: string): Promise<ServiceReminder[]>;


  findOverdueByVehicleId(vehicleId: string): Promise<ServiceReminder[]>;


  findActiveByVehicleId(vehicleId: string): Promise<ServiceReminder[]>;


  findByOwnerId(ownerId: string): Promise<ServiceReminder[]>;


  delete(id: string): Promise<void>;


  deleteByVehicleId(vehicleId: string): Promise<void>;


  countActiveByVehicleId(vehicleId: string): Promise<number>;

  findUpcomingByVehicleId(
    vehicleId: string,
    daysAhead: number,
    currentMileage: number,
    kmAhead: number,
  ): Promise<ServiceReminder[]>;
}