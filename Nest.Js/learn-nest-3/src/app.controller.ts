import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(':id')
  getHello(@Param('id') id: string): string {

    if (+id < 0) {
      throw new BadRequestException("Invalid Id value!")
    }

    return this.appService.getHello();
  }
}
