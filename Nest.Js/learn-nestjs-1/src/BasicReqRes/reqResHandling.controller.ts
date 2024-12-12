import { Controller, Get, Header, HttpCode, HttpStatus, Post, Redirect, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller('user')
export class BasicReqResHandlingController {

    @Get()
    sayHello(): string {
        return "Welcome User!"
    }


    // We can also use Req and Res to manually perform all the operation we did in express to controll the res and req.
    // We can set Headers, statusCodes and other stuff as well.

    // I can pass the Numeric value inside HttpCode along with i can use Nest js inbuilt HttpStatus markup like OK, NOT_FOUND, ACCEPTED etc.

    // We can also override the Status code using response object internally.

    // Similarly we can set the Headers using decorators as well as using res object too internally.

    // We can Also Redirect the request to some other URL using Decorater as well as using res object too internally for Dynamic routing and return 'url'. 

    // We can also pass a parameter called { passthrough: true } inside Res so we do not need to handle manual return. Nest js handle it by itself and we can simply return anything.

    @Get('/info')
    @HttpCode(HttpStatus.OK)
    @Header('content-type', 'application/json')
    getUserInfo(@Req() req: Request, @Res({ passthrough: true }) res: Response) {

        res.status(201);
        res.setHeader('X-NAME', 'Nitesh')

        res.json({
            msg: "User data !!"
        })

    }


    @Get('/data')
    @Redirect('/user/photo', 302)
    getUserData() {

    }


    @Get('/detail')
    getUserDetails(@Req() req: Request, @Res() res: Response) {

        const num = Math.floor(Math.random() * 10 + 1);
        let url = ''
        if (num % 2) {
            url += '/user/docs'
        } else {
            url += '/user/photo'
        }

        res.redirect(url)
    }

    @Get('/photo')
    getUserPhoto() {
        return "Photo"
    }

    @Get('/docs')
    getUserDocs() {
        return "User Documents"
    }

}