import { Injectable, Inject } from '@nestjs/common';
import { IVehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import { IServiceReminderRepository } from '../../../domain/repositories/service-reminder.repository.interface';
import { ServiceReminder } from '../../../domain/entities/service-reminder.entity';
import {
  VehicleNotFoundException,
  VehicleNotOwnedByUserException,
} from '../../../domain/exceptions/vehicle.exceptions';
import { ServiceReminderDto } from '../../dtos/response/service-reminder.dto';


@Injectable()
export class GetRemindersUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository,
    @Inject('IServiceReminderRepository')
    private readonly reminderRepository: IServiceReminderRepository,
  ) {}

  async execute(vehicleId: string, ownerId: string, status?: string): Promise<ServiceReminderDto[]> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new VehicleNotFoundException(vehicleId);
    }

    if (vehicle.getOwnerId() !== ownerId) {
      throw new VehicleNotOwnedByUserException(vehicleId, ownerId);
    }

    let reminders: ServiceReminder[];

    if (status) {
      reminders = await this.reminderRepository.findByVehicleIdAndStatus(vehicleId, status);
    } else {
      reminders = await this.reminderRepository.findByVehicleId(vehicleId);
    }

    for (const reminder of reminders) {
      reminder.checkIfOverdue(vehicle.getCurrentMileage());
    }

    return reminders.map((reminder) => this.toDto(reminder));
  }

  private toDto(reminder: ServiceReminder): ServiceReminderDto {
    return {
      id: reminder.getId(),
      vehicleId: reminder.getVehicleId(),
      serviceType: reminder.getServiceType(),
      description: reminder.getDescription(),
      dueType: reminder.getDueType(),
      dueValue: reminder.getDueValue(),
      status: reminder.getStatus(),
      postponedUntil: reminder.getPostponedUntil(),
      createdAt: reminder.getCreatedAt(),
    };
  }
}