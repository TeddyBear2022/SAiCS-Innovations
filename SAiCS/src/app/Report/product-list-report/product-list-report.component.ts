import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { CurrencyPipe } from '@angular/common';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-product-list-report',
  templateUrl: './product-list-report.component.html',
  styleUrls: ['./product-list-report.component.scss'],
})
export class ProductListReportComponent implements OnInit {

  rows = [];
  temp = [];
  allRows = [];
  rowData: any= [];
  
  constructor(private api: ApiService, private cp: CurrencyPipe) {
    
   }
   columnDefs: ColDef[] = [
    {headerName: 'ID', field: 'id', width: 80},
		{headerName: 'ITEM', field: 'item', width: 130},
		{headerName: 'DESCRIPTION', field: 'description', wrapText: true, autoHeight: true, width: 250},
		{headerName: 'MERCHANDISE TYPE', field: 'merchType'},
    {headerName: 'MERCHANDISE CATEGORY', field: 'merchCat'},
    {headerName: 'UNIT PRICE', field: 'unitPrice', width: 110, 
    cellStyle: { 'text-align': "right" },
    cellRenderer: (params) => this.cp.transform(params.value, 'ZAR', 'symbol-narrow')},
    {headerName: 'STATUS', field: 'status', width: 120},
	];

  public defaultColDef: ColDef = {
    //width: 170,
    sortable: true,
    unSortIcon: true,
    wrapText: true,     // <-- HERE
    autoHeight: true,
  };

  // columns = [
  //   {prop: 'id', name: 'ID' }, 
  //   {prop: 'item', name: 'ITEM' },
  //   { prop: 'description', name: 'DESCRIPTION' },
  //   { prop: 'merchType', name: 'MERCHANDISE TYPE' },
  //   { prop: 'merchCat', name: 'MERCHANDISE CATEGORY' },
  //   {prop: 'unitPrice', name: 'UNIT PRICE' },
  //   { prop: 'status', name: 'STATUS' } ];


  ngOnInit() {
    this.GetProductList()
    
  }

  GetProductList()
  {
  //  var data = await this.api.ProductListRep().toPromise()
  //  var dataObj = JSON.parse(JSON.stringify(data));
   
  //  this.rows = dataObj 
  //  this.temp = dataObj 
   //console.log(this.productlist)

   this.api.ProductListRep().subscribe(res =>
    {
      this.rowData =res
      console.log(this.rowData);
    })
  }

  previousTypeFilter = ''
  previousCatFilter = ''

  onTypeSearch(event: Event)
  {
   //let nes = [] 
    
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    if(value != " ")
    {
      this.rows = this.filterRows(value, this.previousCatFilter)
    }
    else
    {
      this.GetProductList()
    }
    
  }

  onCatSearch(event: Event)
  {
   //let nes = [] 
    
    const value = (event.target as HTMLInputElement).value.toLowerCase();

    if(value != " "){
      this.rows = this.filterRows(this.previousTypeFilter,value)
    }
    else{
      this.GetProductList()
    }
    
    
  }

  filterRows(filterType, filterCat): any[]
  {
    return this.temp.filter(x => {
    if(filterCat === " " && filterCat === " ")
    {
      this.rows = this.allRows
    }
    else{
      return x.merchCat.toLowerCase() === filterCat || x.merchType.toLowerCase() === filterType
    }})
  }


  // sortByCol(column) {
  //   this.rows.sort((a, b) =>
  //     a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0
  //   );
  // }

  async download() {
    var doc = new jsPDF('p', 'pt', 'A4');

    var img = new Image();
    img.src = 'assets/SAICS no bg.png';

    autoTable(doc, {
      head: [
        ['ID', 'ITEM', 'DESCRIPTION', 'MERCHANDISE TYPE', 'MERCHANDISE CATEGORY','UNIT PRICE','STATUS'],
      ],
      body: this.rows.map((o) => {
        return [
          o.id,
          o.item,
          o.description,
          o.merchType,
          o.merchCat,
          this.cp.transform(o.unitPrice, 'ZAR', 'symbol-narrow'),
          o.status
        ];
      }),
      margin: { top: 110, bottom: 50 },
      didDrawPage: function (data) {
        doc.text('Product List Report', 155, 70),
          doc.addImage(img, 'png', -40, -60, 250, 250);
      },
      headStyles:{
        fillColor: '#ffffff',
        textColor: '#333333',
      },
      showHead:  'everyPage'
    });

    doc.save('Product List Report.pdf');
    //window.location.reload();
  }
}
