import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Address, AddressSchema } from "./address.schema";

import { Document } from "mongoose";


@Schema({
    timestamps: true
})
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: AddressSchema, required: true })
    address: Address;

    @Prop(raw({

    }))
    metadata: any;
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)

export const UserModel = User.name