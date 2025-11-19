
export enum ServiceTypeEnum {
  OIL_CHANGE = 'OIL_CHANGE',
  TIRE_ROTATION = 'TIRE_ROTATION',
  BRAKE_INSPECTION = 'BRAKE_INSPECTION',
  BRAKE_REPLACEMENT = 'BRAKE_REPLACEMENT',
  FILTER_REPLACEMENT = 'FILTER_REPLACEMENT',
  BATTERY_REPLACEMENT = 'BATTERY_REPLACEMENT',
  ALIGNMENT = 'ALIGNMENT',
  TRANSMISSION_SERVICE = 'TRANSMISSION_SERVICE',
  COOLANT_FLUSH = 'COOLANT_FLUSH',
  ENGINE_TUNEUP = 'ENGINE_TUNEUP',
  INSPECTION = 'INSPECTION',
  OTHER = 'OTHER',
}

export class ServiceType {
  private readonly value: ServiceTypeEnum;

  private constructor(type: string) {
    this.validate(type);
    this.value = type as ServiceTypeEnum;
  }

  static create(type: string): ServiceType {
    return new ServiceType(type);
  }

  private validate(type: string): void {
    if (!type) {
      throw new Error('Tipo de servicio requerido');
    }

    if (!Object.values(ServiceTypeEnum).includes(type as ServiceTypeEnum)) {
      throw new Error(
        `Tipo de servicio inválido. Debe ser uno de: ${Object.values(ServiceTypeEnum).join(', ')}`,
      );
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ServiceType): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }


  getDisplayName(): string {
    const names: Record<ServiceTypeEnum, string> = {
      [ServiceTypeEnum.OIL_CHANGE]: 'Cambio de aceite',
      [ServiceTypeEnum.TIRE_ROTATION]: 'Rotación de llantas',
      [ServiceTypeEnum.BRAKE_INSPECTION]: 'Inspección de frenos',
      [ServiceTypeEnum.BRAKE_REPLACEMENT]: 'Reemplazo de frenos',
      [ServiceTypeEnum.FILTER_REPLACEMENT]: 'Reemplazo de filtros',
      [ServiceTypeEnum.BATTERY_REPLACEMENT]: 'Reemplazo de batería',
      [ServiceTypeEnum.ALIGNMENT]: 'Alineación',
      [ServiceTypeEnum.TRANSMISSION_SERVICE]: 'Servicio de transmisión',
      [ServiceTypeEnum.COOLANT_FLUSH]: 'Cambio de anticongelante',
      [ServiceTypeEnum.ENGINE_TUNEUP]: 'Afinación de motor',
      [ServiceTypeEnum.INSPECTION]: 'Inspección general',
      [ServiceTypeEnum.OTHER]: 'Otro',
    };

    return names[this.value];
  }
}