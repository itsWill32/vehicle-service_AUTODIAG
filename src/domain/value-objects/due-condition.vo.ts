
export enum DueType {
  MILEAGE = 'MILEAGE',
  DATE = 'DATE',
}

export class DueCondition {
  private readonly type: DueType;
  private readonly value: string; 

  private constructor(type: DueType, value: string) {
    this.validate(type, value);
    this.type = type;
    this.value = value;
  }

  static createByMileage(mileage: number): DueCondition {
    return new DueCondition(DueType.MILEAGE, mileage.toString());
  }

  static createByDate(date: Date): DueCondition {
    return new DueCondition(DueType.DATE, date.toISOString());
  }

  static fromPrimitives(type: string, value: string): DueCondition {
    return new DueCondition(type as DueType, value);
  }

  private validate(type: DueType, value: string): void {
    if (!type || !value) {
      throw new Error('Tipo y valor de vencimiento requeridos');
    }

    if (type === DueType.MILEAGE) {
      const mileage = parseInt(value);
      if (isNaN(mileage) || mileage < 0) {
        throw new Error('Kilometraje de vencimiento inválido');
      }
    }

    if (type === DueType.DATE) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('Fecha de vencimiento inválida');
      }
    }
  }

  getType(): string {
    return this.type;
  }

  getValue(): string {
    return this.value;
  }


  isDue(currentMileage: number, currentDate: Date): boolean {
    if (this.type === DueType.MILEAGE) {
      return currentMileage >= parseInt(this.value);
    }

    if (this.type === DueType.DATE) {
      return currentDate >= new Date(this.value);
    }

    return false;
  }

  getDisplayValue(): string {
    if (this.type === DueType.MILEAGE) {
      return `${parseInt(this.value).toLocaleString()} km`;
    }

    if (this.type === DueType.DATE) {
      return new Date(this.value).toLocaleDateString('es-MX');
    }

    return this.value;
  }

  equals(other: DueCondition): boolean {
    return this.type === other.type && this.value === other.value;
  }

  toString(): string {
    return `${this.type}: ${this.getDisplayValue()}`;
  }
}