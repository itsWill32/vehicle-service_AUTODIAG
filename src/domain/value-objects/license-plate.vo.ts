export class LicensePlate {
  private readonly value: string;

  private constructor(plate: string) {
    this.validate(plate);
    this.value = plate.toUpperCase().trim();
  }

  static create(plate: string): LicensePlate {
    return new LicensePlate(plate);
  }

  private validate(plate: string): void {
    if (!plate) {
      throw new Error('Placa vehicular requerida');
    }

    const plateRegex = /^[A-Z]{3}-\d{3}-[A-Z]{3}$/i;
    
    if (!plateRegex.test(plate)) {
      throw new Error('Formato de placa inválido. Debe ser: ABC-123-XYZ');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: LicensePlate): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}