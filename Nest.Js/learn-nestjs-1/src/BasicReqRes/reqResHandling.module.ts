import { Module } from "@nestjs/common";
import { BasicReqResHandlingController } from "./reqResHandling.controller";

@Module({
    controllers: [BasicReqResHandlingController]
})
export class BasicReqResHandlerModule { }