import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Cart, CartDocument, CartModel } from "src/Schemas/cart.schema";
import { CartParamsDto } from "src/Schemas/dtos/cartdto/cart.params.dto";
import { CreateCartDto, EmptyCartResponse, UpdateCartDto } from "src/Schemas/dtos/cartdto/create.cart.dto";
import { ProductDocument, ProductModel } from "src/Schemas/product.schema";


@Injectable()
export class CartService {

    constructor(@InjectModel(CartModel) private readonly cartModel: Model<CartDocument>, @InjectModel(ProductModel) private readonly productModel: Model<ProductDocument>) {
        console.log("CartModel :- ", cartModel)
    }



    async addToCart(cartData: CreateCartDto, userId: string): Promise<Cart> {
        console.log("Cart Data Received :- ", cartData, userId);

        try {

            const isValidProduct = await this.productModel.findOne({ _id: cartData.products.product_id })

            if (!isValidProduct || !isValidProduct.inStock) {
                throw new NotFoundException("Either Product Not present or Out of Stock !!")
            }

            const userCart = await this.cartModel.findOne({ userId });

            if (userCart) {

                const isAlreadyAddedItem = userCart.products.find((item) => item.product_id == cartData.products.product_id);

                if (isAlreadyAddedItem) {
                    throw new BadRequestException("Item Already added to Cart !!")
                }

                const updatedCart = {
                    userId,
                    products: [
                        ...userCart.products,
                        cartData.products
                    ]
                }

                await this.cartModel.findByIdAndUpdate({ _id: userCart._id }, updatedCart);

                return updatedCart;

            } else {
                // create new cart and return.

                const cart = new this.cartModel({
                    userId, products: [
                        cartData.products
                    ]
                });

                await cart.save();

                return cart;
            }


        } catch (error) {
            throw new BadGatewayException(error.message);
        }

    }


    async getUserCartInfo(userId: string): Promise<Cart> {
        console.log("User Id Received :-", userId);

        try {

            const usercart = await this.cartModel.findOne({ userId }).populate("products.product_id")

            return usercart;

        } catch (error) {
            throw new BadGatewayException(error.message)
        }


    }



    async updateUserCartInfo(updateCartData: UpdateCartDto, updateCartInfo: CartParamsDto, userId: string): Promise<Cart> {
        console.log("Update CartInfo Received :-", updateCartInfo, userId)


        try {

            const { cartId, productId } = updateCartInfo;
            const { quantity } = updateCartData;

            let userCart = await this.cartModel.findOne({ _id: cartId, userId });

            const isUpdated = userCart.products.find((item) => {
                if (item.product_id == productId) {
                    item.quantity = quantity;
                    return true;
                }
            });

            if (isUpdated) {

                await this.cartModel.findByIdAndUpdate({ _id: cartId, userId }, userCart);

                return userCart;

            } else {
                throw new NotFoundException("Product doesn't exists into Cart !!");
            }

        } catch (error) {
            throw new BadGatewayException(error.message)
        }
    }


    async deleteUserCartInfo(deleteCartInfo: CartParamsDto, userId: string): Promise<Cart> {
        console.log("Delete CartInfo Received :-", deleteCartInfo, userId)

        try {

            const { cartId, productId } = deleteCartInfo;

            let userCart = await this.cartModel.findOne({ _id: cartId, userId });

            console.log("User cart :- ", userCart)

            const updatedCartProducts = userCart.products.reduce((acc, cur) => {
                if (cur.product_id != productId) {
                    acc.push(cur);
                }
                return acc;
            }, []);

            console.log("Updatedart items :- ", updatedCartProducts)

            userCart.products = updatedCartProducts;

            console.log("User cart :- ", userCart);

            await this.cartModel.findByIdAndUpdate({ _id: cartId, userId }, userCart)

            return userCart;

        } catch (error) {
            throw new BadGatewayException(error.message)
        }
    }


    async emptyUsersCart(userId: string): Promise<EmptyCartResponse> {

        try {

            const usercart = await this.cartModel.findOne({ userId: new mongoose.Types.ObjectId(userId) });

            if (usercart) {

                await this.cartModel.findOneAndDelete({ userId: new mongoose.Types.ObjectId(userId) });

                return {
                    msg: "Your Cart has been Cleared !!"
                }

            }

        } catch (error) {
            throw new BadGatewayException(error.message);
        }

    }

}