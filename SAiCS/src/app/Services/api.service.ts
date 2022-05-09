import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Feedback } from '../Models/feedback';
import { Product } from '../Models/Product';
import { FeedbackVM } from '../Models/FeedbackVM';
import { FAQ } from '../Models/FAQ';
import { AmbassadorVM } from '../Models/AmbassadorVM';


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
}
