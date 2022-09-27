import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ColDef } from 'ag-grid-community';
import { ExportService } from '../report-components/export.service';
import { PhoneNumberPipe } from 'src/app/Pipes/phone-number.pipe';

@Component({
  selector: 'app-ambassador-list-report',
  templateUrl: './ambassador-list-report.component.html',
  styleUrls: ['./ambassador-list-report.component.scss'],
})
export class AmbassadorListReportComponent implements OnInit {
  reportForm: FormGroup;
  rowData: any = [];
  rankList: any = []
  provinceList: any =[]
 

  

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private alert: AlertController,
    private excelService: ExportService,
    private phone: PhoneNumberPipe
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

  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'NAME' },
    { field: 'surname', headerName: 'SURNAME' },
    { field: 'email', headerName: 'EMAIL ADDRESS' },
    { field: 'province', headerName: 'PROVINCE' },
    { field: 'phone', headerName: 'PHONE NUMBER',
    cellRenderer: (params) => this.phone.transform(params.value) },
    { field: 'ranking', headerName: 'RANKING' },
  ];

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

    this.api.GetAmbassadorRankings().subscribe((res)=>{
      this.rankList = res
      console.log(this.rankList);
      
    })
  
  }

  get dataCount()
  {
    return this.rowData.length
  }


  submitForm()
  {
    if(this.reportForm.valid)
    {
      let province =  this.reportForm.get('province').value 
      let ranking =  this.reportForm.get('ranking').value 
      
      this.api.AmbassadorListRep(province, ranking).subscribe((res) => {
        this.rowData = res;
        console.log(this.rowData);
        
        if(this.rowData.length == 0)
        {
          this.Notif("No results")
        }
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

  async DownloadOption() {
    
    const alert = await this.alert.create({
      message: "Select Document Format",
      cssClass: 'export',
      buttons: [
        {
          text: 'MS Excel',
          cssClass: 'excel',
          handler: () => {
            this.ExportExcel()
          },
        },
        {
          text: 'PDF',
          cssClass: 'pdf',
          handler: () => {
            this.download()
          },
        },
      ],
    });

    await alert.present();
  }

  ExportExcel()
  {
    this.reportForm.reset()
    const title = 'Ambassador List Report';
    const header = ['NAME',
    'SURNAME',
    'EMAIL ADDRESS',
    'PROVINCE',
    'PHONE NUMBER',
    'RANKING',];
    let body = this.rowData.map((o) => {
      return [
        o.name, o.surname, o.email, o.province,this.phone.transform(o.phone), o.ranking
      ]}); 

    this.excelService.generateExcel(body, 'Ambassador List', title, header)
  }

  async download() {
    if(this.reportForm.valid)
    {
      this.reportForm.reset()
    var doc = new jsPDF('p', 'pt', 'A4');
    doc.setFontSize(14)
    var img = new Image();
    img.src = 'assets/SAICS no bg.png';
    var totalPagesExp = '{total_pages_count_string}'
    var username = localStorage.getItem('UserName')

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
        return [o.name, o.surname, o.email, o.province, this.phone.transform(o.phone) , o.ranking];
      }),
      margin: { top: 110, bottom: 50 },
      didDrawPage: function (data) {
        if (img) {
          doc.addImage(img, 'png', -40, -60, 250, 250);
        }
        doc.text('Ambassador List Report', 155, 70)

         // Footer
         var str = 'Page ' + (doc as any).internal.getNumberOfPages();
         // Total page number plugin only available in jspdf v1.0+
         if (typeof doc.putTotalPages === 'function') {
           str = str + ' of ' + totalPagesExp;
         }
         doc.setFontSize(10);

         // jsPDF 1.4+ uses getWidth, <1.4 uses .width
         var pageSize = doc.internal.pageSize;
         var pageHeight = pageSize.height
           ? pageSize.height
           : pageSize.getHeight();
         doc.text(str, data.settings.margin.left, pageHeight - 10);
         doc.text(
           `Generated by ${username} on ${new Date().toDateString()}`,
           data.settings.margin.left + 260,
           pageHeight - 10
         );
      },
      headStyles: {
        fillColor: '#ffffff',
        textColor: '#333333',
      },
      showHead: 'everyPage',
    });

    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }

    doc.save('Ambassador List Report.pdf');
  }
  else{
    this.ErrorAlert("Generate Report before exporting")
  }
  }


  async Notif(message:string) {
    const alert = await this.alert.create({
      message: message,
      buttons: [{text: 'OK'}]
    });
  
    await alert.present();
    
  }
}
