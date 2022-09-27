import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { AlertController } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ColDef, GridApi, RowClassParams, RowStyle } from 'ag-grid-community';
import { ExportService } from '../report-components/export.service';
//declare var jsPDF:any;

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss'],
})
export class SalesReportComponent implements OnInit {
  rowData: any = [];
  merchCat: any = [];
  reportForm: FormGroup;

  constructor(
    private api: ApiService,
    private cp: CurrencyPipe,
    private fb: FormBuilder,
    private alert: AlertController,
    private excelService: ExportService
  ) {
    // this.SalesRep();
  }

  ngOnInit() {
    this.GetMerchCat();
    this.reportForm = this.fb.group({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
    
  }

  //////////////////////////////////DATA SECTION////////////////////////////////////////////////////////
  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'MERCHANDISE NAME' },
    {
      field: 'price',
      headerName: 'UNIT PRICE',
      cellStyle: { 'text-align': 'right' },
      cellRenderer: (params) =>
        this.cp.transform(params.value, 'ZAR', 'symbol-narrow'),
    },
    {
      field: 'quantity',
      headerName: 'QUANTITY SOLD',
      cellStyle: { 'text-align': 'right' },
    },
    {
      field: 'total',
      headerName: 'TOTAL SALES',
      cellStyle: { 'text-align': 'right' },
      cellRenderer: (params) =>
        this.cp.transform(params.value, 'ZAR', 'symbol-narrow'),
    },
  ];

  public defaultColDef: ColDef = {
    //width: 170,
    sortable: true,
    unSortIcon: true,
    wrapText: true, // <-- HERE
    autoHeight: true,
  };

  public getRowStyle: (
    params: RowClassParams
  ) => RowStyle | undefined = function (
    params: RowClassParams
  ): RowStyle | undefined {
    if (params.node.rowPinned) {
      return { 'font-weight': 'bold' };
    }
  };


  rowDataUpdated(params) {
    if(this.rowData.length > 0)
    {
      let result = {
        name: 'Grand Total',
        price:0,
        quantity:0,
        total: 0
    }

    params.api.forEachNodeAfterFilter(i=>{
      result.price += Number(i.data.price);
      result.quantity += Number(i.data.quantity);
      result.total += Number(i.data.total);
  });

      console.log("grid");
      params.api.setPinnedBottomRowData([result]);

      
    }
    
    
  }

  GetMerchCat() {
    this.api.GetMerchCat().subscribe((data) => {
      this.merchCat = data;
      //console.log('Loaded categories successfully');
    });
  }

  submitForm() {
    if (
      this.reportForm.valid &&
      this.reportForm.get(['startDate']).value <=
        this.reportForm.get(['endDate']).value
    ) {
      let salesForm = {
        startDate: this.reportForm.get('startDate').value,
        endDate: this.reportForm.get('endDate').value,
        category: this.reportForm.get('category').value,
      };

      this.api.GetSalesRep(salesForm).subscribe((res) => {
        this.rowData = JSON.parse(res.body);
        if(this.rowData.length == 0)
        {
          this.Notif("No results")
        }
      });
   
    } else {
      this.ErrorAlert('Please Enter Valid Information');
    }
  }

  async ErrorAlert(message: string) {
    const alert = await this.alert.create({
      header: 'Invalid Form',
      message: message,
      buttons: [{ text: 'OK' }],
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
    const title = 'Monthly Sales Report';
    const header = ['MERCHANDISE NAME', 'PRICE', 'QUANTITY', 'TOTAL SALES'];
    let body = this.rowData.map((o) => {
      return [
        o.name,
        this.cp.transform(o.price, 'ZAR', 'symbol-narrow'),
        o.quantity,
        this.cp.transform(o.total, 'ZAR', 'symbol-narrow'),
      ]});

    this.excelService.generateExcel(body, 'Monthly Sales', title, header)
  }

  


  //////////////////////////////////DOWNLOAD SECTION////////////////////////////////////////////////////////
  async download() {
    if(this.rowData.length)
    {
      this.reportForm.reset()
    var doc = new jsPDF('p', 'pt', 'A4');
    doc.setFontSize(14);
    var img = new Image();
    img.src = 'assets/SAICS no bg.png';
    var totalPagesExp = '{total_pages_count_string}'
    var username = localStorage.getItem('UserName')

    autoTable(doc, {
      head: [
        ['MERCHANDISE NAME', 'PRICE', 'QUANTITY', 'TOTAL SALES'],
      ],
      body: this.rowData.map((o) => {
        return [
          o.name,
          this.cp.transform(o.price, 'ZAR', 'symbol-narrow'),
          o.quantity,
          this.cp.transform(o.total, 'ZAR', 'symbol-narrow'),
        ];
      }),
      margin: { top: 110, bottom: 50 },
      didDrawPage: function (data) {
        doc.setFontSize(20);
        if (img) {
          doc.addImage(img, 'png', -40, -60, 250, 250);
        }
        doc.text('Monthly Sales Report', 155, 70)
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

    doc.save('Sales Report.pdf');
    
    //window.location.reload();
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
