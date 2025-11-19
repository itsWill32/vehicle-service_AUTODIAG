

export class ReminderNotFoundException extends Error {
  constructor(reminderId: string) {
    super(`Service reminder not found: ${reminderId}`);
    this.name = 'ReminderNotFoundException';
  }
}

export class ReminderAlreadyCompletedException extends Error {
  constructor(reminderId: string) {
    super(`Reminder ${reminderId} is already completed`);
    this.name = 'ReminderAlreadyCompletedException';
  }
}

export class InvalidReminderStatusException extends Error {
  constructor(status: string) {
    super(`Invalid reminder status: ${status}`);
    this.name = 'InvalidReminderStatusException';
  }
}

export class ReminderNotOwnedByVehicleException extends Error {
  constructor(reminderId: string, vehicleId: string) {
    super(`Reminder ${reminderId} does not belong to vehicle ${vehicleId}`);
    this.name = 'ReminderNotOwnedByVehicleException';
  }
}

export class InvalidDueConditionException extends Error {
  constructor(message: string) {
    super(`Invalid due condition: ${message}`);
    this.name = 'InvalidDueConditionException';
  }
}

export class CannotPostponeCompletedReminderException extends Error {
  constructor() {
    super('Cannot postpone a completed reminder');
    this.name = 'CannotPostponeCompletedReminderException';
  }
}

export class CannotDismissCompletedReminderException extends Error {
  constructor() {
    super('Cannot dismiss a completed reminder');
    this.name = 'CannotDismissCompletedReminderException';
  }
}

export class InvalidPostponeDateException extends Error {
  constructor() {
    super('Postpone date must be in the future');
    this.name = 'InvalidPostponeDateException';
  }
}