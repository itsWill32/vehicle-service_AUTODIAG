import { Module } from '@nestjs/common';
import { VehicleService } from '../../application/use-cases/vehicle-serfvice';
import { VehiclesController } from '../adapters/input/rest/vehicles.controller';
import { VEHICLE_REPOSITORY } from '../../domain/interfaces/vehicle.repository.inerface';
import { PrismaVehicleRepository } from '../adapters/output/persistence/prisma-vehicle.respository';
import { DatabaseModule } from './database.module'; 

@Module({
  imports: [DatabaseModule], 
  controllers: [VehiclesController],
  providers: [
    VehicleService,
    {
      provide: VEHICLE_REPOSITORY,
      useClass: PrismaVehicleRepository,
    },
  ],
})
export class VehicleModule {}