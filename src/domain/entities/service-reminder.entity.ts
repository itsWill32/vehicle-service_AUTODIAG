import { ServiceType } from '../value-objects/service-type.vo';
import { DueCondition } from '../value-objects/due-condition.vo';


export enum ReminderStatus {
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE',
  COMPLETED = 'COMPLETED',
  DISMISSED = 'DISMISSED',
}


export class ServiceReminder {
  private constructor(
    private readonly id: string,
    private readonly vehicleId: string,
    private readonly serviceType: ServiceType,
    private description: string | null,
    private readonly dueCondition: DueCondition,
    private status: ReminderStatus,
    private postponedUntil: Date | null,
    private readonly createdAt: Date,
  ) {}


  static create(
    id: string,
    vehicleId: string,
    serviceType: string,
    dueType: string,
    dueValue: string,
    description?: string,
  ): ServiceReminder {
    const serviceTypeVO = ServiceType.create(serviceType);
    const dueConditionVO = DueCondition.fromPrimitives(dueType, dueValue);

    if (description) this.validateDescription(description);

    return new ServiceReminder(
      id,
      vehicleId,
      serviceTypeVO,
      description || null,
      dueConditionVO,
      ReminderStatus.PENDING,
      null,
      new Date(),
    );
  }


  static fromPrimitives(
    id: string,
    vehicleId: string,
    serviceType: string,
    description: string | null,
    dueType: string,
    dueValue: string,
    status: string,
    postponedUntil: Date | null,
    createdAt: Date,
  ): ServiceReminder {
    const serviceTypeVO = ServiceType.create(serviceType);
    const dueConditionVO = DueCondition.fromPrimitives(dueType, dueValue);

    return new ServiceReminder(
      id,
      vehicleId,
      serviceTypeVO,
      description,
      dueConditionVO,
      status as ReminderStatus,
      postponedUntil,
      createdAt,
    );
  }


  checkIfOverdue(currentMileage: number): void {
    if (this.status !== ReminderStatus.PENDING) {
      return;
    }

    const currentDate = new Date();

    if (this.postponedUntil && currentDate < this.postponedUntil) {
      return;
    }

    if (this.dueCondition.isDue(currentMileage, currentDate)) {
      this.status = ReminderStatus.OVERDUE;
    }
  }


  markAsCompleted(): void {
    if (this.status === ReminderStatus.COMPLETED) {
      throw new Error('El recordatorio ya está completado');
    }

    this.status = ReminderStatus.COMPLETED;
  }


  dismiss(): void {
    if (this.status === ReminderStatus.COMPLETED) {
      throw new Error('No se puede descartar un recordatorio completado');
    }

    this.status = ReminderStatus.DISMISSED;
  }


  postpone(until: Date): void {
    if (this.status !== ReminderStatus.PENDING && this.status !== ReminderStatus.OVERDUE) {
      throw new Error('Solo se pueden posponer recordatorios pendientes o vencidos');
    }

    if (until <= new Date()) {
      throw new Error('La fecha de posposición debe ser futura');
    }

    this.postponedUntil = until;
    this.status = ReminderStatus.PENDING;
  }


  updateDescription(description: string): void {
    ServiceReminder.validateDescription(description);
    this.description = description;
  }



  private static validateDescription(description: string): void {
    if (description && description.length > 500) {
      throw new Error('La descripción no debe exceder los 500 caracteres');
    }
  }



  getId(): string {
    return this.id;
  }

  getVehicleId(): string {
    return this.vehicleId;
  }

  getServiceType(): string {
    return this.serviceType.getValue();
  }

  getServiceTypeDisplayName(): string {
    return this.serviceType.getDisplayName();
  }

  getDescription(): string | null {
    return this.description;
  }

  getDueType(): string {
    return this.dueCondition.getType();
  }

  getDueValue(): string {
    return this.dueCondition.getValue();
  }

  getDueDisplayValue(): string {
    return this.dueCondition.getDisplayValue();
  }

  getStatus(): string {
    return this.status;
  }

  getPostponedUntil(): Date | null {
    return this.postponedUntil;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  isPending(): boolean {
    return this.status === ReminderStatus.PENDING;
  }

  isOverdue(): boolean {
    return this.status === ReminderStatus.OVERDUE;
  }

  isCompleted(): boolean {
    return this.status === ReminderStatus.COMPLETED;
  }

  isDismissed(): boolean {
    return this.status === ReminderStatus.DISMISSED;
  }
}