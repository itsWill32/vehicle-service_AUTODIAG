import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Vehicle } from '../../../../domain/entities/vehicle.entity';
import { IVehicleRepository } from '../../../../domain/interfaces/vehicle.repository.inerface';

@Injectable()
export class PrismaVehicleRepository implements IVehicleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(vehicle: Vehicle): Promise<Vehicle> {
    const newVehicle = await this.prisma.vehicle.create({
      data: {
        userId: vehicle.userId,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        plate: vehicle.plate,
        vin: vehicle.vin,
        mileage: vehicle.mileage,
        photo: vehicle.photo,
        isActive: vehicle.isActive,
      },
    });
    return new Vehicle(newVehicle);
  }

  async findAllByUserId(userId: string): Promise<Vehicle[]> {
    const vehicles = await this.prisma.vehicle.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    return vehicles.map((v) => new Vehicle(v));
  }

  async findById(id: string): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id, isActive: true },
    });
    return vehicle ? new Vehicle(vehicle) : null;
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { plate },
    });
    return vehicle ? new Vehicle(vehicle) : null;
  }

  async update(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle> {
    const updatedVehicle = await this.prisma.vehicle.update({
      where: { id },
      data: vehicle,
    });
    return new Vehicle(updatedVehicle);
  }

  async delete(id: string): Promise<void> {
    // Usamos un soft-delete o un delete real?
    // El 'delete' del MVP sugiere un hard-delete.
    await this.prisma.vehicle.delete({
      where: { id },
    });
  }
}