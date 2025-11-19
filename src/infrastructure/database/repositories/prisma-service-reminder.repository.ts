import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IServiceReminderRepository } from '../../../domain/repositories/service-reminder.repository.interface';
import { ServiceReminder } from '../../../domain/entities/service-reminder.entity';


@Injectable()
export class PrismaServiceReminderRepository implements IServiceReminderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(reminder: ServiceReminder): Promise<ServiceReminder> {
    const data = {
      id: reminder.getId(),
      vehicleId: reminder.getVehicleId(),
      serviceType: reminder.getServiceType(),
      description: reminder.getDescription(),
      dueType: reminder.getDueType(),
      dueValue: reminder.getDueValue(),
      status: reminder.getStatus(),
      postponedUntil: reminder.getPostponedUntil(),
    };

    const savedReminder = await this.prisma.serviceReminder.upsert({
      where: { id: reminder.getId() },
      update: data,
      create: {
        ...data,
        createdAt: reminder.getCreatedAt(),
      },
    });

    return this.toDomain(savedReminder);
  }

  async findById(id: string): Promise<ServiceReminder | null> {
    const reminder = await this.prisma.serviceReminder.findUnique({
      where: { id },
    });

    return reminder ? this.toDomain(reminder) : null;
  }

  async findByVehicleId(vehicleId: string): Promise<ServiceReminder[]> {
    const reminders = await this.prisma.serviceReminder.findMany({
      where: { vehicleId },
      orderBy: { createdAt: 'desc' },
    });

    return reminders.map((r) => this.toDomain(r));
  }

  async findByVehicleIdAndStatus(vehicleId: string, status: string): Promise<ServiceReminder[]> {
    const reminders = await this.prisma.serviceReminder.findMany({
      where: { vehicleId, status },
      orderBy: { createdAt: 'desc' },
    });

    return reminders.map((r) => this.toDomain(r));
  }

  async findPendingByVehicleId(vehicleId: string): Promise<ServiceReminder[]> {
    return this.findByVehicleIdAndStatus(vehicleId, 'PENDING');
  }

  async findOverdueByVehicleId(vehicleId: string): Promise<ServiceReminder[]> {
    return this.findByVehicleIdAndStatus(vehicleId, 'OVERDUE');
  }

  async findActiveByVehicleId(vehicleId: string): Promise<ServiceReminder[]> {
    const reminders = await this.prisma.serviceReminder.findMany({
      where: {
        vehicleId,
        status: {
          in: ['PENDING', 'OVERDUE'],
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return reminders.map((r) => this.toDomain(r));
  }

  async findByOwnerId(ownerId: string): Promise<ServiceReminder[]> {
    const reminders = await this.prisma.serviceReminder.findMany({
      where: {
        vehicle: {
          ownerId,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return reminders.map((r) => this.toDomain(r));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.serviceReminder.delete({
      where: { id },
    });
  }

  async deleteByVehicleId(vehicleId: string): Promise<void> {
    await this.prisma.serviceReminder.deleteMany({
      where: { vehicleId },
    });
  }

  async countActiveByVehicleId(vehicleId: string): Promise<number> {
    return this.prisma.serviceReminder.count({
      where: {
        vehicleId,
        status: {
          in: ['PENDING', 'OVERDUE'],
        },
      },
    });
  }

  async findUpcomingByVehicleId(
    vehicleId: string,
    daysAhead: number,
    currentMileage: number,
    kmAhead: number,
  ): Promise<ServiceReminder[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);
    const futureMileage = currentMileage + kmAhead;

    const reminders = await this.prisma.serviceReminder.findMany({
      where: {
        vehicleId,
        status: 'PENDING',
        OR: [
          {
            dueType: 'DATE',
            dueValue: {
              lte: futureDate.toISOString(),
            },
          },
          {
            dueType: 'MILEAGE',
            dueValue: {
              lte: futureMileage.toString(),
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    return reminders.map((r) => this.toDomain(r));
  }



  private toDomain(prismaReminder: any): ServiceReminder {
    return ServiceReminder.fromPrimitives(
      prismaReminder.id,
      prismaReminder.vehicleId,
      prismaReminder.serviceType,
      prismaReminder.description,
      prismaReminder.dueType,
      prismaReminder.dueValue,
      prismaReminder.status,
      prismaReminder.postponedUntil,
      prismaReminder.createdAt,
    );
  }
}