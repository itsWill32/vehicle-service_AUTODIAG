
export enum Currency {
  MXN = 'MXN',
  USD = 'USD',
}

export class Money {
  private readonly amount: number;
  private readonly currency: Currency;

  private constructor(amount: number, currency: Currency = Currency.MXN) {
    this.validate(amount);
    this.amount = amount;
    this.currency = currency;
  }

  static create(amount: number, currency: Currency = Currency.MXN): Money {
    return new Money(amount, currency);
  }

  private validate(amount: number): void {
    if (amount < 0) {
      throw new Error('El monto no puede ser negativo');
    }

    if (amount > 9999999.99) {
      throw new Error('El monto excede el límite razonable');
    }

    const decimals = (amount.toString().split('.')[1] || '').length;
    if (decimals > 2) {
      throw new Error('El monto solo puede tener hasta 2 decimales');
    }
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }


  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('No se pueden sumar montos de diferentes monedas');
    }
    return Money.create(this.amount + other.amount, this.currency);
  }


  isGreaterThan(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new Error('No se pueden comparar montos de diferentes monedas');
    }
    return this.amount > other.amount;
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  toString(): string {
    return `${this.currency} $${this.amount.toFixed(2)}`;
  }
}