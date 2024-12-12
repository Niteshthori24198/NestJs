import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskModel, TaskSchema } from "src/Schema/task.schema";
import { UserModel, UserSchema } from "src/Schema/user.schema";


const Models_Arr = [
    { name: UserModel, schema: UserSchema },
    { name: TaskModel, schema: TaskSchema },
]

@Global()
@Module({
    imports: [MongooseModule.forFeature(Models_Arr)],
    exports: [MongooseModule]
})
export class DataBaseModelModule {

}