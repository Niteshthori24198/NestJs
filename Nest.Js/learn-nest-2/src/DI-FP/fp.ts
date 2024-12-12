import { Injectable } from "@nestjs/common"

@Injectable()
export class EnvConfig {
    envTpye: "DEV" | "PROD"

    constructor() {
        this.envTpye = "DEV"
    }
}


export class A {
    arr: number[] = []

    constructor(a: number[]) {
        this.arr = a
    }

}


export class B {
    store: Map<string, number>
    constructor() {
        this.store = new Map();
    }


}