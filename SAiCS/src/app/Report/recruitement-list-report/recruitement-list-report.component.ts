import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ColDef } from 'ag-grid-community';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-recruitement-list-report',
  templateUrl: './recruitement-list-report.component.html',
  styleUrls: ['./recruitement-list-report.component.scss'],
})
export class RecruitementListReportComponent implements OnInit {
  reportForm: FormGroup;
  rowData: any = [];
  rankList: any = []
  provinceList: any =[]
  columnDefs: ColDef[] = [
    { field: 'ranking', headerName: 'RECRUITMENT POSITON' },
    { field: 'total', headerName: 'TOTAL REQUESTS' },
    { field: 'approved', headerName: 'TOTAL APPROVED' },
    { field: 'rejected', headerName: 'TOTAL REJECTED' },
    { field: 'pending', headerName: 'TOTAL PENDING' },
  ];


  public defaultColDef: ColDef = {
    //width: 170,
    sortable: true,
    unSortIcon: true,
    wrapText: true, // <-- HERE
    autoHeight: true,
  };
  
  constructor( private api: ApiService,
    private fb: FormBuilder,
    private alert: AlertController) { }

  ngOnInit() {
    this.reportForm = this.fb.group({
      month: new FormControl('', Validators.required),
    });
  }

  submitForm()
  {
    if(this.reportForm.valid)
    {
      let month  =  this.reportForm.get('month').value 
      
      this.api.RecruitmentRep(month).subscribe((res) => {
      this.rowData = res;
       //console.log(res);
  });

      // console.log(month);
      
    }
    else
    {
      this.ErrorAlert("Please Enter Valid Information")
    }
  }

  async ErrorAlert(message: string) {
    const alert = await this.alert.create({
      header: "Invalid Form",
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
    
  }

  download()
  {

  }
}
