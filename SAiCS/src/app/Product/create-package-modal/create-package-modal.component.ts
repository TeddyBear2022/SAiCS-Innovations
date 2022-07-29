import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { Package } from 'src/app/Models/Package';
import { Price } from 'src/app/Models/Price';
import { PackageVM } from 'src/app/Models/ViewModels/PackageVM';

@Component({
  selector: 'app-create-package-modal',
  templateUrl: './create-package-modal.component.html',
  styleUrls: ['./create-package-modal.component.scss'],
})
export class CreatePackageModalComponent implements OnInit {
  package:FormGroup;
  packageTypes = []
  selectedFile = null
  isExisting: boolean = false

  constructor(
  private modalCtrl: ModalController, 
  private fb: FormBuilder,
  private api: ApiService,
  public toastController: ToastController) { }

  ngOnInit() {

    this.GetPackageTypes()

    this.package = this.fb.group({
      packageName:new FormControl('', Validators.required),
      packageTypeId:new FormControl('', Validators.required),
      description:new FormControl('', Validators.required),
      packageImage:new FormControl('', Validators.required),
      price:new FormControl('', Validators.required)
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

  submitForm()
  {
    
    if(this.package.valid){
    //add product attributes
    let product = {} as Package;
    product.packageName = this.package.value.packageName
    product.description = this.package.value.description
    product.packageTypeId = this.package.value.packageTypeId
    product.packageImage = this.selectedFile

    //add price
    let price = {} as Price;
    price.price1 = this.package.value.price

    //add to viewmodel
    let viewModel = {} as PackageVM;
    viewModel.package = product
    viewModel.price = price

    // create product
    this.api.CreatePackage(viewModel).subscribe((response)=> {
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
    })
    
    }
    else
    {
      console.log("Invalid form")
    }
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

//success alert
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully created Package',
      cssClass: 'successToaster',
      duration: 5000
    });
    toast.present(); 
    window.location.reload() 
  }

}
