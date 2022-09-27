import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { CellClassRules, ColDef, RowClassParams, RowStyle } from 'ag-grid-community';
import { ExportService } from '../report-components/export.service';

@Component({
  selector: 'app-target-report',
  templateUrl: './target-report.component.html',
  styleUrls: ['./target-report.component.scss'],
})
export class TargetReportComponent implements OnInit {
  rowData: any = [];
  reportForm: FormGroup;

  ragCellClassRules: CellClassRules = {
    'above-target': (params) => params.value < 0,
    'below-target': (params) => params.value > 0,
  };

  columnDefs: ColDef[] = [
    { field: 'distributor', headerName: 'DISTRIBUTOR' },
    {
      field: 'ambassador',
      headerName: 'TOTAL AMBASSADORS (ASSOCIATED)',
      cellStyle: { 'text-align': 'right' },
    },
    {
      field: 'target',
      headerName: 'TARGET',
      cellStyle: { 'text-align': 'right' },
      cellRenderer: (params) =>
        this.cp.transform(params.value, 'ZAR', 'symbol-narrow'),
    },
    {
      field: 'sales',
      headerName: 'ACTUAL SALES',
      cellStyle: { 'text-align': 'right' },
      cellRenderer: (params) =>
        this.cp.transform(params.value, 'ZAR', 'symbol-narrow'),
    },
    {
      field: 'remaining',
      headerName: 'REMAINING SALES',
      cellClassRules:{
        'above-target': 'remaining < 0',
        'below-target': 'remaining > 0',
      },
      cellStyle: params => params.value > 0 ? { color: '#f44336', 'text-align': 'right' } : { color: '#199d00', 'text-align': 'right' },
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

  
  constructor(
    private api: ApiService,
    private cp: CurrencyPipe,
    private fb: FormBuilder,
    private alert: AlertController,
    private excelService: ExportService
  ) {}

  ngOnInit() {
    this.reportForm = this.fb.group({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    });
  }

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
        distributor: 'Grand Total',
        ambassador: 0,
        target:0,
        sales:0,
        remaining: 0
    }

    params.api.forEachNodeAfterFilter(i=>{
      result.ambassador += Number(i.data.ambassador);
      result.target += Number(i.data.target);
      result.sales += Number(i.data.sales);
      result.remaining += Number(i.data.remaining);
  });

      console.log("grid");
      params.api.setPinnedBottomRowData([result]);

      
    }
    
    
  }


 

  submitForm() {
    if (
      this.reportForm.valid &&
      this.reportForm.get(['startDate']).value <=
        this.reportForm.get(['endDate']).value
    ) {
      let From = this.reportForm.get('startDate').value;
      let To = this.reportForm.get('endDate').value;

      console.log('WORKS!');
      this.api.TargetRep(From, To).subscribe((res) => {
        console.log(res);
        this.rowData = res;

        if(this.rowData.length == 0)
        {
          this.Notif("No results")
        }

      });
    } else {
      this.ErrorAlert('Please Enter Valid Information');
    }
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
  {this.reportForm.reset()
    const title = 'Target Report';
    const header = ['DISTRIBUTOR', 'TOTAL AMBASSADORS (ASSOCIATED)', 'TARGET', 'ACTUAL SALES','REMAINING SALES'];
    let body = this.rowData.map((o) => {
      return [
        o.distributor,
        o.ambassador,
        this.cp.transform(o.target, 'ZAR', 'symbol-narrow'),
        this.cp.transform(o.sales, 'ZAR', 'symbol-narrow'),
        this.cp.transform(o.remaining, 'ZAR', 'symbol-narrow'),
      ]});

    this.excelService.generateExcel(body, 'Target Report', title, header)
  }

  async download() {
    if (this.rowData.length) {
      this.reportForm.reset()
      var doc = new jsPDF('p', 'pt', 'A4');
      doc.setFontSize(14);
      var img = new Image();
      img.src = 'assets/SAICS no bg.png';
      var totalPagesExp = '{total_pages_count_string}'
      var username = localStorage.getItem('UserName')
  


      autoTable(doc, {
        head: [['DISTRIBUTOR', 'TOTAL AMBASSADORS (ASSOCIATED)', 'TARGET', 'ACTUAL SALES','REMAINING SALES']],
        body: this.rowData.map((o) => {
          return [
            o.distributor,
            o.ambassador,
            this.cp.transform(o.target, 'ZAR', 'symbol-narrow'),
            this.cp.transform(o.sales, 'ZAR', 'symbol-narrow'),
            this.cp.transform(o.remaining, 'ZAR', 'symbol-narrow'),
          ];
        }),
        margin: { top: 110, bottom: 50 },
        didDrawPage: function (data) {
          doc.setFontSize(20);
          if (img) {
            doc.addImage(img, 'png', -40, -60, 250, 250);
          }
          doc.text('Target Report', 155, 70)

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

      doc.save('Target Report.pdf');

      //window.location.reload();
    } else {
      this.ErrorAlert('Target Report');
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

  async Notif(message:string) {
    const alert = await this.alert.create({
      message: message,
      buttons: [{text: 'OK'}]
    });
  
    await alert.present();
    
  }
}
