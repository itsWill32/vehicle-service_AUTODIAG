import { Injectable } from '@nestjs/common';
import { ServiceReminder } from '../../domain/entities/service-reminder.entity';
import { ServiceReminderDto } from '../dtos/response/service-reminder.dto';


@Injectable()
export class ServiceReminderMapper {

  toDto(reminder: ServiceReminder): ServiceReminderDto {
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


  toDtoList(reminders: ServiceReminder[]): ServiceReminderDto[] {
    return reminders.map((reminder) => this.toDto(reminder));
  }


  toJSON(reminder: ServiceReminder): Record<string, any> {
    return {
      id: reminder.getId(),
      vehicleId: reminder.getVehicleId(),
      serviceType: reminder.getServiceType(),
      serviceTypeDisplayName: reminder.getServiceTypeDisplayName(),
      description: reminder.getDescription(),
      dueType: reminder.getDueType(),
      dueValue: reminder.getDueValue(),
      dueDisplayValue: reminder.getDueDisplayValue(),
      status: reminder.getStatus(),
      isPending: reminder.isPending(),
      isOverdue: reminder.isOverdue(),
      isCompleted: reminder.isCompleted(),
      isDismissed: reminder.isDismissed(),
      postponedUntil: reminder.getPostponedUntil()?.toISOString() || null,
      createdAt: reminder.getCreatedAt().toISOString(),
    };
  }


  filterActive(reminders: ServiceReminder[]): ServiceReminderDto[] {
    const activeReminders = reminders.filter(
      (reminder) => reminder.isPending() || reminder.isOverdue(),
    );
    
    return this.toDtoList(activeReminders);
  }


  groupByStatus(reminders: ServiceReminder[]): Record<string, ServiceReminderDto[]> {
    const grouped: Record<string, ServiceReminderDto[]> = {
      PENDING: [],
      OVERDUE: [],
      COMPLETED: [],
      DISMISSED: [],
    };

    for (const reminder of reminders) {
      const status = reminder.getStatus();
      grouped[status].push(this.toDto(reminder));
    }

    return grouped;
  }


  sortByUrgency(reminders: ServiceReminder[]): ServiceReminderDto[] {
    const sorted = [...reminders].sort((a, b) => {
      const priority = {
        OVERDUE: 0,
        PENDING: 1,
        COMPLETED: 2,
        DISMISSED: 3,
      };

      return priority[a.getStatus()] - priority[b.getStatus()];
    });

    return this.toDtoList(sorted);
  }


  countByStatus(reminders: ServiceReminder[]): Record<string, number> {
    return {
      pending: reminders.filter((r) => r.isPending()).length,
      overdue: reminders.filter((r) => r.isOverdue()).length,
      completed: reminders.filter((r) => r.isCompleted()).length,
      dismissed: reminders.filter((r) => r.isDismissed()).length,
    };
  }
}