import { BadGatewayException, BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response } from "express";

const jwt = require('jsonwebtoken')
import { Model } from "mongoose";
import { BlackListDocument, BlackListModel } from "src/Schemas/blacklist.schema";




@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(@InjectModel(BlackListModel) private readonly blacklistModel: Model<BlackListDocument>) { }

    async use(req: Request, res: Response, next: (error?: Error | any) => void) {

        console.log("Inside MW")

        let authHeader = req.headers["authorization"];

        if (!authHeader) {
            throw new BadRequestException("No Authorization Header detected !!")
        }

        const authToken = authHeader.trim().split(' ')[1];

        try {

            const isBlackListed = await this.blacklistModel.findOne({ token: authToken });

            if (isBlackListed) {
                throw new BadRequestException("Something went wrong !! Please Login again !!")
            }

            const decoded = jwt.verify(authToken, process.env.SecretKey);

            if (!decoded) {
                throw new BadRequestException("Your Session is expired. Please Login Again !!")
            }

            const userId = decoded.userId;

            req["userId"] = userId;

            console.log("userId MW :- ",userId)

            next();

        } catch (error) {
            throw new BadGatewayException(error.message)
        }

    }
}