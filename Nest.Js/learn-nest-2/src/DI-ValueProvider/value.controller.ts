import { Controller } from "@nestjs/common";
import { Config } from "./token.class";

@Controller()
export class ValueController {
    constructor(private config: Config) {
        console.log(this.config)
    }
}