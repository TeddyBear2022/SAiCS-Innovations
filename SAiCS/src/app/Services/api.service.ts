import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Feedback } from '../Models/feedback';
import { Product } from '../Models/Product';
import { FeedbackVM } from '../Models/FeedbackVM';
import { FAQ } from '../Models/FAQ';
import { AmbassadorVM } from '../Models/AmbassadorVM';

//import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
//import { Observable } from 'rxjs';
import { Options } from 'selenium-webdriver';
import { AdminVM } from '../Models/AdminVM';
import { Ambassador } from '../Models/Ambassador';
import { AmbassadorType } from '../Models/AmbassadorType';
//import { AmbassadorVM } from '../Models/AmbassadorVM';
import { ClientVM } from '../Models/CientVM';
import { Country } from '../Models/Country';
import { DeleteUserVM } from '../Models/DeleteUserVM';
import { LoginVM } from '../Models/LoginVM';
import { registerVM } from '../Models/registerVM';
import { User } from '../Models/User';
import { UserType } from '../Models/UserType';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: HttpClient) { }

  apilink:string = "https://localhost:44318/api/"

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
    return this.api.get<Product[]>(this.apilink + `User/GetCatalogByCategory?id=${id}`)
  }

  //FAQs
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

  //Ambassadors
  MyAmbassador(id: number): Observable<AmbassadorVM[]>
  {
    return this.api.get<AmbassadorVM[]>(this.apilink + `Client/MyAmbassador?id=${id}`)
  }

  GetAllAmbassadors(): Observable<AmbassadorVM[]>
  {
    return this.api.get<AmbassadorVM[]>(this.apilink + 'User/GetAllAmbassadors')
  }
  
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
  login(logindetails:LoginVM):Observable<boolean>{
    return this.api.post<boolean>(this.apilink+"User/Login",logindetails)
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
  registerUser(registrationinfo:registerVM):Observable<boolean>{
    return this.api.post<boolean>(this.apilink+"User/RegisterUser", registrationinfo );
  }
  //delete user
  deleteUser(deleteUser:DeleteUserVM):Observable<boolean>{
    return this.api.post<boolean>(this.apilink+ "User/DeleteUser", deleteUser)
  }
}
