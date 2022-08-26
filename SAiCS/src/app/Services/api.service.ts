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

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: HttpClient) { }

  apilink:string = "https://localhost:44343/api/"
  token:any
  updateCourseId:number;
  // headers = new HttpHeaders().set('Authorization', ' Bearer'+ JSON.stringify(localStorage.getItem('token')))
  headers = new HttpHeaders().set('Authorization :', 'Bearer'+  localStorage.getItem('token')) 

  httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    })
  };

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
  

  //get ambassador rankings
  getAmbassadorRankings():Observable<AmbassadorType[]>{
    return this.api.get<AmbassadorType[]>(this.apilink+"Admin/getAmbassadorTypes")
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
    return this.api.post(this.apilink+'Admin/createFAQ',faq ,this.httpOptions)
  }
  // faqID
  DeleteFAQ(faqID:number):Observable<boolean>{
    return this.api.delete<boolean>(this.apilink + `Admin/deleteFAQ?faqID=${faqID}`,this.httpOptions)
  }

  GetAccountFAQ(): Observable<FAQ[]>
  {
    return this.api.get<FAQ[]>(this.apilink + 'Client/GetAccountFAQ',this.httpOptions)
  }

  GetProductFAQ(): Observable<FAQ[]>
  {
    return this.api.get<FAQ[]>(this.apilink + 'Client/GetProductFAQ',this.httpOptions)
  }

  GetDeliveryFAQ(): Observable<FAQ[]>
  {
    return this.api.get<FAQ[]>(this.apilink + 'Client/GetDeliveryFAQ',this.httpOptions)
  }

  GetAllFAQS(): Observable<FAQ[]>{
    return this.api.get<FAQ[]>(this.apilink+'Admin/getAllFAQS',this.httpOptions)
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
 
   //Create product
  CreateMerch(nMerch: MerchVM)
  {
    return this.api.post(this.apilink + "Product/CreateMerch", nMerch)
  }

  // Get all products
  GetAllMerch(): Observable<any>
  {
    return this.api.get(this.apilink + 'Product/GetMerch')
  }

  GetMerchById(id: number)
  {
    return this.api.get(this.apilink + `Product/GetMerchById?id=${id}`)
  }
  
  //Update product
  UpdateMerch(id: number, uMerch: MerchVM): Observable<MerchVM>
  {
    return this.api.put<MerchVM>(this.apilink + `Product/UpdateMerch?id=${id}`, uMerch)
  }

  //Delete product
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

  AddToCart(id: string,newItem: CartItem[])
  {
    return this.api.post(this.apilink + `AmbassadorOrder/AddToCart?id=${id}`, newItem)
  }

  GetCartItems()
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
    return this.api.delete(this.apilink + `Training/DeleteQuiz?quizId=${quizId}`)
  }

  DeleteCourseQuestion(questionBankId:number){
    return this.api.delete(this.apilink + `Training/DeleteCourseQuestion?questionBankId=${questionBankId}`)
  }

  DeleteCourse(courseId:number){
    return this.api.delete(this.apilink + `Training/DeleteCourse?courseId=${courseId}`)
  }

  CreateSectionContent(sectionContent: SectionContent){
    return this.api.post(this.apilink+ `Training/CreateSectionContent`, sectionContent) 
  }

  //Forgot password
  ForgotPassword(forgotPassword:LoginVM):Observable<loginToken>{
    return this.api.post<loginToken>(this.apilink+ `User/ForgotPassword`, forgotPassword)
  }

  //Verify OTP 
  VerifyOTP(otp:string){
  return this.api.get(this.apilink+ `User/VerifyOTP?otp=${otp}`, this.httpOptions)
  }

  //Reset password
  ResetPassword(password:string):Observable<any>{
    return this.api.get<any>(this.apilink+ `User/ResetPassword?resetPassword=${password}`,this.httpOptions)
  }

  //View Feedback Admin
  // ViewFeedbackAdmin(){
  //   return this.api.get(this.apilink+ `Admin/ViewFeedback`)
  // }

  ViewAmbassadorFeedbackAdmin(){
    return this.api.get(this.apilink+ `Admin/ViewAmbassadorFeedback`,this.httpOptions)
  }

  ViewMerchFeedbackAdmin(){
    return this.api.get(this.apilink+ `Admin/ViewMerchFeedback`,this.httpOptions)
  }

  ViewAllAmbassadors(){
    return this.api.get(this.apilink + `Admin/ViewAmbassadors`,this.httpOptions)
  }

  SearchAmbassador(searchInput:string){
    return this.api.get(this.apilink+`Admin/SearchAmbassador?nameorsurname=${searchInput}`,this.httpOptions)
  }

  SearchCurrentAgents(searchInput:string, userid:string){
    return this.api.get(this.apilink+`Ambassador/SearchCurrentAgents?userid=${userid}&searchInput=${searchInput}`,this.httpOptions)
  }

  AmbassadorAccessCourse():Observable<any[]>{
    return this.api.get<any[]>(this.apilink+ `Training/GetAmbassadorsCourses`,this.httpOptions)
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
}
