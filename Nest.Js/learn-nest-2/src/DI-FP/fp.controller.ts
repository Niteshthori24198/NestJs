import { Controller, Inject } from "@nestjs/common";

@Controller()
export class FactoryController {
    constructor(@Inject('Data_Type') private dt: any) {
        console.log(this.dt)
    }
}