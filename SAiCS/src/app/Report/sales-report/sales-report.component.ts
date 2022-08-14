import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
//declare var jsPDF:any;

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss'],
})
export class SalesReportComponent implements OnInit {
  rows = [];
  result = [];
  @ViewChild('myTable') table: any;
  isDesc: boolean = false;
  // columns = [
  //   { prop: 'Name', name: 'MERCHANDISE NAME' },
  //   { prop: 'Category', name: 'CATEGORY' },
  //   { prop: 'Price', name: 'UNIT PRICE' },
  //   { prop: 'Quantity', name: 'QUANTITY SOLD' },
  //   { prop: 'Total', name: 'TOTAL SALES' },
  // ];

  displayedColumns = [
    'MERCHANDISE NAME',
    'CATEGORY',
    'UNIT PRICE',
    'QUANTITY SOLD',
    'TOTAL SALES',
  ];

  getRowClass = (row) => {
    console.log('rowClass');
    return {
      'row-color': true,
    };
  };

  // USDs with $
  //pipe_$ = this.CURRENCY.transform(_., 'USD', 'symbol', '1.2-2');

  constructor(private api: ApiService, private CURRENCY: CurrencyPipe) {
    this.SalesRep();
  }

  ngOnInit() {}

  async SalesRep() {
    var data = await this.api.GetSalesRep().toPromise();
    var dataObj = JSON.parse(JSON.stringify(data));
    this.rows = dataObj
      .filter((x) => x.date == true)
      .map((x) => ({
        Name: x.merchandise,
        Category: x.category,
        Price: x.price,
        Quantity: x.quantity,
        Total: x.price * x.quantity,
      }));

    console.log(this.rows);

    var groups = new Set(this.rows.map((item) => item.Category));
    this.result = [];
    groups.forEach((g) =>
      this.result.push({
        name: g,
        values: this.rows.filter((i) => i.Category === g),
      })
    );

    console.log(this.result);
  }

  toggleExpandGroup(group) {
    console.log('Toggled Expand Group!', group);
    this.table.groupHeader.toggleExpandGroup(group);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  sortByCol(column) {
    this.result.sort((a, b) =>
      a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0
    );
  }

  async download() {
    var doc = new jsPDF('p', 'pt', 'A4');

    var img = new Image();
    img.src = 'assets/SAICS no bg.png';

    autoTable(doc, {
      head: [
        ['MERCHANDISE NAME', 'CATEGORY', 'PRICE', 'QUANTITY', 'TOTAL SALES'],
      ],
      body: this.rows.map((o) => {
        return [
          o.Name,
          o.Category,
          this.CURRENCY.transform(o.Price, 'ZAR', 'symbol-narrow'),
          o.Quantity,
          this.CURRENCY.transform(o.Total, 'ZAR', 'symbol-narrow'),
        ];
      }),
      margin: { top: 110, bottom: 50 },
      didDrawPage: function (data) {
        doc.text('Monthly Sales Report', 155, 70),
          doc.addImage(img, 'png', -40, -60, 250, 250);
      },
      headStyles:{
        fillColor: '#ffffff',
        textColor: '#333333',
      },
      showHead:  'everyPage'
    });

    doc.save('Sales Report.pdf');
    //window.location.reload();
  }
}
