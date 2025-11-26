import { ServiceType } from '../value-objects/service-type.vo';
import { Money } from '../value-objects/money.vo';
import { Mileage } from '../value-objects/mileage.vo';

export class MaintenanceHistory {
  private constructor(
    private readonly id: string,
    private readonly vehicleId: string,
    private readonly serviceType: ServiceType,
    private description: string | null,
    private readonly serviceDate: Date,
    private readonly mileageAtService: Mileage,
    private cost: Money | null,
    private workshopName: string | null,
    private invoiceUrl: string | null,
    private notes: string | null,
    private readonly createdBy: string,        
    private readonly createdByRole: string,    
    private readonly createdAt: Date,
  ) {}

  static create(
    id: string,
    vehicleId: string,
    serviceType: string,
    serviceDate: Date,
    mileageAtService: number,
    createdBy: string,           
    createdByRole: string,       
    description?: string,
    cost?: number,
    currency?: string,
    workshopName?: string,
    invoiceUrl?: string,
    notes?: string,
  ): MaintenanceHistory {
    const serviceTypeVO = ServiceType.create(serviceType);
    const mileageVO = Mileage.create(mileageAtService);
    const costVO = cost !== undefined ? Money.create(cost, currency as any) : null;

    this.validateServiceDate(serviceDate);
    this.validateRole(createdByRole);  
    if (description) this.validateDescription(description);
    if (workshopName) this.validateWorkshopName(workshopName);
    if (notes) this.validateNotes(notes);

    return new MaintenanceHistory(
      id,
      vehicleId,
      serviceTypeVO,
      description || null,
      serviceDate,
      mileageVO,
      costVO,
      workshopName || null,
      invoiceUrl || null,
      notes || null,
      createdBy,        
      createdByRole,    
      new Date(),
    );
  }

  static fromPrimitives(
    id: string,
    vehicleId: string,
    serviceType: string,
    description: string | null,
    serviceDate: Date,
    mileageAtService: number,
    cost: number | null,
    currency: string,
    workshopName: string | null,
    invoiceUrl: string | null,
    notes: string | null,
    createdBy: string,        
    createdByRole: string,    
    createdAt: Date,
  ): MaintenanceHistory {
    const serviceTypeVO = ServiceType.create(serviceType);
    const mileageVO = Mileage.create(mileageAtService);
    const costVO = cost !== null ? Money.create(cost, currency as any) : null;

    return new MaintenanceHistory(
      id,
      vehicleId,
      serviceTypeVO,
      description,
      serviceDate,
      mileageVO,
      costVO,
      workshopName,
      invoiceUrl,
      notes,
      createdBy,        
      createdByRole,    
      createdAt,
    );
  }

  updateInfo(
    description?: string,
    cost?: number,
    currency?: string,
    invoiceUrl?: string,
    notes?: string,
  ): void {
    if (description !== undefined) {
      MaintenanceHistory.validateDescription(description);
      this.description = description;
    }
  
    if (cost !== undefined) {
      this.cost = Money.create(cost, currency as any);
    }
  
    if (invoiceUrl !== undefined) {
      this.invoiceUrl = invoiceUrl;
    }
  
    if (notes !== undefined) {
      MaintenanceHistory.validateNotes(notes);
      this.notes = notes;
    }
  }

  private static validateServiceDate(date: Date): void {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Fecha de servicio inválida');
    }

    if (date > new Date()) {
      throw new Error('La fecha de servicio no puede ser futura');
    }
  }

  private static validateRole(role: string): void {
    const validRoles = ['VEHICLE_OWNER', 'WORKSHOP_ADMIN', 'SYSTEM_ADMIN'];
    if (!validRoles.includes(role)) {
      throw new Error(
        `Rol inválido: ${role}. Roles válidos: ${validRoles.join(', ')}`
      );
    }
  }

  private static validateDescription(description: string): void {
    if (description && description.length > 500) {
      throw new Error('La descripción no debe exceder los 500 caracteres');
    }
  }

  private static validateWorkshopName(name: string): void {
    if (name && name.length > 100) {
      throw new Error('El nombre del taller no debe exceder los 100 caracteres');
    }
  }

  private static validateNotes(notes: string): void {
    if (notes && notes.length > 1000) {
      throw new Error('Las notas no deben exceder los 1000 caracteres');
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

  getServiceDate(): Date {
    return this.serviceDate;
  }

  getMileageAtService(): number {
    return this.mileageAtService.getValue();
  }

  getCost(): number | null {
    return this.cost ? this.cost.getAmount() : null;
  }

  getCurrency(): string {
    return this.cost ? this.cost.getCurrency() : 'MXN';
  }

  getWorkshopName(): string | null {
    return this.workshopName;
  }

  getInvoiceUrl(): string | null {
    return this.invoiceUrl;
  }

  getNotes(): string | null {
    return this.notes;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }

  getCreatedByRole(): string {
    return this.createdByRole;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}