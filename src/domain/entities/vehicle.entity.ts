import { LicensePlate } from '../value-objects/license-plate.vo';
import { VIN } from '../value-objects/vin.vo';
import { Mileage } from '../value-objects/mileage.vo';


export class Vehicle {
  private constructor(
    private readonly id: string,
    private readonly ownerId: string,
    private brand: string,
    private model: string,
    private year: number,
    private readonly licensePlate: LicensePlate,
    private vin: VIN | null,
    private currentMileage: Mileage,
    private photoUrl: string | null,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}


  static create(
    id: string,
    ownerId: string,
    brand: string,
    model: string,
    year: number,
    licensePlate: string,
    currentMileage: number,
    vin?: string,
    photoUrl?: string,
  ): Vehicle {
    const licensePlateVO = LicensePlate.create(licensePlate);
    const mileageVO = Mileage.create(currentMileage);
    const vinVO = vin ? VIN.create(vin) : null;

    this.validateBrand(brand);
    this.validateModel(model);
    this.validateYear(year);

    const now = new Date();

    return new Vehicle(
      id,
      ownerId,
      brand,
      model,
      year,
      licensePlateVO,
      vinVO,
      mileageVO,
      photoUrl || null,
      now,
      now,
    );
  }


  static fromPrimitives(
    id: string,
    ownerId: string,
    brand: string,
    model: string,
    year: number,
    licensePlate: string,
    currentMileage: number,
    vin: string | null,
    photoUrl: string | null,
    createdAt: Date,
    updatedAt: Date,
  ): Vehicle {
    const licensePlateVO = LicensePlate.create(licensePlate);
    const mileageVO = Mileage.create(currentMileage);
    const vinVO = vin ? VIN.create(vin) : null;

    return new Vehicle(
      id,
      ownerId,
      brand,
      model,
      year,
      licensePlateVO,
      vinVO,
      mileageVO,
      photoUrl,
      createdAt,
      updatedAt,
    );
  }

  updateMileage(newMileage: number): void {
    const newMileageVO = Mileage.create(newMileage);

    if (!this.currentMileage.canUpdateTo(newMileageVO)) {
      throw new Error(
        `El nuevo kilometraje (${newMileage} km) no puede ser menor al actual (${this.currentMileage.getValue()} km)`,
      );
    }

    this.currentMileage = newMileageVO;
    this.updatedAt = new Date();
  }


  updateInfo(photoUrl?: string): void {
    if (photoUrl !== undefined) {
      this.photoUrl = photoUrl;
    }

    this.updatedAt = new Date();
  }


  updateVIN(vin: string): void {
    this.vin = VIN.create(vin);
    this.updatedAt = new Date();
  }



  private static validateBrand(brand: string): void {
    if (!brand || brand.trim().length === 0) {
      throw new Error('Marca del vehículo requerida');
    }

    if (brand.length > 50) {
      throw new Error('La marca no debe exceder los 50 caracteres');
    }
  }

  private static validateModel(model: string): void {
    if (!model || model.trim().length === 0) {
      throw new Error('Modelo del vehículo requerido');
    }

    if (model.length > 50) {
      throw new Error('El modelo no debe exceder los 50 caracteres');
    }
  }

  private static validateYear(year: number): void {
    const currentYear = new Date().getFullYear();
    const minYear = 1990;

    if (year < minYear) {
      throw new Error(`El año debe ser mayor o igual a ${minYear}`);
    }

    if (year > currentYear + 1) {
      throw new Error(`El año no puede ser mayor a ${currentYear + 1}`);
    }
  }



  getId(): string {
    return this.id;
  }

  getOwnerId(): string {
    return this.ownerId;
  }

  getBrand(): string {
    return this.brand;
  }

  getModel(): string {
    return this.model;
  }

  getYear(): number {
    return this.year;
  }

  getLicensePlate(): string {
    return this.licensePlate.getValue();
  }

  getVIN(): string | null {
    return this.vin ? this.vin.getValue() : null;
  }

  getCurrentMileage(): number {
    return this.currentMileage.getValue();
  }

  getPhotoUrl(): string | null {
    return this.photoUrl;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }


  getDisplayName(): string {
    return `${this.brand} ${this.model} ${this.year}`;
  }
}