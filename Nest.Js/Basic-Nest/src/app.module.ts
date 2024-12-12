import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CustomUserModule } from './customPipes/custom.user.module';

@Module({
  imports: [UsersModule, CustomUserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
