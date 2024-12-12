import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Address {

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    pincode: string;

}


const schema = SchemaFactory.createForClass(Address)

export const AddressSchema = schema