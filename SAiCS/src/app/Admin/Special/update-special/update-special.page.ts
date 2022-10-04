import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { AgGridAngular } from 'ag-grid-angular';
import { RowSelectedEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Special } from 'src/app/Models/Special';
import { SpecialVM } from 'src/app/Models/ViewModels/SpecialVM';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-update-special',
  templateUrl: './update-special.page.html',
  styleUrls: ['./update-special.page.scss'],
})
export class UpdateSpecialPage implements OnInit {
  existingSpecial: number;
  username;
  columnDefs = [
    {
      headerName: 'Item',
      field: 'item',
      cellRenderer: (params) =>
        `<img style="height: 42px; width: 42px; margin-top: 5%;" src="data:image/png;base64,${params.value}" />`,
    },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Status', field: 'status' },
  ];

  rowData: any = [];
  specialItemsArr = [];
  @ViewChild('specialGrid') grid!: AgGridAngular;
  addForm: FormGroup;
  selectedFile: any;
  specialTypes: any = [];
  rowSelection: 'single' | 'multiple' = 'multiple';
  selectedRow: any;
  setData: any;

  constructor(
    private router: Router,
    public popoverController: PopoverController,
    private api: ApiService,
    private fb: FormBuilder,
    private alert: AlertController,
    private menu:MenuController
  ) {
    this.existingSpecial = JSON.parse(localStorage.getItem('UpdateId'));
  }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.username = localStorage.getItem('UserName')
    this.GetSpecialOptions();
    this.GetSpecialById(this.existingSpecial);

    this.addForm = this.fb.group({
      sName: new FormControl('', Validators.required),
      sType: new FormControl('', Validators.required),
      sImage: new FormControl(''),
      sDescription: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', [Validators.required]),
      sPrice: new FormControl('', Validators.required),
    });
  }

  GetSpecialById(id: number) {
    this.api.GetSpecialById(id).subscribe((data) => {
      this.setData = data;
      console.log(this.setData);
      this.addForm.controls['sName'].setValue(this.setData.name);
      this.addForm.controls['sType'].setValue(this.setData.typeId);
      this.addForm.controls['sDescription'].setValue(this.setData.description);
      this.addForm.controls['sPrice'].setValue(this.setData.price);
      this.addForm.controls['startDate'].setValue(
        formatDate(this.setData.startDate, 'yyyy-MM-dd', 'en')
      );
      this.addForm.controls['endDate'].setValue(
        formatDate(this.setData.endDate, 'yyyy-MM-dd', 'en')
      );
    });
  }

  onFirstDataRendered(params) {
    this.setData.merchandise.forEach((e) => {
      params.api.forEachNode(function (node) {
        if (node.data.name === e) {
          node.setSelected(true);
        }
      });
    });
  }

  GetSpecialOptions() {
    this.api.GetSpecialOptions().subscribe((res) => {
      this.rowData = res;
      console.log(this.rowData);
    });

    this.api.GetSpecialTypes().subscribe((res) => {
      this.specialTypes = res;
    });
  }

  submitForm() {
    let message = '';

    if (
      this.addForm.valid &&
      this.specialItemsArr.length > 0 &&
      this.addForm.get(['startDate']).value <=
        this.addForm.get(['endDate']).value
    ) {
      let nSpecial = {} as Special;
      nSpecial.specialId = this.existingSpecial;
      nSpecial.specialName = this.addForm.value.sName;
      nSpecial.specialImage = this.selectedFile;
      nSpecial.specialTypeId = this.addForm.value.sType;
      nSpecial.description = this.addForm.value.sDescription;
      nSpecial.price = this.addForm.value.sPrice;
      nSpecial.startDate = this.addForm.value.startDate;
      nSpecial.endDate = this.addForm.value.endDate;

      let vmSpecial = {} as SpecialVM;
      vmSpecial.Special = nSpecial;
      vmSpecial.SpecialItems = this.specialItemsArr;

      this.api.UpdateSpecial(vmSpecial).subscribe((res) => {
        console.log(res.body);
        if (res.body == 'Updated') {
          this.addForm.reset();
          localStorage.removeItem('UpdateId');
          history.back();
        }
      });
    } else if (
      this.addForm.valid &&
      this.specialItemsArr.length > 0 &&
      this.addForm.get(['startDate']).value >
        this.addForm.get(['endDate']).value
    ) {
      message =
        'Please ensure that the start and end date are in the correct format';
      this.Notif(message);
    } else {
      console.log('invalid form');
    }
  }

  
  compareDates(event) {
    // Create date from input value
   var inputDate = new Date(this.addForm.value.endDate);

// Get today's date
var todaysDate = new Date();

// call setHours to take the time out of the comparison
if(inputDate.setHours(0,0,0,0) >= todaysDate.setHours(0,0,0,0)) {
    console.log("Works");
    console.log(inputDate);
}
else
{
  let control = this.addForm.controls['endDate'];
  control.setErrors({invalid: true});
  control.markAsDirty()
  console.log("error");
  this.Notif("Please enter an end date that is equal to or greater than the current date")
  
}
  }

  //convert image to base64
  onFileSelected(event) {
    let file = event.target.files[0];
    if(file.type == "image/png" || file.type == "image/jpeg" || file.type == "image/jpg")
    {
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
    else
    {
      this.Notif(`Incorrect file format. Please select a png, jpg or jpeg file.`)
      console.log(`Incorrect Format: ${file.type}`);
      this.addForm.controls['sImage'].setValue(null);
      
    }
  
  }

  onRowSelected(event: RowSelectedEvent) {
    if (event.node.isSelected()) {
      console.log(event.node.data.name);
      this.specialItemsArr.push({
        name: event.node.data.name,
      });
    } else {
      console.log('Has been deselected');
      this.specialItemsArr = this.specialItemsArr.filter(
        (x) => x.name !== event.node.data.name
      );
    }
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    var rowCount = event.api.getSelectedNodes().length;
    console.log('selection changed, ' + rowCount + ' rows selected');
  }

  RemoveItem(name) {
    this.grid.api.forEachNode(
      function (node) {
        if (node.data.name === name) {
          node.setSelected(false);
        }
      }.bind(this)
    );
  }

  Return() {
    localStorage.removeItem('UpdateId');
    this.router.navigate(['/view-special']);
  }

  async Notif(message: string) {
    const alert = await this.alert.create({
      message: message,
      buttons: [{ text: 'OK' }],
    });

    await alert.present();
  }

  //Profile popover
  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
