import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BlackListDocument, BlackListModel } from "src/Schemas/blacklist.schema";
import { CreateUserDto } from "src/Schemas/dtos/userdto/create.user.dto";
import { LogedOutUserResponse, LoginResponse, LoginUserDto } from "src/Schemas/dtos/userdto/login.user.dto";
import { User, UserDocument, UserModel } from "src/Schemas/user.schema";
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




@Injectable()
export class UserService {

    constructor(@InjectModel(UserModel) private readonly userModel: Model<UserDocument>, @InjectModel(BlackListModel) private readonly blacklistModel: Model<BlackListDocument>) {
        console.log('UserModel :- ', userModel)
    }


    async addNewUser(userData: CreateUserDto): Promise<User> {
        console.log("User Data Received :- ", userData)

        try {

            const user = new this.userModel(userData);
            await user.save();
            return user;
        } catch (error) {
            throw new BadGatewayException("Something went wrong :- " + error.message);
        }

    }


    async getUserInfo(userId: string): Promise<User> {

        console.log("UserId Received :- ", userId);

        try {

            const user = await this.userModel.findById({ _id: new mongoose.Types.ObjectId(userId) });

            if (!user) {
                throw new NotFoundException("User Doesn't Exists !!")
            }

            return user;
        } catch (error) {
            throw new BadGatewayException("Something went wrong :- " + error.message);
        }

    }



    async loginUser(userCreds: LoginUserDto): Promise<LoginResponse> {
        console.log("User Creds Received :- ", userCreds)

        try {

            const user = await this.userModel.findOne({ email: userCreds.email })

            if (!user) {
                throw new NotFoundException("User doesn't exists !!")
            }

            const passMatch = bcrypt.compareSync(userCreds.password, user.password);

            if (!passMatch) {
                throw new BadRequestException("Invalid UserName or Password !!")
            }

            const token = jwt.sign({ userId: user._id }, process.env.SecretKey, { expiresIn: "24h" })

            return {
                token: token,
                msg: "Login Successfull !!"
            }

        } catch (error) {
            throw new BadGatewayException(error.message)
        }

    }


    async logoutUser(authToken: string): Promise<LogedOutUserResponse> {

        try {

            const document = new this.blacklistModel({ token: authToken });
            await document.save();

            return {
                msg: "Logout Successfull !!"
            }

        } catch (error) {
            throw new BadGatewayException(error.message)
        }

    }

}