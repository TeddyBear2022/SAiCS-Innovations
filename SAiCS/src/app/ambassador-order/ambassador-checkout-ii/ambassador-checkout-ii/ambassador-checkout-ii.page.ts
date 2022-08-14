import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Order } from 'src/app/Models/Order';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-ambassador-checkout-ii',
  templateUrl: './ambassador-checkout-ii.page.html',
  styleUrls: ['./ambassador-checkout-ii.page.scss'],
})
export class AmbassadorCheckoutIiPage implements OnInit {
  selectedFile: any;
  userAddress: any;
  deliveryOption = false;
  checkout: FormGroup;
  OdrSmry: any;
  one = 1; //got testing
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    private alert: AlertController,
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.GetAddress();
    this.OdrSmry = JSON.parse(localStorage.getItem('checkout'))
    this.deliveryOption = this.OdrSmry.deliveryOption == true? true : false
    console.log(this.OdrSmry);

    
    this.checkout = this.fb.group({
      address: ['', [Validators.required]],
      pdfFile:['', [Validators.required]]
    });
  }

  toggleValue() {
    if (this.deliveryOption == true) this.OdrSmry.totalCost += 200;
    else this.OdrSmry.totalCost -= 200;

    console.log(this.OdrSmry.totalCost);
  }

  GetAddress() {
    this.api.GetAddress(this.one.toString()).subscribe((data) => {
      this.userAddress = data;
      console.log(this.userAddress);
    });
  }

  onFileSelected(event) {
     let file = event.target.files[0];
     let reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => {
       let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
       if ((encoded.length % 4) > 0) {
         encoded += '='.repeat(4 - (encoded.length % 4));
       }
     this.selectedFile = encoded
     console.log("encoded successfully")
      }
    //console.log('size', file.size);
    
  }

  submitForm() {
   if(this.deliveryOption == false) this.checkout.setValidators(null)

    if (this.checkout.valid) {
            let order = {} as Order;
            order.addressId = this.deliveryOption == true ? this.checkout.value.address : null;
            order.userId = this.one.toString();
            order.orderStatusId = 1;
            order.proofOfPayment = this.selectedFile
            this.api.Checkout(order).subscribe();
            console.log(order);
            this.showAlert();
            this.router.navigate(['/ambassador-landing-page'])

    } else {
      console.log('invalid form');
    }
  }

  async showAlert() {
    const alert = await this.alert.create({
      header: 'Thank You For Your Order!',
      message:
        'At SAICS we know the struggles many of us face everyday and that is why we are offering you the opportunity to take control of your health and start living a healthy and maintainable lifestyle with our top of the range and clinically tested products',
      buttons: [
        {
          text: 'Back To Home',
        },
      ],
    });
    await alert.present();
  }
}
