// autodiag-vehicle-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VehicleModule } from './infrastructure/modules/vehicle.module';
import { AuthModule } from './infrastructure/modules/auth.module';
import { DatabaseModule } from './infrastructure/modules/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AuthModule,     // <-- Asegúrate de importar esto
    VehicleModule,  // <-- ¡Esta es la línea que te faltaba!
    DatabaseModule,
  ],
  controllers: [], // <-- Es correcto que esto esté vacío
  providers: [],
})
export class AppModule {}