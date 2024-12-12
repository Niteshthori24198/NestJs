import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './DB/db.connection.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { DataBaseModelModule } from './models/db.models';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    DatabaseModule,
    UserModule,
    TaskModule,
    DataBaseModelModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
