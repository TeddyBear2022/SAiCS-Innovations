import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { CurrencyPipe } from '@angular/common';
import { ColDef } from 'ag-grid-community';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ExportService } from '../report-components/export.service';

@Component({
  selector: 'app-product-list-report',
  templateUrl: './product-list-report.component.html',
  styleUrls: ['./product-list-report.component.scss'],
})
export class ProductListReportComponent implements OnInit {
  reportForm: FormGroup;
  rowData: any = [];
  merchCat = [];
  merchTypes = [];

  constructor(
    private api: ApiService,
    private cp: CurrencyPipe,
    private fb: FormBuilder,
    private alert: AlertController,
    private excelService: ExportService
  ) {}
  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id', width: 80 },
    { headerName: 'ITEM', field: 'item', width: 130 },
    {
      headerName: 'DESCRIPTION',
      field: 'description',
      wrapText: true,
      autoHeight: true,
      width: 250,
    },
    { headerName: 'MERCHANDISE TYPE', field: 'merchType' },
    { headerName: 'MERCHANDISE CATEGORY', field: 'merchCat' },
    {
      headerName: 'UNIT PRICE',
      field: 'unitPrice',
      width: 110,
      cellStyle: { 'text-align': 'right' },
      cellRenderer: (params) =>
        this.cp.transform(params.value, 'ZAR', 'symbol-narrow'),
    },
    { headerName: 'STATUS', field: 'status', width: 120 },
  ];

  public defaultColDef: ColDef = {
    //width: 170,
    sortable: true,
    unSortIcon: true,
    wrapText: true, // <-- HERE
    autoHeight: true,
  };

  ngOnInit() {
    this.GetMerchTypes();
    this.GetMerchCat();
    //this.GetProductList();
    //this.LoggedInName()
    this.reportForm = this.fb.group({
      merchTypeId: new FormControl('', Validators.required),
      merchCatId: new FormControl('', Validators.required),
    });
  }


  GetMerchTypes() {
    this.api.GetMerchTypes().subscribe((data) => {
      this.merchTypes = data;
      console.log('Loaded types successfully');
    });
  }

  GetMerchCat() {
    this.api.GetMerchCat().subscribe((data) => {
      this.merchCat = data;
      console.log(this.merchCat);
    });
  }

  get dataCount() {
    return this.rowData.length;
  }

  submitForm() {
    if (this.reportForm.valid) {
      let type = this.reportForm.get('merchTypeId').value;
      let category = this.reportForm.get('merchCatId').value;

      this.api.ProductListRep(type, category).subscribe((res) => {
        this.rowData = res;
        if(this.rowData.length == 0)
        {
          this.Notif("No results")
        }
      });

      this.reportForm.reset();
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
    const title = 'Product List Report';
    const header = ['ID',
    'ITEM',
    'DESCRIPTION',
    'MERCHANDISE TYPE',
    'MERCHANDISE CATEGORY',
    'UNIT PRICE',
    'STATUS',];
    let body = this.rowData.map((o) => {
      return [
        o.id,
            o.item,
            o.description,
            o.merchType,
            o.merchCat,
            this.cp.transform(o.unitPrice, 'ZAR', 'symbol-narrow'),
            o.status,
      ]});

    this.excelService.generateExcel(body, 'Product List', title, header)
  }

  async download() {
    if (this.rowData.length) {
      this.reportForm.reset();

      var doc = new jsPDF('p', 'pt', 'A4');
      doc.setFontSize(14);
      var img = new Image();
      img.src = 'assets/SAICS no bg.png';
      var totalPagesExp = '{total_pages_count_string}';
      var username = localStorage.getItem('UserName')

      autoTable(doc, {
        head: [
          [
            'ID',
            'ITEM',
            'DESCRIPTION',
            'MERCHANDISE TYPE',
            'MERCHANDISE CATEGORY',
            'UNIT PRICE',
            'STATUS',
          ],
        ],
        body: this.rowData.map((o) => {
          return [
            o.id,
            o.item,
            o.description,
            o.merchType,
            o.merchCat,
            this.cp.transform(o.unitPrice, 'ZAR', 'symbol-narrow'),
            o.status,
          ];
        }),
        margin: { top: 110, bottom: 50 },
        didDrawPage: function (data) {
          doc.setFontSize(20);

          //doc.text(`Generated on ${new Date().toDateString()}`, 155, 70)
          if (img) {
            doc.addImage(img, 'png', -40, -60, 250, 250);
          }
          doc.text('Product List Report', 155, 70);

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

      doc.save('Product List Report.pdf');
      //window.location.reload();
    } else {
      this.ErrorAlert('Generate Report before exporting');
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
