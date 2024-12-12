import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // This is normal way to inject using className where provider token name is class itself.
  // constructor(private readonly appService: AppService) {}

  // We will use Inject decorator to resolve this when the provider token name is a string, not same as className
  constructor(@Inject('App_Service') private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
