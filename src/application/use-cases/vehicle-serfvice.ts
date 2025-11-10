// autodiag-vehicle-service/src/application/use-cases/vehicle.service.ts
import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { IVehicleRepository, VEHICLE_REPOSITORY } from '../../domain/interfaces/vehicle.repository.inerface';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { CreateVehicleDto } from '../dto/input/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/input/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  // CASO DE USO 1: Crear Vehículo
  async create(createVehicleDto: CreateVehicleDto, userId: string): Promise<Vehicle> {
    // 1. Validar que la placa no exista
    const existing = await this.vehicleRepository.findByPlate(createVehicleDto.licensePlate);
    if (existing) {
      throw new ConflictException('La placa (licensePlate) ya está registrada');
    }

    // 2. Mapear DTO a Entidad
    const vehicleEntity = new Vehicle({
      userId,
      make: createVehicleDto.brand,
      model: createVehicleDto.model,
      year: createVehicleDto.year,
      plate: createVehicleDto.licensePlate,
      vin: createVehicleDto.vin,
      mileage: createVehicleDto.currentMileage,
      photo: createVehicleDto.photoUrl,
      isActive: true,
    });

    // 3. Persistir
    return this.vehicleRepository.create(vehicleEntity);
  }

  // CASO DE USO 2: Listar Vehículos
  async findAllByUserId(userId: string): Promise<Vehicle[]> {
    return this.vehicleRepository.findAllByUserId(userId);
  }

  // CASO DE USO 3: Ver Vehículo por ID
  async findOne(id: string, userId: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle || vehicle.userId !== userId) {
      throw new NotFoundException('Vehículo no encontrado');
    }
    return vehicle;
  }

  // CASO DE USO 4: Actualizar Vehículo
  async update(id: string, updateVehicleDto: UpdateVehicleDto, userId: string): Promise<Vehicle> {
    // 1. Validar propiedad
    await this.findOne(id, userId); 

    // 2. Mapear DTO a entidad parcial
    const vehicleUpdate: Partial<Vehicle> = {
      mileage: updateVehicleDto.currentMileage,
      photo: updateVehicleDto.photoUrl,
    };

    // 3. Persistir
    return this.vehicleRepository.update(id, vehicleUpdate);
  }

  // CASO DE USO 5: Eliminar Vehículo
  async remove(id: string, userId: string): Promise<void> {
    // 1. Validar propiedad
    await this.findOne(id, userId);
    
    // 2. Eliminar
    return this.vehicleRepository.delete(id);
  }
}