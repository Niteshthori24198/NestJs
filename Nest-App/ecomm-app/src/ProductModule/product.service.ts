import { BadGatewayException, BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Mode } from "fs";
import mongoose, { Model } from "mongoose";
import { CreateProductDto } from "src/Schemas/dtos/productdto/create.product.dto";
import { GetProductParamsDto, ProductQueryParamsDto } from "src/Schemas/dtos/productdto/product.params.dto";
import { UpdateProductDto } from "src/Schemas/dtos/productdto/update.product.dto";
import { Product, ProductDocument, ProductModel } from "src/Schemas/product.schema";


@Injectable()
export class ProductService {

    constructor(@InjectModel(ProductModel) private readonly productModel: Model<ProductDocument>) {
        console.log("Product Model :- ", productModel)
    }


    async getSpecificProductsInfo(productId: string, queryParams: ProductQueryParamsDto): Promise<Product | Product[]> {
        console.log("productId and QueryParams Received :- ", productId, queryParams);
        try {

            if (productId) {

                let product = await this.productModel.findById({ _id: new mongoose.Types.ObjectId(productId) })

                return product;

            } else {

                let { title, category } = queryParams;

                let queryfilter = [];

                let titleFilter = title ? new RegExp(title, "i") : null;
                let categoryFilter = category ? new RegExp(category, "i") : null;

                if (titleFilter) {
                    queryfilter.push({ title: titleFilter })
                }

                if (categoryFilter) {
                    queryfilter.push({ category: categoryFilter })
                }

                let product = await this.productModel.find({
                    $or: queryfilter
                })

                return product;

            }


        } catch (error) {
            throw new BadGatewayException(error.message)
        }
    }


    async getAllProducts(queryData: GetProductParamsDto): Promise<Product[]> {

        const { page = 1, limit = 3 } = queryData;

        try {

            const products = await this.productModel.find({}).skip((page - 1) * limit).limit(limit);
            return products;

        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }


    async addNewProduct(productData: CreateProductDto): Promise<Product> {
        console.log("Products Data Received :- ", productData)

        try {

            const product = new this.productModel(productData);
            await product.save();
            return product;

        } catch (error) {
            throw new BadGatewayException(error.message)
        }
    }



    async updateProductInfo(productId: string, productData: UpdateProductDto): Promise<Product> {
        console.log("Product Data Received :- ", productId, productData)

        try {

            await this.productModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(productId) }, { ...productData })

            const product = await this.productModel.findById({ _id: new mongoose.Types.ObjectId(productId) })

            return product;

        } catch (error) {
            throw new BadGatewayException(error.message)
        }

    }

    async deleteProductInfo(productId: string): Promise<Product> {
        console.log("ProductId Received :- ", productId)

        try {

            const product = await this.productModel.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(productId) });

            return product;

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

}