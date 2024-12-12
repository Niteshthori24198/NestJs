
import { Order } from "src/Schemas/order.schema";


export class OrderResponseDto {

    success: Boolean;

    msg: string;

    OrderItem: Order

}