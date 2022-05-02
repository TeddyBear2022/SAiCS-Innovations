import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Country } from '../Models/Country';
import { UserType } from '../Models/UserType';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: HttpClient) { }

  apilink:string = "https://localhost:44318/api/"
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
  //get login details to login
  //
  //get city
  //send email
  //post: needs to be able to create a user from 
  //reset password
}
