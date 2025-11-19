import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

import { CreateVehicleDto, UpdateVehicleDto } from '../../../application/dtos/request';
import { VehicleDto } from '../../../application/dtos/response';

import {
  CreateVehicleUseCase,
  GetVehiclesUseCase,
  GetVehicleByIdUseCase,
  UpdateVehicleUseCase,
  DeleteVehicleUseCase,
} from '../../../application/use-cases/vehicle';


@ApiTags('Vehicles')
@ApiBearerAuth()
@Controller('vehicles')
@UseGuards(JwtAuthGuard)
export class VehicleController {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly getVehiclesUseCase: GetVehiclesUseCase,
    private readonly getVehicleByIdUseCase: GetVehicleByIdUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
  ) {}


  @Get()
  @ApiOperation({ summary: 'Listar vehículos del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de vehículos',
    type: [VehicleDto],
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async getVehicles(@CurrentUser() userId: string): Promise<VehicleDto[]> {
    return this.getVehiclesUseCase.execute(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Agregar vehículo' })
  @ApiResponse({
    status: 201,
    description: 'Vehículo creado exitosamente',
    type: VehicleDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 409, description: 'La placa o VIN ya existe' })
  async createVehicle(
    @CurrentUser() userId: string,
    @Body() dto: CreateVehicleDto,
  ): Promise<VehicleDto> {
    return this.createVehicleUseCase.execute(userId, dto);
  }


  @Get(':vehicleId')
  @ApiOperation({ summary: 'Obtener vehículo por ID' })
  @ApiParam({ name: 'vehicleId', description: 'ID del vehículo' })
  @ApiResponse({
    status: 200,
    description: 'Vehículo encontrado',
    type: VehicleDto,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'El vehículo no pertenece al usuario' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  async getVehicleById(
    @CurrentUser() userId: string,
    @Param('vehicleId') vehicleId: string,
  ): Promise<VehicleDto> {
    return this.getVehicleByIdUseCase.execute(vehicleId, userId);
  }


  @Patch(':vehicleId')
  @ApiOperation({ summary: 'Actualizar vehículo' })
  @ApiParam({ name: 'vehicleId', description: 'ID del vehículo' })
  @ApiResponse({
    status: 200,
    description: 'Vehículo actualizado exitosamente',
    type: VehicleDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'El vehículo no pertenece al usuario' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  async updateVehicle(
    @CurrentUser() userId: string,
    @Param('vehicleId') vehicleId: string,
    @Body() dto: UpdateVehicleDto,
  ): Promise<VehicleDto> {
    return this.updateVehicleUseCase.execute(vehicleId, userId, dto);
  }


  @Delete(':vehicleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar vehículo' })
  @ApiParam({ name: 'vehicleId', description: 'ID del vehículo' })
  @ApiResponse({ status: 204, description: 'Vehículo eliminado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'El vehículo no pertenece al usuario' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado' })
  async deleteVehicle(
    @CurrentUser() userId: string,
    @Param('vehicleId') vehicleId: string,
  ): Promise<void> {
    await this.deleteVehicleUseCase.execute(vehicleId, userId);
  }
}