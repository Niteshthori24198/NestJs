import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './DI/user.module';
import { ValueModule } from './DI-ValueProvider/value.module';
import { FactoryProvider } from './DI-FP/fp.module';
import { DIScopeModule } from './DI-Scope/DIScope.module';

@Module({
  imports: [UserModule, ValueModule, FactoryProvider, DIScopeModule],
  controllers: [AppController],
  providers: [{ provide: 'App_Service', useClass: AppService }],
})
export class AppModule { }
