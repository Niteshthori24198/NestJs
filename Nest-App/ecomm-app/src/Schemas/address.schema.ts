import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Address {

    @Prop({ required: true })
    state: string;


    @Prop({ required: true })
    city: string;


    @Prop({ required: true })
    pincode: string;


    @Prop({ required: true })
    phone: number

}


const addressSchema = SchemaFactory.createForClass(Address);

export const AddressSchema = addressSchema;