import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BlackListModel, BlackListSchema } from "src/Schemas/blacklist.schema";
import { CartModel, CartSchema } from "src/Schemas/cart.schema";
import { OrderModel, OrderSchema } from "src/Schemas/order.schema";
import { ProductModel, ProductSchema } from "src/Schemas/product.schema";
import { UserModel, UserSchema } from "src/Schemas/user.schema";



const models_arr = [
    { name: UserModel, schema: UserSchema },
    { name: ProductModel, schema: ProductSchema },
    { name: CartModel, schema: CartSchema },
    { name: OrderModel, schema: OrderSchema },
    { name: BlackListModel, schema: BlackListSchema },
]


@Global()
@Module({
    imports: [MongooseModule.forFeature(models_arr)],
    exports: [MongooseModule]
})
export class DatabaseModelsModules {

}