
export class VehicleNotFoundException extends Error {
  constructor(vehicleId: string) {
    super(`Vehicle not found: ${vehicleId}`);
    this.name = 'VehicleNotFoundException';
  }
}

export class VehicleAlreadyExistsException extends Error {
  constructor(licensePlate: string) {
    super(`Vehicle with license plate ${licensePlate} already exists`);
    this.name = 'VehicleAlreadyExistsException';
  }
}

export class InvalidMileageUpdateException extends Error {
  constructor(currentMileage: number, newMileage: number) {
    super(
      `Invalid mileage update: new mileage (${newMileage} km) cannot be less than current mileage (${currentMileage} km)`,
    );
    this.name = 'InvalidMileageUpdateException';
  }
}

export class VehicleNotOwnedByUserException extends Error {
  constructor(vehicleId: string, userId: string) {
    super(`Vehicle ${vehicleId} is not owned by user ${userId}`);
    this.name = 'VehicleNotOwnedByUserException';
  }
}

export class InvalidVehicleDataException extends Error {
  constructor(message: string) {
    super(`Invalid vehicle data: ${message}`);
    this.name = 'InvalidVehicleDataException';
  }
}

export class DuplicateVINException extends Error {
  constructor(vin: string) {
    super(`Vehicle with VIN ${vin} already exists`);
    this.name = 'DuplicateVINException';
  }
}