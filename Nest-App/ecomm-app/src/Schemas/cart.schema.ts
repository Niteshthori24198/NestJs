
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose";
import { User, UserModel } from "./user.schema";
import { Product, ProductModel } from "./product.schema";


@Schema({
    timestamps: true
})
export class Cart {

    @Prop({ type: Types.ObjectId, ref: UserModel })
    userId: string | Types.ObjectId | User;

    @Prop({ type: [{ product_id: { type: Types.ObjectId, ref: ProductModel }, quantity: { type: Number, required: true } }] })
    products: {
        product_id: string | Types.ObjectId | Product,
        quantity: number
    }[]

}


export type CartDocument = Cart & Document;

export const CartSchema = SchemaFactory.createForClass(Cart);

export const CartModel = Cart.name;



