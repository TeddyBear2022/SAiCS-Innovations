import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { GridApi, RowSelectedEvent, SelectionChangedEvent } from 'ag-grid-community';

@Component({
  selector: 'app-add-special',
  templateUrl: './add-special.page.html',
  styleUrls: ['./add-special.page.scss'],
})
export class AddSpecialPage implements OnInit {
  private gridApi: GridApi;

  columnDefs = [
		{headerName: 'Item', field: 'item' , 
    cellRenderer: (params) => `<img style="height: 42px; width: 42px; margin-top: 5%;" src="data:image/png;base64,${params.value}" />`
  },
		{headerName: 'Name', field: 'name' },
		{headerName: 'Status', field: 'status'}
	];

	rowData: any= [];

  rowSelection: 'single' | 'multiple' = 'multiple';
  selectedRow: any;
  constructor(public popoverController: PopoverController, private api: ApiService) { }

  ngOnInit() {
    this.GetSpecialOptions()
  }


  GetSpecialOptions()
  {
    // var data = await  this.api.GetSpecialOptions().toPromise() 
    // var dataObj = JSON.parse(JSON.stringify(data)); 
   
    // dataObj.forEach(el => {
      

    //   return this.rowData.push({
    //     item: el.item,
    //     name: el.name,
    //     status: el.status
    //   });
    //   });

    this.api.GetSpecialOptions().subscribe(res =>
      {
        this.rowData =res
        console.log(this.rowData);
      })
      
      
      
    
  }

  onRowSelected(event: RowSelectedEvent) {
    if(event.node.isSelected())
    {
      console.log(event.node.data.name);
    }
    else
    {
      console.log('Has been deselected');
      
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
