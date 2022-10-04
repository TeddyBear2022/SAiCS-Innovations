import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ColDef, RowClassParams, RowStyle } from 'ag-grid-community';
import { ApiService } from 'src/app/Services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { ChartType, ChartOptions, } from 'chart.js';
import Chart from 'chart.js/auto'
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recruitement-list-report',
  templateUrl: './recruitement-list-report.component.html',
  styleUrls: ['./recruitement-list-report.component.scss'],
})
export class RecruitementListReportComponent implements OnInit {
  reportForm: FormGroup;
  rowData: any = [];
  rankList: any = [];
  provinceList: any;
  columnDefs: ColDef[] = [
    { field: 'ranking', headerName: 'RECRUITMENT POSITON' },
    { field: 'total', headerName: 'TOTAL REQUESTS' },
    { field: 'approved', headerName: 'TOTAL APPROVED' },
    { field: 'rejected', headerName: 'TOTAL REJECTED' },
    { field: 'pending', headerName: 'TOTAL PENDING' },
  ];

  @ViewChild('barCanvas', {read: ElementRef, static: false}) barCanvas: ElementRef;
  barChart: any;
  
  showing = false;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.reportForm = this.fb.group({
      month: new FormControl('', Validators.required),
    });
  }
  
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
        ranking: 'Grand Total',
        total:0,
        approved:0,
        rejected: 0,
        pending: 0
    }

    params.api.forEachNodeAfterFilter(i=>{
      result.approved += Number(i.data.approved);
      result.rejected += Number(i.data.rejected);
      result.pending += Number(i.data.pending);
      result.total += Number(i.data.total);
  });

      console.log("grid");
      params.api.setPinnedBottomRowData([result]);

      
    }
    
    
  }



  submitForm() {
    if (this.reportForm.valid) {
      let month = this.reportForm.get('month').value;

      this.api.RecruitmentRep(month).subscribe((res) => {
        this.rowData = res;
        console.log(this.rowData);
        this.showing == true
        if(this.rowData.length == 0)
        {
          this.showing = false
          this.Notif("No results")
        }
        else
        {
          this.createPieChart()
        }
      });
    } else {
      this.ErrorAlert('Please Enter Valid Information');
    }
  }

  createPieChart() {
    var chartExist = Chart.getChart("myChart"); // <canvas> id
    if (chartExist != undefined)  
      chartExist.destroy(); 

      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: this.rowData.map(o => o.ranking),
          datasets: [
            {
              label: "Total Requests",
              backgroundColor: "#002855",
              data: this.rowData.map(x => x.total)
            },
            {
              label: "Approved",
              backgroundColor: "#0353a4",
              data: this.rowData.map(x => x.approved)
            },
            {
              label: "Rejected",
              backgroundColor: "#0466c8",
              data: this.rowData.map(x => x.rejected)
            },
            {
              label: "Pending",
              backgroundColor: "#788091",
              data: this.rowData.map(x => x.pending)
            },
           
            
          ]},
        options: {
          responsive: true,
          plugins:{
            legend: {
              position: 'top',
            },
          },
          scales:{
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Total Requests' }
            },
            x: {
              beginAtZero: true,
              title: { display: true, text: 'Ambassador Ranks' }
            },
          }
          }
      });
   
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
    if (this.rowData.length) {
      this.reportForm.reset();
      var doc = new jsPDF('p', 'pt', 'A4');
      doc.setFontSize(14);
      var img = new Image();
      img.src = 'assets/SAICS no bg.png';   
      var totalPagesExp = '{total_pages_count_string}'
      var username = localStorage.getItem('UserName')
    
      var canvas = document.getElementById('myChart') as HTMLCanvasElement;
      var barChartImage = canvas.toDataURL('image/png', 1.0);

      autoTable(doc, {
        head: [
          [
            'RECRUITMENT POSITON',
            'TOTAL REQUESTS',
            'TOTAL APPROVED',
            'TOTAL REJECTED',
            'TOTAL PENDING',
          ],
        ],
        body: this.rowData.map((o) => {
          return [
            o.ranking,
            o.approved,
            o.rejected,
            o.pending,
            o.total 
          ];
        }),
        margin: { top: 110, bottom: 50 },
        didDrawPage: function (data) {
          doc.setFontSize(20);
          if (img) {
            doc.addImage(img, 'png', -40, -60, 250, 250);
          }
          doc.text('Monthly Sales Report', 155, 70)
          doc.addImage(barChartImage, 'png', 90, 130, 410, 345);
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
        startY: 500
      });

      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }

      doc.save('Ambassador Recruitment Report.pdf');

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
