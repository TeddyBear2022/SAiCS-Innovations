import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import {RowSelectedEvent, SelectionChangedEvent} from 'ag-grid-community';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Special } from 'src/app/Models/Special';
import { SpecialVM } from 'src/app/Models/ViewModels/SpecialVM';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';

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
  //gridApi: GridOptions; 
  @ViewChild('specialGrid') grid!: AgGridAngular;
  rowSelection: 'single' | 'multiple' = 'multiple';
  selectedRow: any;
  constructor(
    public popoverController: PopoverController,
     private api: ApiService,
     private fb: FormBuilder, private router: Router,
     private alert:AlertController) { }

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
        id: event.node.data.id,
        name: event.node.data.name
      })
    }
    else
    {
      console.log('Has been deselected');
      this.specialItemsArr =  this.specialItemsArr.filter(x => x.name !== event.node.data.name)
      
    }
   
  }

  RemoveItem(name)
  {
    this.grid.api.forEachNode(function(node){
      if(node.data.name === name)
      {
        node.setSelected(false)
      }
    }.bind(this))
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    var rowCount = event.api.getSelectedNodes().length;
    console.log('selection changed, ' + rowCount + ' rows selected');
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
    let message = ""

    if(this.addForm.valid && this.specialItemsArr.length > 0 &&
      this.addForm.get(['startDate']).value <=this.addForm.get(['endDate']).value)
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
      
      this.api.addSpecial(vmSpecial).subscribe(res =>{
        if(res.body == "Created")
        {
          history.back()
          this.addForm.reset()
        }
        else if(res.body == "Exists")
        {
          message = "This item already Exists"
          this.Notif(message);
        }

       
      })
      
    }
    else if(this.addForm.valid && this.specialItemsArr.length > 0 && this.addForm.get(['startDate']).value > this.addForm.get(['endDate']).value)
    {
       message = "Please ensure that the start and end date are in the correct format"
       this.Notif(message)
    }
    else{
    // message = "Please Ensure that all the form values are filled in correctly"
    //    this.Notif(message)
      console.log("Invalid Form");
    }
  }

  async Notif(message:string) {
    const alert = await this.alert.create({
      message: message,
      buttons: [{text: 'OK'}]
    });
  
    await alert.present();
    
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
