
export class Mileage {
  private readonly value: number;

  private constructor(mileage: number) {
    this.validate(mileage);
    this.value = mileage;
  }

  static create(mileage: number): Mileage {
    return new Mileage(mileage);
  }

  private validate(mileage: number): void {
    if (mileage < 0) {
      throw new Error('El kilometraje no puede ser negativo');
    }

    if (mileage > 999999) {
      throw new Error('El kilometraje excede el límite razonable (999,999 km)');
    }

    if (!Number.isInteger(mileage)) {
      throw new Error('El kilometraje debe ser un número entero');
    }
  }

  getValue(): number {
    return this.value;
  }

  canUpdateTo(newMileage: Mileage): boolean {
    return newMileage.value >= this.value;
  }

  difference(other: Mileage): number {
    return Math.abs(this.value - other.value);
  }

  equals(other: Mileage): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return `${this.value.toLocaleString()} km`;
  }
}