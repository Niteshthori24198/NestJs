import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema({
    timestamps: true
})
export class Product {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true, minlength: 5 })
    description: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true, default: 1 })
    quantity: number;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    inStock: Boolean

}


export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);

export const ProductModel = Product.name;