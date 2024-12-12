import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './CartModule/cart.module';
import { OrderModule } from './OrderModule/order.module';
import { ProductModule } from './ProductModule/product.module';
import { UserModule } from './UserModule/user.module';
import { DatabaseModelsModules } from './Models/database.models';
import { DatabaseModule } from './DB/db.connection';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    UserModule,
    ProductModule,
    CartModule,
    OrderModule,
    DatabaseModule,
    DatabaseModelsModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
