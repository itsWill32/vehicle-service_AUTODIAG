
export class VIN {
  private readonly value: string;

  private constructor(vin: string) {
    this.validate(vin);
    this.value = vin.toUpperCase().trim();
  }

  static create(vin: string): VIN {
    return new VIN(vin);
  }

  private validate(vin: string): void {
    if (!vin) {
      throw new Error('VIN requerido');
    }

    if (vin.length !== 17) {
      throw new Error('VIN debe tener exactamente 17 caracteres');
    }

    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    
    if (!vinRegex.test(vin)) {
      throw new Error('VIN contiene caracteres inválidos (no se permiten I, O, Q)');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: VIN): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  getManufacturerCode(): string {
    return this.value.substring(0, 3);
  }
}