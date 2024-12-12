import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TaskDocument, TaskModel } from "src/Schema/task.schema";

@Injectable()
export class TaskService {
    constructor(@InjectModel(TaskModel) private readonly taskModel: Model<TaskDocument>) {
        console.log(this.taskModel)
    }
}