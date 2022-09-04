import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController} from '@ionic/angular';
import { Order } from 'src/app/Models/Order';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';
@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.page.html',
  styleUrls: ['./client-checkout.page.scss'],
})
export class ClientCheckoutPage implements OnInit {

  selectedFile: any;
  userAddress: any;
  deliveryOption = false;
  checkout: FormGroup;
  OdrSmry: any;
  session: any
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

   constructor(public alertController: AlertController, 
    private modal: ModalController, 
    private alert: AlertController,
    private api: ApiService,
    private fb: FormBuilder,
    private route:Router,
    private tmpStorage:TemporaryStorage,
    private menu: MenuController,) { }

  ngOnInit() {
    this.menu.enable(true, 'client-menu');
    this.session = this.tmpStorage.getSessioninfo()
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
    var deliverValue = JSON.parse(localStorage.getItem('checkout'))
    if (this.deliveryOption == true)
    {
      this.OdrSmry.totalCost += 200;
      deliverValue.deliveryOption = true;
  
    }
    else
    {
     this.OdrSmry.totalCost -= 200;
     deliverValue.deliveryOption = false;
    }
    
    localStorage.setItem('checkout', JSON.stringify(deliverValue))
  }


  GetAddress() {
    this.api.GetAddress(this.session[0].id).subscribe((data) => {
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
  }}

  EditAddress(id: number)
  {
    localStorage.setItem('EditAddressId', JSON.stringify(id))
    this.route.navigate(['/client-edit-address'])
  }

  DeleteAddress(id: number)
  {
    this.api.DeleteSecondaryAddress(id).subscribe(res => {console.log(res);
      this.GetAddress();
    })
  }

  submitForm() {

    if(this.deliveryOption == false) 
    {
     this.checkout.get('address').clearValidators();
     this.checkout.get('address').updateValueAndValidity();
    }
    
 
     if (this.checkout.valid) {
             let order = {} as Order;
             order.addressId = this.deliveryOption == true ? this.checkout.value.address : null;
             order.userId = this.session[0].id;
             order.orderStatusId = 1;
             order.proofOfPayment = this.selectedFile
             this.api.ClientCheckout(order).subscribe(res => {
               console.log(res.body);
               
             });
             console.log(order);
 
             this.checkout.get('address').setValidators(Validators.required);
             this.checkout.get('address').updateValueAndValidity();
 
             var orderdetails = {
               'itemCount': 0,
               'vat': 0, 'subtotal': 0, 'totalCost': 0, 'deliveryOption': 0}
               localStorage.setItem('checkout', JSON.stringify(orderdetails))
         
 
             this.showAlert();
 
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
          handler: () => {
            this.route.navigate(['./landing-page'])
          }
        },
      ],
    });
    await alert.present();
  }


    
  }

