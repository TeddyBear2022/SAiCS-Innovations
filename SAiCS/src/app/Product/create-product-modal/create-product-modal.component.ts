import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductVM } from 'src/app/Models/ViewModels/ProductVM';
import { ApiService } from 'src/app/Services/api.service';
import { Product } from 'src/app/Models/Product';
import { Price } from 'src/app/Models/Price';
import {HttpClient,HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-create-product-modal',
  templateUrl: './create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.scss'],
})
export class CreateProductModalComponent implements OnInit {

  product:FormGroup;
  productTypes = []
  selectedFile = null

  constructor(
  private modalCtrl: ModalController, 
  private fb: FormBuilder,
  private api: ApiService) { }

  ngOnInit() {
    this.GetProductTypes()

    this.product = this.fb.group({
      productName:new FormControl('', Validators.required),
      productTypeId:new FormControl('', Validators.required),
      quantity:new FormControl('', Validators.required),
      description:new FormControl('', Validators.required),
      productImage:new FormControl('', Validators.required),
      price:new FormControl('', Validators.required)
    })
  }

  //product categories
  GetProductTypes()
  {
    this.api.GetProductTypes().subscribe(data => {
      this.productTypes = data; 
      console.log(this.productTypes);
      
     })
  }
  
  
  submitForm()
  {
    
    //add product attributes
    let product = {} as Product;
    product.productName = this.product.value.productName
    product.description = this.product.value.description
    product.productTypeId = this.product.value.productTypeId
    product.quantity = this.product.value.quantity
    product.productImage = this.selectedFile

    //add price
    let price = {} as Price;
    price.price1 = this.product.value.price

    //add to viewmodel
    let viewModel = {} as ProductVM;
    viewModel.product = product
    viewModel.price = price

    // create product
    this.api.CreateProduct(viewModel).subscribe((response)=> {console.log()})
    console.log(product)

    //dismiss modal
    this.dismissModal()
  }

  //convert image to base64
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
    console.log("Image encoded")
    };
  }
  
  //dismiss modal
  dismissModal()
  {
    this.modalCtrl.dismiss();
  }

  
}

