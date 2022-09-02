import { accessInfoVM } from "./accessinfoVM";
import { registerationinfoVM } from "./registerationinfoVM";

export class registerVM{
    AccessInfo:accessInfoVM
    RegisterInfo:registerationinfoVM
    
    constructor(access:accessInfoVM, register:registerationinfoVM) {
      this.AccessInfo = access
      this.RegisterInfo = register
    }
}
