import { Vehicle } from '../entities/vehicle.entity';
import { LicensePlate } from '../value-objects/license-plate.vo';
import { VIN } from '../value-objects/vin.vo';


export interface IVehicleRepository {

  save(vehicle: Vehicle): Promise<Vehicle>;


  findById(id: string): Promise<Vehicle | null>;


  findByLicensePlate(licensePlate: LicensePlate): Promise<Vehicle | null>;


  findByVIN(vin: VIN): Promise<Vehicle | null>;


  findByOwnerId(ownerId: string): Promise<Vehicle[]>;


  delete(id: string): Promise<void>;
  existsByLicensePlate(licensePlate: LicensePlate): Promise<boolean>;


  existsByVIN(vin: VIN): Promise<boolean>;


  countByOwnerId(ownerId: string): Promise<number>;
}