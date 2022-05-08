import { Ambassador } from "./Ambassador";
import { Feedback } from "./feedback";
import { Product } from "./Product";
import { ProductType } from "./ProductType";
import { User } from "./User";

export class FeedbackVM{
    Feedback: Feedback
    Ambassador: Ambassador
    User: User
    Product: Product
    ProductType: ProductType

    // constructor(Feedback?: Feedback, Ambassador?: Ambassador, User?: User, Product?: Product, ProductType?: ProductType)
    // {
    //     this.Feedback.feedbackId = Feedback.feedbackId
    //     this.Feedback.feedbackTypeId = Feedback.feedbackTypeId
    //     this.Feedback.date = Feedback.date
    //     this.Feedback.description = Feedback.description
    //     this.Product.productName = Product.productName
    //     this.ProductType.productTypeName = ProductType.productTypeName
    //     this.User.name = User.name
    //     this.User.surname = User.surname
    // }

}