import { Price } from "../Price"
import { Product } from "../Product"
import { ProductPrice } from "../ProductPrice"
import { ProductType } from "../ProductType"

export class ProductVM{
    product: Product
    productType: ProductType
    productPrice: ProductPrice
    price: Price
}