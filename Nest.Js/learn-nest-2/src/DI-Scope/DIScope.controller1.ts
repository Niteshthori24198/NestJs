import { Controller } from "@nestjs/common";
import { UserStore } from "./store";

@Controller()
export class AlbumController {
    constructor(private store: UserStore) {
        console.log("Album controller init")
        console.log(this.store)
    }
}