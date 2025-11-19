import { Module } from '@nestjs/common';
import { VehicleController } from '../http/controllers/vehicle.controller';
import { MaintenanceController } from '../http/controllers/maintenance.controller';
import { ReminderController } from '../http/controllers/reminder.controller';

import {
  CreateVehicleUseCase,
  GetVehiclesUseCase,
  GetVehicleByIdUseCase,
  UpdateVehicleUseCase,
  DeleteVehicleUseCase,
} from '../../application/use-cases/vehicle';

import {
  GetMaintenanceHistoryUseCase,
  CreateMaintenanceRecordUseCase,
  UpdateMaintenanceRecordUseCase,
} from '../../application/use-cases/maintenance';

import {
  GetRemindersUseCase,
  CreateReminderUseCase,
} from '../../application/use-cases/reminder';

import {
  VehicleMapper,
  MaintenanceHistoryMapper,
  ServiceReminderMapper,
} from '../../application/mappers';


@Module({
  controllers: [
    VehicleController,
    MaintenanceController,
    ReminderController,
  ],
  providers: [
    CreateVehicleUseCase,
    GetVehiclesUseCase,
    GetVehicleByIdUseCase,
    UpdateVehicleUseCase,
    DeleteVehicleUseCase,

    GetMaintenanceHistoryUseCase,
    CreateMaintenanceRecordUseCase,
    UpdateMaintenanceRecordUseCase,

    GetRemindersUseCase,
    CreateReminderUseCase,

    VehicleMapper,
    MaintenanceHistoryMapper,
    ServiceReminderMapper,
  ],
})
export class VehicleModule {}