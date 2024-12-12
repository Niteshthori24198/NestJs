import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status_Types } from "src/constants/schema.constants";
import { User, UserModel } from "./user.schema";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})
export class Task {
    @Prop({ required: true })
    title: string

    @Prop({ type: String, default: Status_Types.Task_Created, enum: Object.keys(Status_Types) })
    status: Status_Types

    @Prop({ type: Types.ObjectId, ref: UserModel })
    owner: string | Types.ObjectId | User

}


export type TaskDocument = Task & Document
export const TaskSchema = SchemaFactory.createForClass(Task)

export const TaskModel = Task.name