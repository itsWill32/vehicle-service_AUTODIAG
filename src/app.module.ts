import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/modules/database.module';
import { VehicleModule } from './infrastructure/modules/vehicle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,
    VehicleModule,
  ],
})
export class AppModule {}