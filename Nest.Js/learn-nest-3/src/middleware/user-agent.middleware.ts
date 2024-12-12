import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


export function userAgentMiddleware(req: Request, res: Response, next: NextFunction) {
    let ua = req.headers["user-agent"];

    console.log("Inside user agent function MW", ua)

    req["ua"] = ua

    next()
}



@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: Error | any) => void) {

        let ua = req.headers["user-agent"];

        console.log("Inside user agent function MW", ua)

        req["ua"] = ua

        next()
    }
}