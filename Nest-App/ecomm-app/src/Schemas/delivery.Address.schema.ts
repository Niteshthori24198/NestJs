import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class DeliveryAddress {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    state: string;


    @Prop({ required: true })
    city: string;


    @Prop({ required: true })
    pincode: string;


    @Prop({ required: true })
    phone: number

}


const delivery_addressSchema = SchemaFactory.createForClass(DeliveryAddress);

export const DeliveryAddressSchema = delivery_addressSchema;