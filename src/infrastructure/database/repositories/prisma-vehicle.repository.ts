import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IVehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import { Vehicle } from '../../../domain/entities/vehicle.entity';
import { LicensePlate } from '../../../domain/value-objects/license-plate.vo';
import { VIN } from '../../../domain/value-objects/vin.vo';


@Injectable()
export class PrismaVehicleRepository implements IVehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(vehicle: Vehicle): Promise<Vehicle> {
    const data = {
      id: vehicle.getId(),
      ownerId: vehicle.getOwnerId(),
      brand: vehicle.getBrand(),
      model: vehicle.getModel(),
      year: vehicle.getYear(),
      licensePlate: vehicle.getLicensePlate(),
      vin: vehicle.getVIN(),
      currentMileage: vehicle.getCurrentMileage(),
      photoUrl: vehicle.getPhotoUrl(),
      updatedAt: vehicle.getUpdatedAt(),
    };

    const savedVehicle = await this.prisma.vehicle.upsert({
      where: { id: vehicle.getId() },
      update: data,
      create: {
        ...data,
        createdAt: vehicle.getCreatedAt(),
      },
    });

    return this.toDomain(savedVehicle);
  }

  async findById(id: string): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    return vehicle ? this.toDomain(vehicle) : null;
  }

  async findByLicensePlate(licensePlate: LicensePlate): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { licensePlate: licensePlate.getValue() },
    });

    return vehicle ? this.toDomain(vehicle) : null;
  }

  async findByVIN(vin: VIN): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { vin: vin.getValue() },
    });

    return vehicle ? this.toDomain(vehicle) : null;
  }

  async findByOwnerId(ownerId: string): Promise<Vehicle[]> {
    const vehicles = await this.prisma.vehicle.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
    });

    return vehicles.map((v) => this.toDomain(v));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vehicle.delete({
      where: { id },
    });
  }

  async existsByLicensePlate(licensePlate: LicensePlate): Promise<boolean> {
    const count = await this.prisma.vehicle.count({
      where: { licensePlate: licensePlate.getValue() },
    });

    return count > 0;
  }

  async existsByVIN(vin: VIN): Promise<boolean> {
    const count = await this.prisma.vehicle.count({
      where: { vin: vin.getValue() },
    });

    return count > 0;
  }

  async countByOwnerId(ownerId: string): Promise<number> {
    return this.prisma.vehicle.count({
      where: { ownerId },
    });
  }


  private toDomain(prismaVehicle: any): Vehicle {
    return Vehicle.fromPrimitives(
      prismaVehicle.id,
      prismaVehicle.ownerId,
      prismaVehicle.brand,
      prismaVehicle.model,
      prismaVehicle.year,
      prismaVehicle.licensePlate,
      prismaVehicle.currentMileage,
      prismaVehicle.vin,
      prismaVehicle.photoUrl,
      prismaVehicle.createdAt,
      prismaVehicle.updatedAt,
    );
  }
}