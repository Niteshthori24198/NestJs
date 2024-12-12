import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "src/Schemas/dtos/productdto/create.product.dto";
import { Product } from "src/Schemas/product.schema";
import { GetProductParamsDto, ProductQueryParamsDto } from "src/Schemas/dtos/productdto/product.params.dto";
import { UpdateProductDto } from "src/Schemas/dtos/productdto/update.product.dto";

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }


    @Get('/get/:productId?')
    getSpecificProductsInfo(@Param('productId') productId: string, @Query() queryParams: ProductQueryParamsDto): Promise<Product | Product[]> {
        console.log("productId and QueryParams :- ", productId, queryParams)
        return this.productService.getSpecificProductsInfo(productId, queryParams);
    }



    @Get('/getAll')
    getAllProducts(@Query() queryData: GetProductParamsDto): Promise<Product[]> {
        console.log("Querydata :- ", queryData)
        return this.productService.getAllProducts(queryData);
    }



    @Post('/create')
    addNewProduct(@Body() productData: CreateProductDto): Promise<Product> {
        console.log("Products Data :- ", productData)
        return this.productService.addNewProduct(productData)
    }




    @Patch('/update/:productId')
    updateProductInfo(@Param('productId') productId: string, @Body() productData: UpdateProductDto): Promise<Product> {
        console.log("Product Data :- ", productData)
        return this.productService.updateProductInfo(productId, productData)
    }



    @Delete('/delete/:productId')
    deleteProductInfo(@Param('productId') productId: string): Promise<Product> {
        console.log("ProductId :- ", productId)
        return this.productService.deleteProductInfo(productId)
    }

}