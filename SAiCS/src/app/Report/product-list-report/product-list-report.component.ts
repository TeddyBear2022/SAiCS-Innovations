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
    private alert:AlertController
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

  LoggedInName()
  {
    this.api.LoggedInName().subscribe((res) =>{console.log(res);
    })
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

  get dataCount()
  {
    return this.rowData.length
  }

  submitForm() 
  {
    if(this.reportForm.valid)
    {
      let type =  this.reportForm.get('merchTypeId').value 
      let category =  this.reportForm.get('merchCatId').value 
      
      this.api.ProductListRep(type, category).subscribe((res) => {
        this.rowData = res;
        console.log(this.rowData);
  });

  this.reportForm.reset()
      
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
    this.reportForm.reset();
    
    var doc = new jsPDF('p', 'pt', 'A4');
    doc.setFontSize(14)
    var img = new Image();
    img.src = 'assets/SAICS no bg.png';


    autoTable(doc, {
      head: [
        [-
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
        doc.text('Product List Report', 155, 50),
        doc.text(`Generated on ${new Date().toDateString()}`, 155, 70),
        doc.addImage(img, 'png', -40, -60, 250, 250);
      },
      headStyles: {
        fillColor: '#ffffff',
        textColor: '#333333',
        
      },
      showHead: 'everyPage',
    });

    doc.save('Product List Report.pdf');
    //window.location.reload();
  }
  else{
    this.ErrorAlert("Generate Report before exporting")
  }
}

}
