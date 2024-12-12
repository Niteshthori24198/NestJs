
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Date, Document, Types } from "mongoose";
import { User, UserModel } from "./user.schema";
import { Product, ProductModel } from "./product.schema";
import { Order_Status, Payment_Modes } from "src/Constants/constants";
import { DeliveryAddress, DeliveryAddressSchema } from "./delivery.Address.schema";


@Schema({
    timestamps: true
})
export class Order {

    @Prop({ type: Types.ObjectId, ref: UserModel })
    userId: string | Types.ObjectId | User;

    @Prop(
        {
            type: [
                {
                    product_id: { type: Types.ObjectId, ref: ProductModel },
                    title: { type: String, required: true },
                    description: { type: String, required: true },
                    quantity: { type: Number, required: true },
                    total_price: { type: Number, required: true },
                    order_date: { type: Date, required: true, default: () => new Date() },
                    payment_mode: { type: String, default: Payment_Modes.COD, required: true, enum: Object.values(Payment_Modes) },
                    order_status: { type: String, default: Order_Status.Order_Created, required: true, enum: Object.values(Order_Status) },
                    delivery_address: { type: DeliveryAddressSchema, required: true }
                }]
        }
    )
    products: {
        product_id: string | Types.ObjectId | Product,
        title: string,
        description: string,
        quantity: number,
        total_price: number,
        order_date: Date,
        payment_mode: Payment_Modes,
        order_status: Order_Status,
        delivery_address: DeliveryAddress
    }[]

}


export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);

export const OrderModel = Order.name;



