import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { accessInfoVM } from "../Models/ViewModels/accessinfoVM"
import { LoginVM } from "../Models/ViewModels/LoginVM"
import { registerationinfoVM } from "../Models/ViewModels/registerationinfoVM"
import { registerVM } from "../Models/ViewModels/registerVM"

@Injectable({
    providedIn: 'root'
  })
  export class TemporaryStorage {

    constructor(private api: HttpClient) {
      if(!localStorage.getItem('registerInfo' &&'accessInfo')){
        let registerInfo:registerationinfoVM[] = []
        let accessInfo:accessInfoVM[]=[]
        let sessioninfo:registerVM[] =[]
        localStorage.setItem('registerInfo', JSON.stringify(registerInfo))
        localStorage.setItem('accessInfo', JSON.stringify(accessInfo))
        localStorage.setItem('sessioninfo', JSON.stringify(sessioninfo))
      }
     }

     //get registration info from localstorage
     getRegisterInfo(){
      let registerInfo:registerationinfoVM[]=[]
      if(localStorage.getItem('registerInfo')){
        registerInfo = JSON.parse(localStorage.getItem('registerInfo')!)
      }
      return registerInfo
     }

     //First object and step in registering
     addRegisterInfo(register: registerationinfoVM){
       let registerInfo:registerationinfoVM[]=[]
       if(localStorage.clear){}
       registerInfo.push(register)
       localStorage.setItem('registerInfo', JSON.stringify(registerInfo))
     }

     //Second object and step in registering 
     addAccessInfo(access:accessInfoVM){
      let accessInfo:accessInfoVM[]=[]
      if(localStorage.clear){}
      accessInfo.push(access);
      localStorage.setItem('accessInfo', JSON.stringify(accessInfo))
     }

     //Getting accessinfo
     getAccessInfo(){
      let accessInfo:accessInfoVM[]=[]
      if(localStorage.getItem('accessInfo')){
        accessInfo = JSON.parse(localStorage.getItem('accessInfo')!)
      }
      return accessInfo
     }
    
     //Uploading user session information to localstorage so its accessible everywhere on the app while logged in
     addSession(session:any){
       let sessioninfo:any[] =[]
       if(localStorage.clear){}
       sessioninfo.push(session)
       localStorage.setItem('sessioninfo', JSON.stringify(sessioninfo))
     }

     //get user session inforamtion
     getSessioninfo(){
      let sessioninfo:any[] =[]
      if(localStorage.getItem('sessioninfo')){
        sessioninfo = JSON.parse(localStorage.getItem('sessioninfo')!)
      }
      return sessioninfo;
     }

     //logging out
     logout(){
      let registerInfo:registerationinfoVM[] = []
      let accessInfo:accessInfoVM[]=[]      
      let sessioninfo:registerVM[] =[]
      
       if(localStorage){
      localStorage.setItem('registerInfo', JSON.stringify(registerInfo))
      localStorage.setItem('accessInfo', JSON.stringify(accessInfo))
      localStorage.setItem('sessioninfo', JSON.stringify(sessioninfo))
       }
     }
     //logging out
     clearRegistrationInfo(){
      let registerInfo:registerationinfoVM[] = []
       if(localStorage){
        localStorage.setItem('registerInfo', JSON.stringify(registerInfo))
       
       }
     }
  }
  