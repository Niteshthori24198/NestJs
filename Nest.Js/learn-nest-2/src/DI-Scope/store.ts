import { Injectable, Scope } from "@nestjs/common"

@Injectable({
    scope: Scope.TRANSIENT
})
export class UserStore {
    store: Map<string, number>
    constructor() {
        this.store = new Map()
    }
}