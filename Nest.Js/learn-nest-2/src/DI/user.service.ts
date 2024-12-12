import { Injectable } from "@nestjs/common";

@Injectable()
export class UserStoreService {
    constructor() {
        console.log('User Store init');
    }

    store = new Map<string, number>();
    
}
