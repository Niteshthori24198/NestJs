import { Module } from "@nestjs/common";
import { ValueController } from "./value.controller";
import { Config } from "./token.class";

@Module({
    controllers: [ValueController],
    providers: [{
        provide: Config, useValue: {
            url: 'mysql:6302',
            host: 'localhost',
            pass: 'root'
        }
    }]
})
export class ValueModule {

}