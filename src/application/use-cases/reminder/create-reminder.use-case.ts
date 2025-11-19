import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IVehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import { IServiceReminderRepository } from '../../../domain/repositories/service-reminder.repository.interface';
import { ServiceReminder } from '../../../domain/entities/service-reminder.entity';
import {
  VehicleNotFoundException,
  VehicleNotOwnedByUserException,
} from '../../../domain/exceptions/vehicle.exceptions';
import { CreateReminderDto } from '../../dtos/request/create-reminder.dto';
import { ServiceReminderDto } from '../../dtos/response/service-reminder.dto';


@Injectable()
export class CreateReminderUseCase {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository,
    @Inject('IServiceReminderRepository')
    private readonly reminderRepository: IServiceReminderRepository,
  ) {}

  async execute(
    vehicleId: string,
    ownerId: string,
    dto: CreateReminderDto,
  ): Promise<ServiceReminderDto> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new VehicleNotFoundException(vehicleId);
    }

    if (vehicle.getOwnerId() !== ownerId) {
      throw new VehicleNotOwnedByUserException(vehicleId, ownerId);
    }

    const reminder = ServiceReminder.create(
      uuidv4(),
      vehicleId,
      dto.serviceType,
      dto.dueType,
      dto.dueValue,
      dto.description,
    );

    reminder.checkIfOverdue(vehicle.getCurrentMileage());

    const savedReminder = await this.reminderRepository.save(reminder);

    return this.toDto(savedReminder);
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