
export class MaintenanceRecordNotFoundException extends Error {
  constructor(recordId: string) {
    super(`Maintenance record not found: ${recordId}`);
    this.name = 'MaintenanceRecordNotFoundException';
  }
}

export class InvalidServiceDateException extends Error {
  constructor(message: string) {
    super(`Invalid service date: ${message}`);
    this.name = 'InvalidServiceDateException';
  }
}

export class InvalidServiceTypeException extends Error {
  constructor(serviceType: string) {
    super(`Invalid service type: ${serviceType}`);
    this.name = 'InvalidServiceTypeException';
  }
}

export class MaintenanceRecordNotOwnedByVehicleException extends Error {
  constructor(recordId: string, vehicleId: string) {
    super(`Maintenance record ${recordId} does not belong to vehicle ${vehicleId}`);
    this.name = 'MaintenanceRecordNotOwnedByVehicleException';
  }
}

export class InvalidMaintenanceDataException extends Error {
  constructor(message: string) {
    super(`Invalid maintenance data: ${message}`);
    this.name = 'InvalidMaintenanceDataException';
  }
}

export class FutureServiceDateException extends Error {
  constructor() {
    super('Service date cannot be in the future');
    this.name = 'FutureServiceDateException';
  }
}

export class InvalidMileageAtServiceException extends Error {
  constructor(mileageAtService: number, currentMileage: number) {
    super(
      `Mileage at service (${mileageAtService} km) cannot be greater than current mileage (${currentMileage} km)`,
    );
    this.name = 'InvalidMileageAtServiceException';
  }
}