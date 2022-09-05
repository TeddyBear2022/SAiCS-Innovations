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
  merchStatus = [];
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
    this.GetMerchStatuses();

    this.updateMerch = this.fb.group({
      merchName: new FormControl('', Validators.required),
      merchTypeId: new FormControl('', Validators.required),
      merchCatId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      merchImage: new FormControl(''),
      price: new FormControl('', [Validators.required]),
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
      console.log("Loaded types successfully");
    });
  }

  GetMerchCat() {
    this.api.GetMerchCat().subscribe((data) => {
      this.merchCat = data;
      console.log("Loaded categories successfully");
    });
  }

  GetMerchStatuses() {
    this.api.GetMerchStatuses().subscribe((data) => {
      this.merchStatus = data;
      console.log("Loaded statuses successfully");
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
    uMerch.statusId = this.updateMerch.value.status;
    uMerch.merchTypeId = this.updateMerch.value.merchTypeId;
    uMerch.merchCategoryId = this.updateMerch.value.merchCatId;

    
    this.api.UpdateMerch(this.existingProduct, uMerch).subscribe((res) =>{
      if(res.body == "Item Updated successfully")
      {
        this.presentToast();
        this.dismissModal();
      }
      else
      {
        console.log(res.body);
      }
     
      
    })

    }
    
  //confirm update
  async ConfirmUpdate() {
    
    if(this.updateMerch.valid)
    {
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
    // else {

    //   const alert = await this.alertController.create({
    //     cssClass: 'messageAlert',
    //     header: 'Invalid Form',
    //     message: "Please Ensure All Fields Are not Empty",
    //     buttons: ['OK']
    //   });
      
    //   await alert.present();
    //   //console.log('invalid form');
    // }
    
  }

  //dismiss modal
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  //success alert
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully Updated Merchandise',
      cssClass: 'successToaster',
      duration: 5000,
    });
    toast.present();
    window.location.reload();
  }
}
