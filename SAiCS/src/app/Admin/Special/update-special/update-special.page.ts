import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { RowSelectedEvent, SelectionChangedEvent } from 'ag-grid-community';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-update-special',
  templateUrl: './update-special.page.html',
  styleUrls: ['./update-special.page.scss'],
})
export class UpdateSpecialPage implements OnInit {
  existingSpecial: number;
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

  constructor(private router: Router,public popoverController: PopoverController,
    private api: ApiService,private fb: FormBuilder) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {existingSpecial: number};
    this.existingSpecial = state.existingSpecial;
  }

  ngOnInit() {
    this.GetSpecialOptions()
    console.log(this.existingSpecial);
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

  submitForm()
  {
    
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
