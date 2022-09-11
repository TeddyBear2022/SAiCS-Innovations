import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(rawNum:any) {

   // const countryCodeStr = rawNum.slice(0,2);
    const areaCodeStr = rawNum.slice(0,2);
    const midSectionStr = rawNum.slice(2,5);
    const lastSectionStr = rawNum.slice(5,8);

    return `0${areaCodeStr} ${midSectionStr} ${lastSectionStr}`;
  }

}
