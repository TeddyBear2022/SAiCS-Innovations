import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { MerchVM } from 'src/app/Models/ViewModels/MerchVM';

@Component({
  selector: 'app-create-merch-modal',
  templateUrl: './CreateMerchModal.component.html',
  styleUrls: ['./CreateMerchModal.component.scss'],
})
export class CreateMerchModalComponent implements OnInit {
  merch: FormGroup;
  merchTypes = [];
  merchCat = [];
  merchStatus: any = [];
  selectedFile: any;
  isExisting: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private api: ApiService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.GetMerchTypes();
    this.GetMerchCat();
    this.GetMerchStatuses();

    this.merch = this.fb.group({
      merchName: new FormControl('', Validators.required),
      merchTypeId: new FormControl('', Validators.required),
      merchCatId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      merchImage: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required]),
    });
  }

  //product categories
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
      this.merchStatus = this.merchStatus.find(x => x.merchStatusName == "In Stock")
      console.log(this.merchStatus);
    });
  }

  //convert image to base64
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
    if (this.merch.valid) {
      let nMerch = {} as MerchVM;
      nMerch.merchName = this.merch.value.merchName;
      nMerch.description = this.merch.value.description;
      nMerch.merchImage = this.selectedFile;
      nMerch.price = this.merch.value.price;
      nMerch.statusId = this.merchStatus.merchStatusId;
      nMerch.merchTypeId = this.merch.value.merchTypeId;
      nMerch.merchCategoryId = this.merch.value.merchCatId;

      // create product
     this.api.CreateMerch(nMerch).subscribe((res) =>{
      console.log(res.body);
      
      if(res.body == "Created")
      {
        this.isExisting = false
        this.dismissModal() 
        this.presentToast()
      }
      else if(res.body == "Exists")
      {
        this.isExisting = true
        
      }
      
     }, (error) => {console.log(error)})
     
    }else {
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
    //window.location.reload();
  }
}
