import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(phone:number) {

    let rawNum:string = phone.toString()

    rawNum = "0"+ rawNum;

    const countryCodeStr = rawNum.slice(0,3);
    const areaCodeStr = rawNum.slice(2,5);
    const midSectionStr = rawNum.slice(5,9);

    return `${countryCodeStr} ${areaCodeStr} ${midSectionStr}`;
  }

}
