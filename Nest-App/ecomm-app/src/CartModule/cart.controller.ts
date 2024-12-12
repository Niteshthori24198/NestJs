import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { CartService } from "./cart.service";
import { Request } from "express";
import { CreateCartDto, EmptyCartResponse, UpdateCartDto } from "src/Schemas/dtos/cartdto/create.cart.dto";
import { Cart } from "src/Schemas/cart.schema";
import { CartParamsDto } from "src/Schemas/dtos/cartdto/cart.params.dto";
const mongoose = require('mongoose')


@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService) { }

    @Post('/addItems')
    addToCart(@Req() req: Request, @Body() cartData: CreateCartDto): Promise<Cart> {

        const userId = new mongoose.Types.ObjectId(req["userId"]);
        console.log("Cart Data :- ", cartData, userId);

        return this.cartService.addToCart(cartData, userId);
    }


    @Get('/get')
    getUserCartInfo(@Req() req: Request): Promise<Cart> {
        const userId = new mongoose.Types.ObjectId(req["userId"]);
        return this.cartService.getUserCartInfo(userId);
    }


    @Patch('/update/:cartId/:productId')
    updateUserCartInfo(@Req() req: Request, @Body() updateCartData: UpdateCartDto, @Param() updateCartInfo: CartParamsDto): Promise<Cart> {
        console.log("Update CartInfo :-", updateCartInfo);
        const userId = new mongoose.Types.ObjectId(req["userId"]);
        return this.cartService.updateUserCartInfo(updateCartData, updateCartInfo, userId)
    }


    @Delete('/delete/:cartId/:productId')
    deleteUserCartInfo(@Req() req: Request, @Param() deleteCartInfo: CartParamsDto): Promise<Cart> {
        console.log("Delete CartInfo :-", deleteCartInfo)
        const userId = new mongoose.Types.ObjectId(req["userId"]);
        return this.cartService.deleteUserCartInfo(deleteCartInfo, userId)
    }


    @Delete('/clear')
    emptyUsersCart(@Req() req: Request): Promise<EmptyCartResponse> {
        const userId = req["userId"];
        return this.cartService.emptyUsersCart(userId);
    }

}