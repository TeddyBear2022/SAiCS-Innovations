import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { HttpErrorResponse} from '@angular/common/http';
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

    this.merch = this.fb.group({
      merchName: new FormControl('', Validators.required),
      merchTypeId: new FormControl('', Validators.required),
      merchCatId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      merchImage: new FormControl('', Validators.required),
      price: new FormControl('', [
        Validators.required,
      ]),
      status: new FormControl('', Validators.required),
    });
  }

  //product categories
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

  //convert image to base64
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

  }

  submitForm() {
    if (this.merch.valid) {

        const formData: FormData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
  
          this.api.UploadImage(formData).subscribe(data => { 
            console.log(data)}, (res: HttpErrorResponse) =>{
              if(res.status === 200)
              {    
                let nMerch = {} as MerchVM;
                nMerch.merchName = this.merch.value.merchName;
                nMerch.description = this.merch.value.description;
                nMerch.merchImage = res.error.text;
                nMerch.price = this.merch.value.price;
                nMerch.status = this.merch.value.status;
                nMerch.merchTypeId = this.merch.value.merchTypeId;
                nMerch.merchCategoryId = this.merch.value.merchCatId;
          
                // create product
                this.api.CreateMerch(nMerch).subscribe((response)=> {
                  if(response == true)
                  {
                    this.isExisting = false
                    //dismiss modal
                    this.dismissModal()
                     // success alert
                     this.presentToast()
                     
                  }
                  else
                  {
                    this.isExisting = true
                    console.log("Product existing")
                  }      
                });
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
