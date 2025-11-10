
export class Vehicle {
  id: string;
  userId: string; 
  make: string;
  model: string;
  year: number;
  plate: string;
  vin?: string;
  mileage?: number;
  photo?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Vehicle>) {
    Object.assign(this, partial);
  }
}