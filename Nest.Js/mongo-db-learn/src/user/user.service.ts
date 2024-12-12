import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument, UserModel } from "src/Schema/user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly userModel:Model<UserDocument>){
        console.log(this.userModel)
    }
}