import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class BlackList {

    @Prop({ required: true })
    token: string;

}

export const BlackListSchema = SchemaFactory.createForClass(BlackList)

export type BlackListDocument = BlackList & Document;

export const BlackListModel = BlackList.name;