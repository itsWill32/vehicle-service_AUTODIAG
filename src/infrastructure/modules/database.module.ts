import { Module, Global } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  PrismaVehicleRepository,
  PrismaMaintenanceHistoryRepository,
  PrismaServiceReminderRepository,
} from '../database/repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    
    {
      provide: 'IVehicleRepository',
      useClass: PrismaVehicleRepository,
    },
    {
      provide: 'IMaintenanceHistoryRepository',
      useClass: PrismaMaintenanceHistoryRepository,
    },
    {
      provide: 'IServiceReminderRepository',
      useClass: PrismaServiceReminderRepository,
    },
  ],
  exports: [
    PrismaService,
    'IVehicleRepository',
    'IMaintenanceHistoryRepository',
    'IServiceReminderRepository',
  ],
})
export class DatabaseModule {}