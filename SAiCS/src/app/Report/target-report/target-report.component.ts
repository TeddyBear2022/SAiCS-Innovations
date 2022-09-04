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
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-target-report',
  templateUrl: './target-report.component.html',
  styleUrls: ['./target-report.component.scss'],
})
export class TargetReportComponent implements OnInit {
  rowData: any = [];
  reportForm: FormGroup;
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
  ) {}

  ngOnInit() {
    this.reportForm = this.fb.group({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
    });
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
      });
    } else {
      this.ErrorAlert('Please Enter Valid Information');
    }
    // let province = this.reportForm.get('province').value;
    // let ranking = this.reportForm.get('ranking').value;

    // this.api.AmbassadorListRep(province, ranking).subscribe((res) => {
    //   this.rowData = res;
    //   console.log(this.rowData);
    // });
  }

  async download() {
    if (this.rowData.length) {
      this.reportForm.reset();
      var doc = new jsPDF('p', 'pt', 'A4');
      doc.setFontSize(14);
      var img = new Image();
      img.src = 'assets/SAICS no bg.png';

      // {distributor: 'Kanye West', ambassador: 6, target: 500, sales: 524.85, remaining: -24.85

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
          doc.text('Target Report', 155, 50),
            doc.text(`Generated on ${new Date().toDateString()}`, 155, 70),
            doc.addImage(img, 'png', -40, -60, 250, 250);
        },
        headStyles: {
          fillColor: '#ffffff',
          textColor: '#333333',
        },
        showHead: 'everyPage',
      });

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
}
