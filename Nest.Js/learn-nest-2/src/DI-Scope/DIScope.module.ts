import { Module } from "@nestjs/common";
import { UserStore } from "./store";
import { UserController } from "./DIScope.controller";
import { AlbumController } from "./DIScope.controller1";

@Module({
    controllers: [UserController, AlbumController],
    providers: [UserStore]
})
export class DIScopeModule { }