import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { ProductVM } from 'src/app/Models/ViewModels/ProductVM';
import { ApiService } from 'src/app/Services/api.service';
import { Product } from 'src/app/Models/Product';
import { Price } from 'src/app/Models/Price';

@Component({
  selector: 'app-update-product-modal',
  templateUrl: './update-product-modal.component.html',
  styleUrls: ['./update-product-modal.component.scss'],
})
export class UpdateProductModalComponent implements OnInit {
  
  @Input() existingProduct: string;
 
  updateProductForm:FormGroup;
  productTypes = []
  selectedFile = null

  constructor(
    private modalCtrl: ModalController, 
    private fb: FormBuilder,
    private api: ApiService,
    public alertController: AlertController,
    public toastController: ToastController) { }

  ngOnInit() {

   this.GetProductByName(this.existingProduct)
   this.GetProductTypes()
 
    this.updateProductForm = this.fb.group({
      productName:new FormControl('', Validators.required),
      productTypeId:new FormControl('', Validators.required),
      description:new FormControl('', Validators.required),
      productImage:new FormControl('', Validators.required),
      price:new FormControl('', Validators.required)
    })
  }

  GetProductByName(name)
  {
    

    this.api.GetProductByName(name).subscribe(data => {
      this.updateProductForm.controls['productName'].setValue(data.product.productName);
      this.updateProductForm.controls['productTypeId'].setValue(data.product.productTypeId);
      this.updateProductForm.controls['description'].setValue(data.product.description);
      this.updateProductForm.controls['price'].setValue(data.price.price1);
    })
    
  }

  GetProductTypes()
  {
    this.api.GetProductTypes().subscribe(data => {
      this.productTypes = data; 
      console.log(this.productTypes);
      
     })
  }
  
  onFileSelected(event)
  {
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
    };
  }

  submitForm()
  {
    
    //add product attributes
    let product = {} as Product;
    product.productName = this.updateProductForm.value.productName
    product.description = this.updateProductForm.value.description
    product.productTypeId = this.updateProductForm.value.productTypeId
    product.productImage = this.selectedFile

    //add price
    let price = {} as Price;
    price.price1 = this.updateProductForm.value.price

    //add to viewmodel
    let viewModel = {} as ProductVM;
    viewModel.product = product
    viewModel.price = price

    // update product
    this.api.UpdateProduct(this.existingProduct, viewModel).subscribe(()=> {console.log("success")})
    console.log(product)

    //suceess 
    this.presentToast()

    //dismiss modal
    this.dismissModal()
  }

//confirm update
async ConfirmUpdate() {
  const alert = await this.alertController.create({
    cssClass: 'messageAlert',
    message: "Are you sure you would like to update this product's details?",
    buttons: [
      {
        text: 'Confirm',
        cssClass: 'Confirm',
        handler: () => {
          this.submitForm()
          console.log('Confirm Ok');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'Cancel',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }
    ]
  });

  await alert.present();
}

  //dismiss modal
  dismissModal()
  {
    this.modalCtrl.dismiss();
  }

  //success alert
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully Updated Product',
      cssClass: 'successToaster',
      duration: 5000
    });
    toast.present();
    window.location.reload() 
  }
}
