import { Module } from "@nestjs/common";
import { CustomUserController } from "./custom.user.controller";


@Module({
    controllers:[CustomUserController]
})
export class CustomUserModule{}