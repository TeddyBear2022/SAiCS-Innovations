import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { GridApi, RowSelectedEvent, SelectionChangedEvent } from 'ag-grid-community';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Special } from 'src/app/Models/Special';
import { SpecialVM } from 'src/app/Models/ViewModels/SpecialVM';

@Component({
  selector: 'app-add-special',
  templateUrl: './add-special.page.html',
  styleUrls: ['./add-special.page.scss'],
})
export class AddSpecialPage implements OnInit {

  columnDefs = [
		{headerName: 'Item', field: 'item' , 
    cellRenderer: (params) => `<img style="height: 42px; width: 42px; margin-top: 5%;" src="data:image/png;base64,${params.value}" />`
  },
		{headerName: 'Name', field: 'name' },
		{headerName: 'Status', field: 'status'}
	];

	rowData: any= [];
  specialItemsArr = []
  addForm: FormGroup;
  selectedFile: any;
  specialTypes: any = [];

  rowSelection: 'single' | 'multiple' = 'multiple';
  selectedRow: any;
  constructor(
    public popoverController: PopoverController,
     private api: ApiService,
     private fb: FormBuilder,) { }

  ngOnInit() {
    this.GetSpecialOptions()

    this.addForm = this.fb.group({
      sName: new FormControl('', Validators.required),
      sType: new FormControl('', Validators.required),
      sImage: new FormControl('', Validators.required),
      sDescription: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', [Validators.required]),
      sPrice: new FormControl('', Validators.required),
    });
  }


  GetSpecialOptions()
  {

    this.api.GetSpecialOptions().subscribe(res =>
      {
        this.rowData =res
        console.log(this.rowData);
      })

      this.api.GetSpecialTypes().subscribe(res => {
        this.specialTypes = res
      })

  }

  onRowSelected(event: RowSelectedEvent) {
    if(event.node.isSelected())
    {
      console.log(event.node.data.name);
      this.specialItemsArr.push({
        name: event.node.data.name
      })
    }
    else
    {
      console.log('Has been deselected');
      this.specialItemsArr =  this.specialItemsArr.filter(x => x.name !== event.node.data.name)
      
    }
   
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    var rowCount = event.api.getSelectedNodes().length;
    window.alert('selection changed, ' + rowCount + ' rows selected');
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

  submitForm()
  {
    if(this.addForm.valid && this.specialItemsArr.length > 1)
    {
      let nSpecial = {} as Special;
      nSpecial.specialName = this.addForm.value.sName;
      nSpecial.specialImage = this.selectedFile;
      nSpecial.specialTypeId = this.addForm.value.sType;
      nSpecial.description = this.addForm.value.sDescription;
      nSpecial.price = this.addForm.value.sPrice;
      nSpecial.startDate = this.addForm.value.startDate;
      nSpecial.endDate = this.addForm.value.endDate;

      let vmSpecial = {} as SpecialVM;
      vmSpecial.Special = nSpecial
      vmSpecial.SpecialItems = this.specialItemsArr
      
      //console.log(nSpecial);
      
      this.api.addSpecial(vmSpecial).subscribe(res =>{
        console.log(res);
        
      })
      
    }
    else{
       
      console.log("Invalid Form");
    }
  }



  //Profile popover
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }
}
