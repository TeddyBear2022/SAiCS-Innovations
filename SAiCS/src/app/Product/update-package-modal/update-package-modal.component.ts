import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Package } from 'src/app/Models/Package';
import { Price } from 'src/app/Models/Price';
import { PackageVM } from 'src/app/Models/ViewModels/PackageVM';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-update-package-modal',
  templateUrl: './update-package-modal.component.html',
  styleUrls: ['./update-package-modal.component.scss'],
})
export class UpdatePackageModalComponent implements OnInit {
  @Input() existingPackage: string;

  updatePackageForm:FormGroup;
  packageTypes = []
  selectedFile = null

  constructor(
    private modalCtrl: ModalController, 
    private fb: FormBuilder,
    private api: ApiService,
    public alertController: AlertController,
    public toastController: ToastController) { }

  ngOnInit() {
    this.GetPackageByName(this.existingPackage)
    this.GetPackageTypes()

    this.updatePackageForm = this.fb.group({
      packageName:new FormControl('', Validators.required),
      packageTypeId:new FormControl('', Validators.required),
      description:new FormControl('', Validators.required),
      packageImage:new FormControl('', Validators.required),
      price:new FormControl('', Validators.required)
    })
  }

  GetPackageByName(name)
  {
    
    this.api.GetPackageByName(name).subscribe(data => {
      this.updatePackageForm.controls['packageName'].setValue(data.package.packageName);
      this.updatePackageForm.controls['packageTypeId'].setValue(data.package.packageTypeId);
      this.updatePackageForm.controls['description'].setValue(data.package.description);
      this.updatePackageForm.controls['price'].setValue(data.price.price1);
    })
    
  }

   //package categories
   GetPackageTypes()
   {
     this.api.GetPackageTypes().subscribe(data => {
       this.packageTypes = data; 
       console.log(this.packageTypes);
       
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
     let product = {} as Package;
     product.packageName = this.updatePackageForm.value.packageName
     product.description = this.updatePackageForm.value.description
     product.packageTypeId = this.updatePackageForm.value.packageTypeId
     product.quantity = this.updatePackageForm.value.quantity
     product.packageImage = this.selectedFile
 
     //add price
     let price = {} as Price;
     price.price1 = this.updatePackageForm.value.price
 
     //add to viewmodel
     let viewModel = {} as PackageVM;
     viewModel.package = product
     viewModel.price = price
 
     // update product
     this.api.UpdatePackage(this.existingPackage, viewModel).subscribe(()=> {console.log("success")})
     console.log(product)
 
     //success
    this.presentToast()

     //dismiss modal
     this.dismissModal()
  
    
   } 

   
   //confirm update
async ConfirmUpdate() {
  const alert = await this.alertController.create({
    cssClass: 'messageAlert',
    message: "Are you sure you would like to update this package's details?",
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
      message: 'Successfully Updated Package',
      cssClass: 'successToaster',
      duration: 2000
    });
    toast.present(); 
  }

}
