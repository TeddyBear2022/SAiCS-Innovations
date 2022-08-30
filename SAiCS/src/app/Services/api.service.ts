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
import { FAQ } from '../Models/FAQ';
import { FAQCategory } from '../Models/FAQCategory';
import { CartVM } from '../Models/ViewModels/CartVM';
import { Order } from '../Models/Order';
import { Address } from '../Models/Address';
import { MerchVM } from '../Models/ViewModels/MerchVM';
import { CartItem } from '../Models/CartItem';
import { Special } from '../Models/Special';
import { SpecialVM } from '../Models/ViewModels/SpecialVM';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: HttpClient) { }

  apilink:string = "https://localhost:44343/api/"
  token:any

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
  login(logindetails:LoginVM){
    return this.api.post(this.apilink+"User/Login",logindetails)
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
  deleteUser(deleteUser:DeleteUserVM):Observable<boolean>{
    return this.api.post<boolean>(this.apilink+ "User/DeleteUser", deleteUser)
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
  // GetCatalog()
  // {
  //   return this.api.get<Product[]>(this.apilink + `User/GetCatalog`)
  // }

  // GetProductsById(id: number): Observable<Product[]>
  // {
  //   return this.api.get<Product[]>(this.apilink + `Client/GetCatalogByCategory?id=${id}`)
  // }

  //FAQs

  CreateFAQ(faq:FAQ){
    return this.api.post(this.apilink+'Admin/createFAQ',faq )
  }
  DeleteFAQ(faq:FAQ){
    return this.api.post(this.apilink+'Admin/deleteFAQ',faq)
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

  DeleteFAQCategory(deleteFAQ:FAQCategory){
    return this.api.post(this.apilink+'Admin/deleteFAQCategory', deleteFAQ)
  }

  UpdateFAQ(updateFAQ:FAQ){
    return this.api.post(this.apilink+'Admin/updateFAQ', updateFAQ)
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
  //Get MerchTypes
  GetMerchTypes(): Observable<any>
  {
    return this.api.get(this.apilink + 'Product/GetMerchTypes');
  }

  GetMerchCat(): Observable<any>
  {
    return this.api.get(this.apilink + 'Product/GetMerchCats');
  }

  GetMerchStatuses(): Observable<any>
  {
    return this.api.get(this.apilink + 'Product/GetMerchStatuses');
  }

  CreateMerch(nMerch: MerchVM)
  {
    return this.api.post(this.apilink + "Product/CreateMerch", nMerch,  {observe: 'response', responseType: 'text'})
  }

  GetAllMerch(): Observable<any>
  {
    return this.api.get(this.apilink + 'Product/GetMerch')
  }

  GetMerchById(id: number)
  {
    return this.api.get(this.apilink + `Product/GetMerchById?id=${id}`)
  }
  
  //Update product
  UpdateMerch(id: number, uMerch: MerchVM)
  {
    return this.api.put(this.apilink + `Product/UpdateMerch?id=${id}`, uMerch, {observe: 'response', responseType: 'text'})
  }

  DeleteMerch(id: number)
  {
    return this.api.delete(this.apilink + `Product/DeleteMerch?id=${id}`)
  }

  AmbassadorDiscount(id)
  {
    return this.api.get(this.apilink + `AmbassadorOrder/AmbassadorDiscount?id=${id}`)
  }

  GetVAT()
  {
    return this.api.get(this.apilink + "AmbassadorOrder/GetVAT")
  }


  UploadImage(file: FormData)
  {
    return this.api.post(this.apilink + "Media/UploadFile", file)
  }

  //Iteration 6 Amanda
  ViewCatalog()
  {
    return this.api.get(this.apilink + "AmbassadorOrder/Catalog")
  }

  AddToCart(id: string,newItem: CartItem)
  {
    return this.api.post(this.apilink + `AmbassadorOrder/AddToCart?id=${id}`, newItem, {observe: 'response', responseType: 'text'})
  }
  

  GetCartItems(id: string)
  {
    return this.api.get(this.apilink + `AmbassadorOrder/ViewCart?id=${id}`)
  }

  IncreaseCartItem(id: number)
  {
  return this.api.post(this.apilink + `AmbassadorOrder/IncreaseCartItem?id=${id}`,undefined, {observe: 'response', responseType: 'text'})
  }

  DecreaseCartItem(id: number)
  {
  return this.api.post(this.apilink + `AmbassadorOrder/DecreaseCartItem?id=${id}`,undefined, {observe: 'response', responseType: 'text'})
  }

  RemoveFromCart(id: number)
  {
    return this.api.delete(this.apilink + `AmbassadorOrder/RemoveFromCart?itemID=${id}`, {observe: 'response', responseType: 'text'})
  }

  ClearCart(id: number)
  {
    return this.api.delete(this.apilink + `AmbassadorOrder/ClearCart?cartID=${id}`)
  }

  GetAddress(id: string)
  {
    return this.api.get(this.apilink +`User/GetSecondaryAddress?id=${id}`)
  }

  Checkout(order: Order)
  {
    return this.api.post(this.apilink + "AmbassadorOrder/Checkout", order, {observe: 'response', responseType: 'text'})
  }

  NewAddress(address: Address)
  {
    return this.api.post(this.apilink + "User/AddSecondaryAddress", address, {observe: 'response', responseType: 'text'})
  }

  GetSecondaryAddressById(id: number)
  {
    return this.api.get(this.apilink + `User/GetSecondaryAddressById?id=${id}`)
  }

  EditSecondaryAddress(address: Address)
  {
    return this.api.put(this.apilink + "User/EditSecondaryAddress", address, {observe: 'response', responseType: 'text'})
  }

  DeleteSecondaryAddress(id: number)
  {
    return this.api.delete(this.apilink + `User/DeleteSecondaryAddress?id=${id}`)
  }

  GetProvinces()
  {
    return this.api.get(this.apilink +"User/GetProvinces")
  }

  OrderHistory(id: string)
  {
    return this.api.get(this.apilink + `AmbassadorOrder/ViewOrderHistory?userID=${id}`)
  }

  ViewOrderDetails(id: number)
  {
    return this.api.get(this.apilink + `AmbassadorOrder/ViewOrderDetails?id=${id}`)
  }

  //Iteration 7
  ProductListRep()
  {
    return this.api.get(this.apilink + "Report/ProductListRep")
  }

  AmbassadorListRep()
  {
    return this.api.get(this.apilink + "Report/AmbassadorListRep")
  }

  GetSalesRep()
  {
    return this.api.get(this.apilink + "Report/SalesRep")
  }

  //Iteration 8 
  //Amanda 
  GetSpecialOptions()
  {
    return this.api.get(this.apilink + "Admin/GetSpecialOptions")
  }

  GetSpecialTypes()
  {
    return this.api.get(this.apilink + "Admin/GetSpecialTypes")
  }

  addSpecial(special: SpecialVM)
  {
    return this.api.post(this.apilink + "Admin/addSpecial", special, {observe: 'response', responseType: 'text'})
  }

  GetAllSpecials()
  {
    return this.api.get(this.apilink + "Admin/GetAllSpecials")
  }

  GetSpecialById(id: number)
  {
    return this.api.get(this.apilink + `Admin/GetSpecialById?id=${id}`)
  }

  UpdateSpecial(special: SpecialVM)
  {
    return this.api.put(this.apilink + "Admin/UpdateSpecial", special, {observe: 'response', responseType: 'text'})
  }

  DeleteSpecial(id: number)
  {
    return this.api.delete(this.apilink + `Admin/DeleteSpecial?id=${id}`)
  }

}
