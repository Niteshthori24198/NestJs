import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LogInterceptor } from './interceptor/interceptor';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_INTERCEPTOR',
    useClass: LogInterceptor
  }],
})
export class AppModule { }
