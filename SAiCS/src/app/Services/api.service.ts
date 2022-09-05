import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { credentialsVM } from '../Models/ViewModels/credentialsVM';
import { CartVM } from '../Models/ViewModels/CartVM';
import { Order } from '../Models/Order';
import { loginToken } from '../Models/ViewModels/loginToken';
import { ProfileVM } from '../Models/ViewModels/ProfileVM';
import { PositionRequestsVM } from '../Models/ViewModels/PositionRequestVM';
import { NewCourseVM } from '../Models/ViewModels/NewCourseVM';
import { SectionContent } from '../Models/SectionContent';
import { QuestionBank } from '../Models/QuestionBank';
import { Quiz } from '../Models/Quiz';
import { Course } from '../Models/Course';
import { MerchVM } from '../Models/ViewModels/MerchVM';
import { CartItem } from '../Models/CartItem';
import { OTPVM } from '../Models/ViewModels/OTPVM';
import { ResetPasswordVM } from '../Models/ViewModels/ResetPasswordVM';
import { Target } from '../Models/Target';
import { Special } from '../Models/Special';
import { SpecialVM } from '../Models/ViewModels/SpecialVM';
import { Address } from '../Models/Address';
import { uOrderStatusVM } from '../Models/ViewModels/uOrderStatusVM';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: HttpClient) { }

  apilink:string = "https://localhost:44343/api/"
  token:any
  updateCourseId:number;
  accessCourseID:number
  // headers = new HttpHeaders().set('Authorization', ' Bearer'+ JSON.stringify(localStorage.getItem('token')))
  headers = new HttpHeaders().set('Authorization :', 'Bearer'+  localStorage.getItem('token')) 

  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    })
  };

  // {
  //     headers: new HttpHeaders({
  //         Authorization: 'Bearer ' + localStorage.getItem("token")
  //     })
  //   }

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
  
  SearchAmbassador(searchInput:string){
    return this.api.get(this.apilink+`Admin/SearchAmbassador?nameorsurname=${searchInput}`,this.httpOptions)
  }

  //get ambassador rankings
  GetAmbassadorRankings(){
    return this.api.get(this.apilink+ `Admin/GetAmbassadorRankings`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  
  AmbassadorAccessCourse():Observable<any[]>{
    return this.api.get<any[]>(this.apilink+ `Training/GetAmbassadorsCourses`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  //Register user
  registerUser(registrationinfo:registerVM){
    return this.api.post(this.apilink+"User/RegisterUser", registrationinfo );
  }
  //delete user
  deleteUser(){
    return this.api.delete(this.apilink+ `User/DeleteUser?`, this.httpOptions)
  }
 
  //Feedback

  CreateFeedback(id: string, newFeedback: Feedback): Observable<any>
  {
    return this.api.post(this.apilink +`Client/CreateFeedback?userId=${id}`, newFeedback,{ observe: 'response', responseType: 'text',
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem("token")
    })})
  }

  GetAmbassadorFeedback(id: number): Observable<any>
  {
    return this.api.get(this.apilink + `Client/GetAmbassadorFeedback?id=${id}`, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
  })})
  }

  GetProductFeedback(id: number): Observable<any>
  {
    return this.api.get(this.apilink + `Client/GetProductFeedback?id=${id}`, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
  })})
  }

  DeleteFeedback(id: number): Observable<any>
  {
    return this.api.delete(this.apilink + `Client/DeleteFeedback?id=${id}`,{observe: 'response', responseType: 'text', headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
  })})
  }

  //FAQs

  CreateFAQ(faq:FAQ){
    return this.api.post(this.apilink+'Admin/createFAQ',faq ,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }
  // faqID
  DeleteFAQ(faqID:number):Observable<boolean>{
    return this.api.delete<boolean>(this.apilink + `Admin/deleteFAQ?faqID=${faqID}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  GetAccountFAQ(): Observable<FAQ[]>
  {
    return this.api.get<FAQ[]>(this.apilink + 'Client/GetAccountFAQ',{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  GetProductFAQ(): Observable<FAQ[]>
  {
    return this.api.get<FAQ[]>(this.apilink + 'Client/GetProductFAQ',{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  GetDeliveryFAQ(): Observable<FAQ[]>
  {
    return this.api.get<FAQ[]>(this.apilink + 'Client/GetDeliveryFAQ',{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  GetAllFAQS(): Observable<FAQ[]>{
    return this.api.get<FAQ[]>(this.apilink+'Admin/getAllFAQS',{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  //FAQ Category
  GetFAQategory():Observable<FAQ[]>{
    return this.api.get<FAQ[]>(this.apilink+'Admin/getFAQCategories',this.httpOptions)
  }

  CreateFAQCategory(createFAQ:FAQCategory){
    return this.api.post(this.apilink+'Admin/createFAQCategory', createFAQ,this.httpOptions)
  }

  DeleteFAQCategory(faqCategoryID:number){
    return this.api.delete(this.apilink+`Admin/deleteFAQCategory?faqCategoryID=${faqCategoryID}`,this.httpOptions)
  }

  UpdateFAQ(updateFAQ:FAQ):Observable<boolean>{
    return this.api.patch<boolean>(this.apilink+'Admin/updateFAQ', updateFAQ,this.httpOptions)
  }
  //Ambassadors
  GetAssociatedAmbassador(id: number): Observable<any>
  {
    return this.api.get(this.apilink + `User/GetAssociatedAmbassador?id=${id}`,{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem("token")
    })})
  }

  GetAllAmbassadors(): Observable<AmbassadorVM[]>
  {
    return this.api.get<AmbassadorVM[]>(this.apilink + 'User/GetAllAmbassadors', {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
    })})
  }

  AssignCourse(courseId:number){
    return this.api.post(this.apilink+ `Training/QuizCompleted`, courseId, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  GetQuizData(courseId = localStorage.getItem('course')){
    return this.api.get(this.apilink+ `Training/GetQuizData?courseID=${courseId}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  QuizCompleted(completed:boolean = true){
    return this.api.post(this.apilink+ `Training/QuizCompleted`, completed,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  InputInformation(){
    return this.api.get(this.apilink+ `User/InputInformation`)
  }

  
  //Product Subsystem
  //Get MerchTypes
  GetMerchTypes(): Observable<any>
  {
    return this.api.get(this.apilink + 'Product/GetMerchTypes',{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem("token")
    })});
  }

  GetMerchCat(): Observable<any>
  {
    return this.api.get(this.apilink + 'Product/GetMerchCats',{
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
  })});
  }

  ClientGetMerchCat(): Observable<any>
  {
    return this.api.get(this.apilink + 'Client/GetMerchCats',{
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
  })});
  }

  GetMerchStatuses(): Observable<any>
  {
    return this.api.get(this.apilink + 'Product/GetMerchStatuses',{
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
  })});
  }

  CreateMerch(nMerch: MerchVM)
  {
    return this.api.post(this.apilink + "Product/CreateMerch", nMerch, {observe: 'response', responseType: 'text',
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
  })})
  }

  GetAllMerch(): Observable<any>
  {
    return this.api.get(this.apilink + 'Product/GetMerch',{
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
  })})
  }

  GetMerchById(id: number)
  {
    return this.api.get(this.apilink + `Product/GetMerchById?id=${id}`,{headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }
  
  //Update product
  UpdateMerch(id: number, uMerch: MerchVM)
  {
    return this.api.put(this.apilink + `Product/UpdateMerch?id=${id}`, uMerch, {observe: 'response', 
    responseType: 'text',headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }

  DeleteMerch(id: number)
  {
    return this.api.delete(this.apilink + `Product/DeleteMerch?id=${id}`,
    {observe: 'response', 
    responseType: 'text',headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }

  AmbassadorDiscount(id)
  {
    return this.api.get(this.apilink + `AmbassadorOrder/AmbassadorDiscount?id=${id}`,{headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }

  GetVAT()
  {
    return this.api.get(this.apilink + "User/GetVAT",{headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
   })})
  }

  AgentAccountInfo(id: string)
  {
    return this.api.get(this.apilink + `User/AgentAccountInfo?id=${id}`,{headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
   })})
  }


  UpdateVAT(id: number, amount: number)
  {
    return this.api.put(this.apilink + `Admin/UpdateVAT?id=${id}&amount=${amount}`,{observe: 'response', 
    responseType: 'text',headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }

  
//   ClientGetVAT()
//   {
//     return this.api.get(this.apilink + "ClientOrder/GetVAT",{headers: new HttpHeaders({
//       Authorization: 'Bearer ' + localStorage.getItem("token")
// })})
//   }


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
    return this.api.post<any[]>(this.apilink+ 'Ambassador/ViewCurrentAgents', credentials,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  GetSpecificFaq(categoryId = localStorage.getItem('faq')):Observable<FAQ[]>{
    return this.api.get<FAQ[]>(this.apilink+ `Ambassador/GetSpecificFaq?categoryID=${categoryId}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  ViewClients(){
    return this.api.get(this.apilink+ 'Ambassador/ViewCurrentClients',{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  //Iteration 6 Amanda
  ViewCatalog()
  {
    return this.api.get(this.apilink + "User/ViewCatalog",
    {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
    })})
  }

  ViewCatalogItem(id: number)
  {
    return this.api.get(this.apilink + `User/ViewCatalogItem?id=${id}`,
    {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
    })})
  }

  AddToCart(id: string,newItem: CartItem)
  {
    return this.api.post(this.apilink + `AmbassadorOrder/AddToCart?id=${id}`, newItem, {observe: 'response', 
    responseType: 'text',headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }

  ClientAddToCart(id: string,newItem: CartItem)
  {
    return this.api.post(this.apilink + `ClientOrder/AddToCart?id=${id}`, newItem, {observe: 'response',
     responseType: 'text',headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }
  

  GetCartItems(id: string)
  {
    return this.api.get(this.apilink + `AmbassadorOrder/ViewCart?id=${id}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
    })})
  }

  ClientCartItems(id: string)
  {
    return this.api.get(this.apilink + `ClientOrder/ViewCart?id=${id}`,{
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem("token")})})
  }

  IncreaseCartItem(id: number)
  {
  return this.api.post(this.apilink + `AmbassadorOrder/IncreaseCartItem?id=${id}`,undefined, {observe: 'response', responseType: 'text',headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }

  ClientIncreaseCartItem(id: number)
  {
  return this.api.post(this.apilink + `ClientOrder/IncreaseCartItem?id=${id}`,undefined, {observe: 'response', responseType: 'text',headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }

  DecreaseCartItem(id: number)
  {
  return this.api.post(this.apilink + `AmbassadorOrder/DecreaseCartItem?id=${id}`,undefined, {observe: 'response', responseType: 'text',headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }

  ClientDecreaseCartItem(id: number)
  {
  return this.api.post(this.apilink + `ClientOrder/DecreaseCartItem?id=${id}`,undefined, {observe: 'response', responseType: 'text',
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }

  RemoveFromCart(id: number)
  {
    return this.api.delete(this.apilink + `AmbassadorOrder/RemoveFromCart?itemID=${id}`, {observe: 'response', 
    responseType: 'text',headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }

  ClientRemoveFromCart(id: number)
  {
    return this.api.delete(this.apilink + `ClientOrder/RemoveFromCart?itemID=${id}`, {observe: 'response', responseType: 'text'
  ,headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }

  GetAmbassadorFAQS(){
    return this.api.get(this.apilink+ `Ambassador/GetAmbassadorFAQS`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }


  ClearCart(id: number)
  {
    return this.api.delete(this.apilink + `AmbassadorOrder/ClearCart?cartID=${id}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
    })})
  }

  ClientClearCart(id: number)
  {
    return this.api.delete(this.apilink + `ClientOrder/ClearCart?cartID=${id}`,{observe: 'response', responseType: 'text'
    ,
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
    })})
  }


  GetAddress(id: string)
  {
    return this.api.get(this.apilink +`User/GetSecondaryAddress?id=${id}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  Checkout(order: Order)
  {
    return this.api.post(this.apilink + "AmbassadorOrder/Checkout", order, {observe: 'response', 
    responseType: 'text',headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
})})
  }

  ClientCheckout(order: Order)
  {
    return this.api.post(this.apilink + "ClientOrder/Checkout", order, {observe: 'response', 
    responseType: 'text',headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
})})
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
    return this.api.patch<boolean>(this.apilink + `User/updateUser`, user, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }
  PositionRequests():Observable<any[]>{
    return this.api.get<any[]>(this.apilink+`Admin/PositionRequests`)
  }
  
  //Course
  CreateCourse(newCourse:NewCourseVM):Observable<boolean>{
    return this.api.post<boolean>(this.apilink + `Training/CreateCourse`, newCourse , {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  GetAllCourses():Observable<any[]>{
    return this.api.get<any[]>(this.apilink+ `Training/GetAllCourses`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  setCourseId(courseId :number){
    this.updateCourseId = courseId;
  }

  setAccessCourseId(courseId :number){
    this.accessCourseID = courseId;
  }

  showAccessCourseId(){
    return this.accessCourseID;
  }

  GetCourseDetails(id=this.updateCourseId){
    var specicCourse = localStorage.getItem('updateCourse')
    var courseID = specicCourse.replace(',','')
    return this.api.get(this.apilink+`Training/GetSpecificCourse?id=${courseID}`)
  }

  GetAccessCourseDetails(){
    return this.api.get(this.apilink+`Training/GetSpecificCourse?id=${localStorage.getItem('course')}`)
  }

  UpdateSectionContent(sectionContent:SectionContent):Observable<boolean>{
    return this.api.patch<boolean>(this.apilink+`Training/UpdateSectionContent`, sectionContent)
  }
  
  UpdateQuizQuestion(quizQuestion:QuestionBank){
    return this.api.patch(this.apilink+`Training/UpdateQuizQuestions`,quizQuestion)
  }

  UpdateQuiz(quiz:Quiz){
    return this.api.patch(this.apilink+`Training/UpdateQuiz`,quiz)
  }

  UpdateCourse(updateCourse:Course){
    return this.api.patch(this.apilink+ `Training/UpdateCourseTest`, updateCourse)
  }

  getCourseId(){
    return this.updateCourseId
  }

  CreateQuizQuestion(createQuizQuestion:QuestionBank){
    return this.api.post(this.apilink+ `Training/CreateQuizQuestion`, createQuizQuestion) 
  }

  GetCourseQuestionBank(quizId:number){
    return this.api.get(this.apilink + `Training/GetCourseQuestionBank?quizId=${quizId}`)
  }

  GetCourseQuiz(courseId:number){
    return this.api.get(this.apilink + `Training/GetCourseQuiz?courseId=${courseId}`)
  }

  GetCourseSection(courseId:number){
    return this.api.get(this.apilink + `Training/GetCourseSectionContent?courseId=${courseId}`)
  }

  DeleteSectionContent(sectionContentId:number){
    return this.api.delete(this.apilink + `Training/DeleteSectionContent?sectionContentId=${sectionContentId}`)
  }

  DeleteQuiz(quizId:number){
    return this.api.delete(this.apilink + `Training/DeleteQuiz?quizId=${quizId}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  DeleteCourseQuestion(questionBankId:number){
    return this.api.delete(this.apilink + `Training/DeleteCourseQuestion?questionBankId=${questionBankId}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  DeleteCourse(courseId:number){
    return this.api.delete(this.apilink + `Training/DeleteCourse?courseId=${courseId}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  CreateSectionContent(sectionContent: SectionContent){
    return this.api.post(this.apilink+ `Training/CreateSectionContent`, sectionContent,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    }) 
  }

  //Forgot password
  ForgotPassword(forgotPassword:LoginVM):Observable<loginToken>{
    return this.api.post<loginToken>(this.apilink+ `User/ForgotPassword`, forgotPassword)
  }

  //Verify OTP 
  VerifyOTP(otp:string, token:string){
  return this.api.get(this.apilink+ `User/VerifyOTP?otp=${otp}`, 
  {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
    })
  })
  }

  //Reset password
  ResetPassword(password:string, token:string):Observable<any>{
    return this.api.get<any>(this.apilink+ `User/ResetPassword?resetPassword=${password}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
      })
    })
  }

  //View Feedback Admin
  // ViewFeedbackAdmin(){
  //   return this.api.get(this.apilink+ `Admin/ViewFeedback`)
  // }

  ViewAmbassadorFeedbackAdmin(){
    return this.api.get(this.apilink+ `Admin/ViewAmbassadorFeedback`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  ViewMerchFeedbackAdmin(){
    return this.api.get(this.apilink+ `Admin/ViewMerchFeedback`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  ViewAllAmbassadors(){
    return this.api.get(this.apilink + `Admin/ViewAmbassadors`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }


  SearchCurrentAgents(searchInput:string, userid:string){
    return this.api.get(this.apilink+`Ambassador/SearchCurrentAgents?userid=${userid}&searchInput=${searchInput}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }



  AmbassadorListRep(province: number, ranking: number)
  {
    return this.api.get(this.apilink + `Report/AmbassadorListRep?province=${province}&ranking=${ranking}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })} )
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
    return this.api.get(this.apilink + `AmbassadorOrder/ViewOrderHistory?userID=${id}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })})
  }

  ClientOrderHistory(id: string)
  {
    return this.api.get(this.apilink + `ClientOrder/ViewOrderHistory?userID=${id}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })})
  }

  ViewOrderDetails(id: number)
  {
    return this.api.get(this.apilink + `AmbassadorOrder/ViewOrderDetails?id=${id}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })})
  }

  ClientViewOrderDetails(id: number)
  {
    return this.api.get(this.apilink + `ClientOrder/ViewOrderDetails?id=${id}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })})
  }

  //Iteration 7
  LoggedInName()
  {
    return this.api.get(this.apilink + "User/LoggedInName", {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })} )
  }


  ProductListRep(type: number, category: number)
  {
    return this.api.get(this.apilink + `Report/ProductListRep?type=${type}&category=${category}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })} )
  }

 

  TopSeller(province: number, ranking: number)
  {
    return this.api.get(this.apilink + `Report/TopSeller?province=${province}&ranking=${ranking}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })} )
  }

  TargetRep(From: Date, To: Date)
  {
    return this.api.get(this.apilink + `Report/TargetRep?From=${From}&To=${To}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })} )
  }

  TopProduct(report: any)
  {
    return this.api.post(this.apilink + "Report/TopProduct",report, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })} )
  }

  RecruitmentRep(month: number)
  {
    return this.api.get(this.apilink + `Report/RecruitmentRep?month=${month}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })} )
  }


  GetSalesRep(report: any)
  {
    return this.api.post(this.apilink + "Report/SalesRep",report, {observe: 'response', responseType: 'text',
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })} )
  }

  //Iteration 8 
  //Amanda 
  GetSpecialOptions()
  {
    return this.api.get(this.apilink + "Admin/GetSpecialOptions", {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  GetSpecialTypes()
  {
    return this.api.get(this.apilink + "Admin/GetSpecialTypes", {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }
  // AcceptRegistration(){

  addSpecial(special: SpecialVM)
  {
    return this.api.post(this.apilink + "Admin/addSpecial", special, {observe: 'response', responseType: 'text',
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
  })})
  }

  GetAllSpecials()
  {
    return this.api.get(this.apilink + "Admin/GetAllSpecials", {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  ViewCatelogSpecials()
  {
    return this.api.get(this.apilink + "User/ViewCatelogSpecials", {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  GetSpecialById(id: number)
  {
    return this.api.get(this.apilink + `Admin/GetSpecialById?id=${id}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  UpdateSpecial(special: SpecialVM)
  {
    return this.api.put(this.apilink + "Admin/UpdateSpecial", special, {observe: 'response', responseType: 'text',
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
  })})
  }

  DeleteSpecial(id: number)
  {
    return this.api.delete(this.apilink + `Admin/DeleteSpecial?id=${id}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  ViewSalesOrder()
  {
    return this.api.get(this.apilink + "Ambassador/ViewSalesOrder", {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  SalesOrderDetails(id: number)
  {
    return this.api.get(this.apilink + `Ambassador/SalesOrderDetails?id=${id}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  SalesOrderById(id: number)
  {
    return this.api.get(this.apilink + `Ambassador/SalesOrderById?id=${id}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  GetAllOrderStatuses()
  {
    return this.api.get(this.apilink + "Ambassador/GetAllOrderStatuses", {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  UpdateSalesOrderStatus(order: uOrderStatusVM)
  {
    return this.api.put(this.apilink + "Ambassador/UpdateSalesOrderStatus", order, {observe: 'response', responseType: 'text',
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("token")
  })})
  }

  PurchasedProducts()
  {
    return this.api.get(this.apilink + "Client/PurchasedProducts", {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  
  }

  AccountExists(email:string):Observable<boolean>{
    return this.api.get<boolean>(this.apilink +`User/UserExist?email=${email}`)
  }

  AllRegistrations(){
    return this.api.get(this.apilink+ `Admin/GetAllRegistrations`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }
  SpecificRegistration(userId = localStorage.getItem('registrationRequest')){
    return this.api.get(this.apilink+ `Admin/SpecificRegistrationInfo?regId=${userId}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  AllTargetInfo(){
    return this.api.get(this.apilink+ `Admin/GetAllTarget`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  CreateTarget(target:Target){
    return this.api.post(this.apilink+ `Admin/CreateTarget`, target,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }
  BankInputInfo(){
    return this.api.get(this.apilink+ `Ambassador/BankInputInfo`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  UpdateTarget(target:Target){
    return this.api.patch(this.apilink+ `Admin/UpdateTarget`, target,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }
  TargetExists(ambId:number):Observable<boolean>{
    return this.api.get<boolean>(this.apilink+ `Admin/TargetExists?ambId=${ambId}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }
  GetSpecificTarget(ambId:number){
    return this.api.get(this.apilink+ `Admin/GetSpecificTarget?ambassadorId=${ambId}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })

  }
  DeleteTarget(targetId:number){
    return this.api.delete(this.apilink+ `Admin/DeleteTarget?targetID=${targetId}`,{
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }
  AssignCourseData(){
    return this.api.get(this.apilink+ `Training/AssignCourseData`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  UpdateAmbassadorDiscounts(update){
    return this.api.post(this.apilink+`Admin/UpdateAmbassadorDiscounts`, update, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  AccceptRegistration(application){
    return this.api.post(this.apilink+`Admin/AccceptRegistration`, application, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  RejectRegistration(application){
    return this.api.post(this.apilink+`Admin/RejectRegistration`, application, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }
  AuditTrail(){
    return this.api.get(this.apilink+`Admin/AuditTrail`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }

  AuditTrailByTransactionType(type){
    return this.api.get(this.apilink+`Admin/AuditTrailByTransactionType?type=${type}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }
  UpdateBankDetails(bAccountUpdate){
    return this.api.patch(this.apilink+`Ambassador/UpdateBankDetails`,bAccountUpdate, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem("token")
      })
    })
  }
}
