import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
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

import {
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from '../../../application/dtos/request';
import { MaintenanceHistoryDto } from '../../../application/dtos/response';

import {
  GetMaintenanceHistoryUseCase,
  CreateMaintenanceRecordUseCase,
  UpdateMaintenanceRecordUseCase,
} from '../../../application/use-cases/maintenance';

@ApiTags('Maintenance')
@ApiBearerAuth()
@Controller('vehicles/:vehicleId/maintenance')
@UseGuards(JwtAuthGuard)  
export class MaintenanceController {
  constructor(
    private readonly getMaintenanceHistoryUseCase: GetMaintenanceHistoryUseCase,
    private readonly createMaintenanceRecordUseCase: CreateMaintenanceRecordUseCase,
    private readonly updateMaintenanceRecordUseCase: UpdateMaintenanceRecordUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener historial de mantenimiento' })
  @ApiParam({ name: 'vehicleId', description: 'ID del vehículo' })
  @ApiQuery({
    name: 'serviceType',
    required: false,
    description: 'Filtrar por tipo de servicio',
  })
  @ApiQuery({
    name: 'fromDate',
    required: false,
    description: 'Fecha inicio (filtro)',
    type: String,
  })
  @ApiQuery({
    name: 'toDate',
    required: false,
    description: 'Fecha fin (filtro)',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Historial de mantenimiento',
    type: [MaintenanceHistoryDto],
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'El vehículo no pertenece al usuario' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  async getMaintenanceHistory(
    @Request() req: any,  
    @Param('vehicleId') vehicleId: string,
    @Query('serviceType') serviceType?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<MaintenanceHistoryDto[]> {
    const userId = req.user?.userId || req.user?.sub || req.user?.id;
    const userRole = req.user?.role || 'VEHICLE_OWNER';

    const from = fromDate ? new Date(fromDate) : undefined;
    const to = toDate ? new Date(toDate) : undefined;

    return this.getMaintenanceHistoryUseCase.execute(
      vehicleId,
      userId,
      userRole,      
      serviceType,
      from,
      to,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Agregar registro de mantenimiento' })
  @ApiParam({ name: 'vehicleId', description: 'ID del vehículo' })
  @ApiResponse({
    status: 201,
    description: 'Registro creado exitosamente',
    type: MaintenanceHistoryDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'El vehículo no pertenece al usuario' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  async createMaintenanceRecord(
    @Request() req: any,  
    @Param('vehicleId') vehicleId: string,
    @Body() dto: CreateMaintenanceDto,
  ): Promise<MaintenanceHistoryDto> {
    const userId = req.user?.userId || req.user?.sub || req.user?.id;
    const userRole = req.user?.role || 'VEHICLE_OWNER';

    return this.createMaintenanceRecordUseCase.execute(
      vehicleId,
      userId,
      userRole,  
      dto
    );
  }

  @Patch(':recordId')
  @ApiOperation({ summary: 'Actualizar registro de mantenimiento' })
  @ApiParam({ name: 'vehicleId', description: 'ID del vehículo' })
  @ApiParam({ name: 'recordId', description: 'ID del registro' })
  @ApiResponse({
    status: 200,
    description: 'Registro actualizado exitosamente',
    type: MaintenanceHistoryDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'El vehículo no pertenece al usuario' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  async updateMaintenanceRecord(
    @Request() req: any,  
    @Param('vehicleId') vehicleId: string,
    @Param('recordId') recordId: string,
    @Body() dto: UpdateMaintenanceDto,
  ): Promise<MaintenanceHistoryDto> {
    const userId = req.user?.userId || req.user?.sub || req.user?.id;
    const userRole = req.user?.role || 'VEHICLE_OWNER';

    return this.updateMaintenanceRecordUseCase.execute(
      vehicleId,
      recordId,
      userId,
      userRole,  
      dto,
    );
  }
}