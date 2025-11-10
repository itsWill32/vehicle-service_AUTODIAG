import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { VehicleService } from '../../../../application/use-cases/vehicle-serfvice';
import { CreateVehicleDto } from '../../../../application/dto/input/create-vehicle.dto';
import { UpdateVehicleDto } from '../../../../application/dto/input/update-vehicle.dto';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guards';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@ApiBearerAuth() // Indica que todos los endpoints aquí requieren un token
@UseGuards(JwtAuthGuard) // Protege todos los endpoints
@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehicleService: VehicleService) {}

  // MVP 1: POST /vehicles
  @Post()
  @ApiOperation({ summary: 'Agregar vehículo' })
  @ApiResponse({ status: 201, description: 'Vehículo creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Request inválido.' })
  @ApiResponse({ status: 409, description: 'La placa ya existe.' })
  create(
    @Body() createVehicleDto: CreateVehicleDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;
    return this.vehicleService.create(createVehicleDto, userId);
  }

  // MVP 2: GET /vehicles
  @Get()
  @ApiOperation({ summary: 'Listar vehículos del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de vehículos.' })
  findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.vehicleService.findAllByUserId(userId);
  }

  // MVP 3: GET /vehicles/:id
  @Get(':id')
  @ApiOperation({ summary: 'Obtener vehículo por ID' })
  @ApiResponse({ status: 200, description: 'Vehículo encontrado.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;
    return this.vehicleService.findOne(id, userId);
  }

  // MVP 4: PATCH /vehicles/:id
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar vehículo' })
  @ApiResponse({ status: 200, description: 'Vehículo actualizado.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;
    return this.vehicleService.update(id, updateVehicleDto, userId);
  }

  // MVP 5: DELETE /vehicles/:id
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar vehículo' })
  @ApiResponse({ status: 204, description: 'Vehículo eliminado.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;
    return this.vehicleService.remove(id, userId);
  }
}