import { Price } from "../Price"
import {Package} from "../Package"
import {PackageType} from "../PackageType"
import {PackagePrice} from "../PackagePrice"

export class PackageVM{
    package: Package
    packageType: PackageType
    packagePrice: PackagePrice
    price: Price
}