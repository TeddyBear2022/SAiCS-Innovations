import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ColDef } from 'ag-grid-community';
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

  constructor(
    private api: ApiService,
    private cp: CurrencyPipe,
    private fb: FormBuilder,
    private alert: AlertController
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

  GetMerchCat() {
    this.api.GetMerchCat().subscribe((data) => {
      this.merchCat = data;
      console.log('Loaded categories successfully');
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
        console.log(this.rowData);
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

  async download() {
    if(this.rowData.length)
    {
      this.reportForm.reset()
    var doc = new jsPDF('p', 'pt', 'A4');
    doc.setFontSize(14);
    var img = new Image();
    img.src = 'assets/SAICS no bg.png';

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
