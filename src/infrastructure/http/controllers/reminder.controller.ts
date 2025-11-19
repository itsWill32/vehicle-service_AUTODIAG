import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

import { CreateReminderDto } from '../../../application/dtos/request';
import { ServiceReminderDto } from '../../../application/dtos/response';

import {
  GetRemindersUseCase,
  CreateReminderUseCase,
} from '../../../application/use-cases/reminder';


@ApiTags('Reminders')
@ApiBearerAuth()
@Controller('vehicles/:vehicleId/reminders')
@UseGuards(JwtAuthGuard)
export class ReminderController {
  constructor(
    private readonly getRemindersUseCase: GetRemindersUseCase,
    private readonly createReminderUseCase: CreateReminderUseCase,
  ) {}


  @Get()
  @ApiOperation({ summary: 'Listar recordatorios del vehículo' })
  @ApiParam({ name: 'vehicleId', description: 'ID del vehículo' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por estado',
    enum: ['PENDING', 'OVERDUE', 'COMPLETED', 'DISMISSED'],
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de recordatorios',
    type: [ServiceReminderDto],
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'El vehículo no pertenece al usuario' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  async getReminders(
    @CurrentUser() userId: string,
    @Param('vehicleId') vehicleId: string,
    @Query('status') status?: string,
  ): Promise<ServiceReminderDto[]> {
    return this.getRemindersUseCase.execute(vehicleId, userId, status);
  }


  @Post()
  @ApiOperation({ summary: 'Crear recordatorio manual' })
  @ApiParam({ name: 'vehicleId', description: 'ID del vehículo' })
  @ApiResponse({
    status: 201,
    description: 'Recordatorio creado exitosamente',
    type: ServiceReminderDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'El vehículo no pertenece al usuario' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  async createReminder(
    @CurrentUser() userId: string,
    @Param('vehicleId') vehicleId: string,
    @Body() dto: CreateReminderDto,
  ): Promise<ServiceReminderDto> {
    return this.createReminderUseCase.execute(vehicleId, userId, dto);
  }
}