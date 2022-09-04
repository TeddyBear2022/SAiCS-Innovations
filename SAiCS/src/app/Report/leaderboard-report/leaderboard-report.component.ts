import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ColDef } from 'ag-grid-community';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-leaderboard-report',
  templateUrl: './leaderboard-report.component.html',
  styleUrls: ['./leaderboard-report.component.scss'],
})
export class LeaderboardReportComponent implements OnInit {
  reportForm: FormGroup;
  rowData: any = [];
  rankList: any = []
  provinceList: any =[]
  columnDefs: ColDef[] = [
    { field: 'no', headerName: '#', width: 80},
    { field: 'name', headerName: 'NAME' },
    { field: 'surname', headerName: 'SURNAME' },
    { field: 'email', headerName: 'EMAIL ADDRESS' },
    { field: 'sales', headerName: 'TOTAL SALES' },
    { field: 'province', headerName: 'PROVINCE' },
    { field: 'ranking', headerName: 'RANKING' },
  ];
  

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private alert: AlertController
  ) {
    //this.GetProductList()
  }

  ngOnInit() {
    this.GetCategories()
    this.reportForm = this.fb.group({
      ranking: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
    });
  }

  public defaultColDef: ColDef = {
    //width: 170,
    sortable: true,
    unSortIcon: true,
    wrapText: true, // <-- HERE
    autoHeight: true,
  };

  
  GetCategories()
  {
    this.api.GetProvinces().subscribe((res)=>{
      this.provinceList = res
      console.log(this.provinceList);
      
    })

    this.api.getAmbassadorRankings().subscribe((res)=>{
      this.rankList = res
      console.log(this.rankList);
      
    })
  
  }

 
  submitForm()
  {
    if(this.reportForm.valid)
    {
      let province =  this.reportForm.get('province').value 
      let ranking =  this.reportForm.get('ranking').value 
      
      this.api.TopSeller(province, ranking).subscribe((res) => {
        this.rowData = res;
        console.log(this.rowData);
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
    if(this.reportForm.valid)
    {
      this.reportForm.reset()
    var doc = new jsPDF('p', 'pt', 'A4');
    doc.setFontSize(14)
    var img = new Image();
    img.src = 'assets/SAICS no bg.png';

    autoTable(doc, {
      head: [
        [
          'NAME',
          'SURNAME',
          'EMAIL ADDRESS',
          'PROVINCE',
          'PHONE NUMBER',
          'RANKING',
        ],
      ],
      body: this.rowData.map((o) => {
        return [o.name, o.surname, o.email, o.province, o.phone, o.ranking];
      }),
      margin: { top: 110, bottom: 50 },
      didDrawPage: function (data) {
        doc.text('Ambassador List', 155,50),
        doc.text(`Generated on ${new Date().toDateString()}`, 155, 70),
          doc.addImage(img, 'png', -40, -60, 250, 250);
      },
      headStyles: {
        fillColor: '#ffffff',
        textColor: '#333333',
      },
      showHead: 'everyPage',
    });

    doc.save('Ambassador List Report.pdf');
    //window.location.reload();
  }
  else{
    this.ErrorAlert("Generate Report before exporting")
  }
  }
}
