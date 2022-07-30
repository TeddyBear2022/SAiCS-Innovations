import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductVM } from 'src/app/Models/ViewModels/ProductVM';
import { ApiService } from 'src/app/Services/api.service';
import { Product } from 'src/app/Models/Product';
import { Price } from 'src/app/Models/Price';
import { HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-create-product-modal',
  templateUrl: './create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.scss'],
})
export class CreateProductModalComponent implements OnInit {
  product: FormGroup;
  productTypes = [];
  selectedFile: any;
  isExisting: boolean = false;
  file: any;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private api: ApiService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.GetProductTypes();

    this.product = this.fb.group({
      productName: new FormControl('', Validators.required),
      productTypeId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      productImage: new FormControl('', Validators.required),
      price: new FormControl('', [
        Validators.required,
      ]),
      status: new FormControl('', Validators.required),
    });
  }

  //product categories
  GetProductTypes() {
    this.api.GetProductTypes().subscribe((data) => {
      this.productTypes = data;
      console.log(this.productTypes);
    });
  }

  //convert image to base64
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

  }

  submitForm() {
    if (this.product.valid) {

        const formData: FormData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
  
          this.api.UploadImage(formData).subscribe(data => { 
            console.log(data)}, (res: HttpErrorResponse) =>{
              if(res.status === 200)
              {     
                //add product attributes
                let product = {} as Product;
                product.productName = this.product.value.productName;
                product.description = this.product.value.description;
                product.productTypeId = this.product.value.productTypeId;
                product.productImage = res.error.text;
                product.status = this.product.value.status;
          
                //add price
                let price = {} as Price;
                price.price1 = this.product.value.price;
          
                //add to viewmodel
                let viewModel = {} as ProductVM;
                viewModel.product = product;
                viewModel.price = price;
          
                // create product
                this.api.CreateProduct(viewModel).subscribe((response)=> {
                  if(response == true)
                  {
                    this.isExisting = false
                     // success alert
                     this.presentToast()
                     //dismiss modal
                     this.dismissModal()
                  }
                  else
                  {
                    this.isExisting = true
                    console.log("Product existing")
                  }      
                });
                console.log(product);
              }
            })

    } else {
      console.log('invalid form');
    }
  }

  //dismiss modal
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  //success alert
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully created Product',
      cssClass: 'successToaster',
      duration: 5000,
    });
    toast.present();
    window.location.reload();
  }
}
