import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
  })
  export class TemporaryStorage {

    constructor(private api: HttpClient) { }
  
    apilink:string = "https://localhost:44318/api/"
    //Register Client data
    
    //Register Ambassador
    //Register Admin
  }
  