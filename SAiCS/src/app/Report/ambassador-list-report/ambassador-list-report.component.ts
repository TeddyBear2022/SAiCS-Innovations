import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-ambassador-list-report',
  templateUrl: './ambassador-list-report.component.html',
  styleUrls: ['./ambassador-list-report.component.scss'],
})
export class AmbassadorListReportComponent implements OnInit {
  rows = [];
  temp = [];

  columns = [
    {prop: 'name', name: 'NAME' }, 
    {prop: 'surname', name: 'SURNAME' },
    { prop: 'email', name: 'EMAIL ADDRESS' },
    { prop: 'province', name: 'PROVINCE' },
    { prop: 'phone', name: 'PHONE NUMBER' },
    {prop: 'ranking', name: 'RANKING' } ];

  constructor(private api: ApiService) {
    this.GetProductList()
   }

  ngOnInit() {}

  async GetProductList()
  {
   var data = await this.api.AmbassadorListRep().toPromise()
   var dataObj = JSON.parse(JSON.stringify(data));
   
   this.rows = dataObj 
   this.temp = this.rows 
   //console.log(this.productlist)
  }

  sortByCol(column) {
    this.rows.sort((a, b) =>
      a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0
    );
  }

  async download() {
    var doc = new jsPDF('p', 'pt', 'A4');

    var img = new Image();
    img.src = 'assets/SAICS no bg.png';

    autoTable(doc, {
      head: [
        ['NAME', 'SURNAME', 'EMAIL ADDRESS', 'PROVINCE', 'PHONE NUMBER', 'RANKING'],
      ],
      body: this.rows.map((o) => {
        return [
          o.name,
          o.surname,
          o.email,
          o.province,
          o.phone,
          o.ranking
        ];
      }),
      margin: { top: 110, bottom: 50 },
      didDrawPage: function (data) {
        doc.text('Ambassador List', 155, 70),
          doc.addImage(img, 'png', -40, -60, 250, 250);
      },
      headStyles:{
        fillColor: '#ffffff',
        textColor: '#333333',
      },
      showHead:  'everyPage'
    });

    doc.save('Ambassador List Report.pdf');
    //window.location.reload();
  }

}
