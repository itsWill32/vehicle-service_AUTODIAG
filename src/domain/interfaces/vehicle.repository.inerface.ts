import { Vehicle } from '../entities/vehicle.entity';

export const VEHICLE_REPOSITORY = 'VehicleRepository';

export interface IVehicleRepository {
  create(vehicle: Vehicle): Promise<Vehicle>;
  findAllByUserId(userId: string): Promise<Vehicle[]>;
  findById(id: string): Promise<Vehicle | null>;
  update(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle>;
  delete(id: string): Promise<void>;
  
  findByPlate(plate: string): Promise<Vehicle | null>;
}