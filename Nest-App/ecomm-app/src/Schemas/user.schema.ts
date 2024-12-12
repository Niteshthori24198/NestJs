import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Address, AddressSchema } from "./address.schema";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})
export class User {

    @Prop({ required: true, minlength: 5 })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, minlength: 3 })
    password: string;

    @Prop({ required: true, type: AddressSchema })
    address: Address

}


export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = User.name;