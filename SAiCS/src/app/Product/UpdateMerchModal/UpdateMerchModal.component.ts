import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgModel,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MerchVM } from 'src/app/Models/ViewModels/MerchVM';

@Component({
  selector: 'app-update-merch-modal',
  templateUrl: './UpdateMerchModal.component.html',
  styleUrls: ['./UpdateMerchModal.component.scss'],
})
export class UpdateMerchModalComponent implements OnInit {
  @Input() existingProduct: number;

  updateMerch: FormGroup;
  merchTypes = [];
  merchCat = [];
  selectedFile: any;
  setData: any;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private api: ApiService,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.GetMerchById(this.existingProduct);
    this.GetMerchCat();
    this.GetMerchTypes();

    this.updateMerch = this.fb.group({
      merchName: new FormControl('', Validators.required),
      merchTypeId: new FormControl('', Validators.required),
      merchCatId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      merchImage: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  GetMerchById(id) {
    this.api.GetMerchById(id).subscribe((data) => {
      this.setData = data;
      this.updateMerch.controls['merchName'].setValue(this.setData.name);
      this.updateMerch.controls['merchTypeId'].setValue(this.setData.typeID);
      this.updateMerch.controls['merchCatId'].setValue(this.setData.catID);
      this.updateMerch.controls['description'].setValue(
        this.setData.description
      );
      this.updateMerch.controls['price'].setValue(this.setData.price);
      this.updateMerch.controls['status'].setValue(this.setData.status);
      console.log(data);
    });
  }

  GetMerchTypes() {
    this.api.GetMerchTypes().subscribe((data) => {
      this.merchTypes = data;
      console.log(this.merchTypes);
    });
  }

  GetMerchCat() {
    this.api.GetMerchCat().subscribe((data) => {
      this.merchCat = data;
      console.log(this.merchCat);
    });
  }

  onFileSelected(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
      if (encoded.length % 4 > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      this.selectedFile = encoded;
      console.log('encoded successfully');
    };
  }

  submitForm() {
    let uMerch = {} as MerchVM;
    uMerch.merchName = this.updateMerch.value.merchName;
    uMerch.description = this.updateMerch.value.description;
    uMerch.merchImage = this.selectedFile;
    uMerch.price = this.updateMerch.value.price;
    uMerch.status = this.updateMerch.value.status;
    uMerch.merchTypeId = this.updateMerch.value.merchTypeId;
    uMerch.merchCategoryId = this.updateMerch.value.merchCatId;

    //add product attributes
    // let product = {} as Product;
    // product.productName = this.updateProductForm.value.productName
    // product.description = this.updateProductForm.value.description
    // product.productTypeId = this.updateProductForm.value.productTypeId
    // product.productImage = this.selectedFile

    //add price
    // let price = {} as Price;
    // price.price1 = this.updateProductForm.value.price

    //add to viewmodel
    // let viewModel = {} as ProductVM;
    // viewModel.product = product
    // viewModel.price = price

    // update product
    this.api.UpdateMerch(this.existingProduct, uMerch).subscribe(()=> {console.log("success")})
    //console.log(product)

    //dismiss modal
    //this.dismissModal();

    //suceess
    //this.presentToast();
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
            this.submitForm();
            console.log('Confirm Ok');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
      ],
    });

    await alert.present();
  }

  //dismiss modal
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  //success alert
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully Updated Product',
      cssClass: 'successToaster',
      duration: 5000,
    });
    toast.present();
    window.location.reload();
  }
}
