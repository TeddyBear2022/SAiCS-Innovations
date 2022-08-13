import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Options } from 'selenium-webdriver';
import { AdminVM } from '../Models/ViewModels/AdminVM';
import { Ambassador } from '../Models/Ambassador';
import { AmbassadorType } from '../Models/AmbassadorType';
import { AmbassadorVM } from '../Models/ViewModels/AmbassadorVM';
import { ClientVM } from '../Models/ViewModels/CientVM';
import { Country } from '../Models/Country';
import { DeleteUserVM } from '../Models/ViewModels/DeleteUserVM';
import { LoginVM } from '../Models/ViewModels/LoginVM';
import { registerVM } from '../Models/ViewModels/registerVM';
import { User } from '../Models/User';
import { UserType } from '../Models/UserType';
import { Feedback } from '../Models/Feedback';
import { FeedbackVM } from '../Models/ViewModels/FeedbackVM';
import { Product } from '../Models/Product';
import { FAQ } from '../Models/FAQ';
import { FAQCategory } from '../Models/FAQCategory';
import { ProductType } from '../Models/ProductType';
import { ProductVM } from '../Models/ViewModels/ProductVM';
import { PackageVM } from '../Models/ViewModels/PackageVM';
import { PackageType } from '../Models/PackageType';
import { map } from 'rxjs/operators';
import { credentialsVM } from '../Models/ViewModels/credentialsVM';
import { CartVM } from '../Models/ViewModels/CartVM';
import { Order } from '../Models/Order';
import { loginToken } from '../Models/ViewModels/loginToken';
import { ProfileVM } from '../Models/ViewModels/ProfileVM';
import { PositionRequestsVM } from '../Models/ViewModels/PositionRequestVM';
import { NewCourseVM } from '../Models/ViewModels/NewCourseVM';
import { SectionContent } from '../Models/SectionContent';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: HttpClient) { }

  apilink:string = "https://localhost:44343/api/"
  token:any
  updateCourseId:number;

  //get title
  getTitles():Observable<Title[]>{
    return this.api.get<Title[]>(this.apilink+"Admin/getTitles")
  }
  //get Userrolename
  getUserTypes():Observable<UserType[]>{
    return this.api.get<UserType[]>(this.apilink+"Admin/GetUserRoles")
  }
  //get country
  getCountrys():Observable<Country[]>{
    return this.api.get<Country[]>(this.apilink+"Admin/getCountry")
  }
  //get login details to login/verify user
  //post: needs to be able to create a user from 
  
  //Register Clent
  registerClient(newClient:ClientVM):Observable<ClientVM>{
    return this.api.post<ClientVM>(this.apilink+"User/RegisterClient", newClient)
  }
  //Register Ambassador
  registerAmbassador(newAmbassador:AmbassadorVM):Observable<AmbassadorVM>{
    return this.api.post<AmbassadorVM>(this.apilink+"User/RegisterAmbassador", newAmbassador)
  }
  //Register Admin
  registerAdmin(newAdmin:AdminVM):Observable<AdminVM>{
    return this.api.post<AdminVM>(this.apilink+"User/RegisterAdmin",newAdmin )
  }
  //login
  login(logindetails:LoginVM):Observable<loginToken>{
    return this.api.post<loginToken>(this.apilink+"User/Login",logindetails)
  }
  //get Users session info
  session(logindetails:LoginVM){
    return this.api.post(this.apilink+"User/getUserSessionInfo", logindetails)
  }
  //reset password

  //get ambassador rankings
  getAmbassadorRankings():Observable<AmbassadorType[]>{
    return this.api.get<AmbassadorType[]>(this.apilink+"Admin/getAmbassadorTypes")
  }
  //Register user
  registerUser(registrationinfo:registerVM){
    return this.api.post(this.apilink+"User/RegisterUser", registrationinfo );
  }
  //delete user
  deleteUser(userID:string){
    return this.api.delete(this.apilink+ `User/DeleteUser?userID=${userID}`)
  }
 
  //Feedback

  CreateFeedback(newFeedback: Feedback): Observable<Feedback>
  {
    return this.api.post<Feedback>(this.apilink + "Client/CreateFeedback", newFeedback)
  }

  GetAmbassadorFeedback(): Observable<FeedbackVM[]>
  {
    return this.api.get<FeedbackVM[]>(this.apilink + 'Client/GetAmbassadorFeedback')
  }

  GetProductFeedback(): Observable<FeedbackVM[]>
  {
    return this.api.get<FeedbackVM[]>(this.apilink + 'Client/GetProductFeedback')
  }

  DeleteFeedback(id: number): Observable<FeedbackVM[]>
  {
    return this.api.delete<FeedbackVM[]>(this.apilink + `Client/DeleteFeedback?id=${id}`)
  }

  // Catalog
  GetCatalog()
  {
    return this.api.get<Product[]>(this.apilink + `User/GetCatalog`)
  }

  GetProductsById(id: number): Observable<Product[]>
  {
    return this.api.get<Product[]>(this.apilink + `Client/GetCatalogByCategory?id=${id}`)
  }

  //FAQs

  CreateFAQ(faq:FAQ){
    return this.api.post(this.apilink+'Admin/createFAQ',faq )
  }
  // faqID
  DeleteFAQ(faqID:number):Observable<boolean>{
    return this.api.delete<boolean>(this.apilink + `Admin/deleteFAQ?faqID=${faqID}`)
  }

  GetAccountFAQ(): Observable<FAQ[]>
  {
    return this.api.get<FAQ[]>(this.apilink + 'Client/GetAccountFAQ')
  }

  GetProductFAQ(): Observable<FAQ[]>
  {
    return this.api.get<FAQ[]>(this.apilink + 'Client/GetProductFAQ')
  }

  GetDeliveryFAQ(): Observable<FAQ[]>
  {
    return this.api.get<FAQ[]>(this.apilink + 'Client/GetDeliveryFAQ')
  }

  GetAllFAQS(): Observable<FAQ[]>{
    return this.api.get<FAQ[]>(this.apilink+'Admin/getAllFAQS')
  }

  //FAQ Category
  GetFAQategory():Observable<FAQ[]>{
    return this.api.get<FAQ[]>(this.apilink+'Admin/getFAQCategories')
  }

  CreateFAQCategory(createFAQ:FAQCategory){
    return this.api.post(this.apilink+'Admin/createFAQCategory', createFAQ)
  }

  DeleteFAQCategory(faqCategoryID:number){
    return this.api.delete(this.apilink+`Admin/deleteFAQCategory?faqCategoryID=${faqCategoryID}`)
  }

  UpdateFAQ(updateFAQ:FAQ):Observable<boolean>{
    return this.api.patch<boolean>(this.apilink+'Admin/updateFAQ', updateFAQ)
  }
  //Ambassadors
  MyAmbassador(id: number): Observable<AmbassadorVM[]>
  {
    return this.api.get<AmbassadorVM[]>(this.apilink + `Client/MyAmbassador?id=${id}`)
  }

  GetAllAmbassadors(): Observable<AmbassadorVM[]>
  {
    return this.api.get<AmbassadorVM[]>(this.apilink + 'User/GetAllAmbassadors')
  }

  //Product Subsystem
  // Get all packages
  GetPackages(): Observable<PackageVM[]>
  {
    return this.api.get<PackageVM[]>(this.apilink + 'Product/getPackages')
  }

  //Get package by name
  GetPackageByName(name: string): Observable<PackageVM>
  {
    return this.api.get<PackageVM>(this.apilink + `Product/getPackageByName?name=${name}`)
  }

  //Get package types
  GetPackageTypes(): Observable<PackageType[]>
  {
    return this.api.get<PackageType[]>(this.apilink + 'Product/getPackageTypes')
  }


  //Create package
  CreatePackage(newPackage: PackageVM)
  {
    return this.api.post(this.apilink + "Product/createPackage", newPackage)
  }

  
  //Update package
  UpdatePackage(name: string, newPackage: PackageVM): Observable<PackageVM>
  {
    return this.api.put<PackageVM>(this.apilink + `Product/updatePackage?name=${name}`, newPackage)
  }

  //Delete package
  DeletePackage(id: number): Observable<PackageVM>
  {
    return this.api.delete<PackageVM>(this.apilink + `Product/deletePackage?id=${id}`)
  }

 
  // Get all products
  GetProducts(): Observable<ProductVM[]>
  {
    return this.api.get<ProductVM[]>(this.apilink + 'Product/getProducts')
  }

  //Get product by name
  GetProductByName(name: string): Observable<ProductVM>
  {
    return this.api.get<ProductVM>(this.apilink + `Product/getProductByName?name=${name}`)
  }

  //Products
  //Get product types
  GetProductTypes(): Observable<ProductType[]>
  {
    return this.api.get<ProductType[]>(this.apilink + 'Product/getProductTypes')
  }


  //Create product
  CreateProduct(newProduct: ProductVM)
  {
    return this.api.post(this.apilink + "Product/createProduct", newProduct)
  }

  
  //Update product
  UpdateProduct(name: string, newProduct: ProductVM): Observable<ProductVM>
  {
    return this.api.put<ProductVM>(this.apilink + `Product/updateProduct?name=${name}`, newProduct)
  }

  //Delete product
  DeleteProduct(id: number): Observable<ProductVM>
  {
    return this.api.delete<ProductVM>(this.apilink + `Product/deleteProduct?id=${id}`)
  }


  UploadImage(file: FormData)
  {
    return this.api.post(this.apilink + "Media/UploadFile", file)
  }

  // GetImage(imageName: string): Observable<Blob>
  // {
  //   return this.api.post<Blob>(this.apilink + "Gallery/GetImage?imageName", imageName,{ responseType: 'blob' as 'json'})
  // }
  //View Ambassadors
  ViewAmbassadors(credentials: credentialsVM):Observable<any[]>{
    return this.api.post<any[]>(this.apilink+ 'Ambassador/ViewCurrentAgents', credentials)
  }
  ViewClients(credentials: credentialsVM){
    return this.api.post(this.apilink+ 'Ambassador/ViewClients', credentials)
  }

  //Iteration 6 Amanda
  ViewCatalog()
  {
    return this.api.get(this.apilink + "AmbassadorOrder/Catalog")
  }

  AddToCart(newItem: CartVM)
  {
    return this.api.post(this.apilink + "AmbassadorOrder/AddToCart", newItem)
  }

  ViewCart()
  {
    return this.api.get(this.apilink + "AmbassadorOrder/ViewCart")
  }

  RemoveFromCart(id: number)
  {
    return this.api.delete(this.apilink + `AmbassadorOrder/RemoveFromCart?itemID=${id}`)
  }

  ClearCart(id: number)
  {
    return this.api.delete(this.apilink + `AmbassadorOrder/ClearCart?itemID=${id}`)
  }

  GetAddress(id: string)
  {
    return this.api.get(this.apilink +`AmbassadorOrder/GetAddress?userID=${id}`)
  }

  Checkout(order: Order)
  {
    return this.api.post(this.apilink + "AmbassadorOrder/Checkout", order)
  }

  ValidateRefferralCode(refferalCode: string)
  {
    return this.api.get(this.apilink + `User/ValidateRefferralCode?refferalCode=${refferalCode}`)
  }
  SetToken(token:string){
    this.token = token
    localStorage.setItem("token",token)
  }
  ClearToken(){
    this.token=""
    localStorage.removeItem("token")
  }
  ApplicationStatus(id: string)
  {
    return this.api.get(this.apilink + `User/applicationStatus?id=${id}`)
  }
  Logout()
  {
    return this.api.get(this.apilink + `User/Logout`)
  }

  UpdateUser(user: ProfileVM):Observable<boolean>
  {
    return this.api.patch<boolean>(this.apilink + `User/updateUser`, user)
  }
  PositionRequests():Observable<any[]>{
    return this.api.get<any[]>(this.apilink+`Admin/PositionRequests`)
  }
  
  //Course
  CreateCourse(newCourse:NewCourseVM):Observable<boolean>{
    return this.api.post<boolean>(this.apilink + `Training/CreateCourse`, newCourse )
  }

  GetAllCourses():Observable<any[]>{
    return this.api.get<any[]>(this.apilink+ `Training/GetAllCourses`)
  }

  setCourseId(courseId :number){
    this.updateCourseId = courseId;
  }

  GetCourseDetails(id=this.updateCourseId){
    return this.api.get(this.apilink+`Training/GetSpecificCourse?id=${id}`)
  }

  UpdateSectionContent(sectionContent:SectionContent):Observable<boolean>{
    return this.api.patch<boolean>(this.apilink+`Training/UpdateSectionContent`, sectionContent)
  }
  
}
