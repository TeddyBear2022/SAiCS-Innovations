import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ColDef } from 'ag-grid-community';
import { ApiService } from 'src/app/Services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

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

  async download() {
    if(this.rowData.length)
    {
      this.reportForm.reset()
    var doc = new jsPDF('p', 'pt', 'A4');
    doc.setFontSize(14);
    var img = new Image();
    img.src = 'assets/SAICS no bg.png';

    
    // { field: 'ranking', headerName: 'RECRUITMENT POSITON' },
    // { field: 'total', headerName: 'TOTAL REQUESTS' },
    // { field: 'approved', headerName: 'TOTAL APPROVED' },
    // { field: 'rejected', headerName: 'TOTAL REJECTED' },
    // { field: 'pending', headerName: 'TOTAL PENDING' },
    autoTable(doc, {
      head: [
        ['RECRUITMENT POSITON', 'TOTAL REQUESTS' , 'TOTAL APPROVED', 'TOTAL REJECTED', 'TOTAL PENDING'  ],
      ],
      body: this.rowData.map((o) => {
        return [
          o.name,
      
        ];
      }),
      margin: { top: 110, bottom: 50 },
      didDrawPage: function (data) {
        doc.text('Monthly Sales Report', 155, 50),
        doc.text(`Generated on ${new Date().toDateString()}`, 155, 70),
        doc.addImage(img, 'png', -40, -60, 250, 250);
      },
      headStyles: {
        fillColor: '#ffffff',
        textColor: '#333333',
      },
      showHead: 'everyPage',
    });

    doc.save('Sales Report.pdf');
    
    //window.location.reload();
  }
  else{
    this.ErrorAlert("Generate Report before exporting")
  }
}


}
