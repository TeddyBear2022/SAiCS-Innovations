import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { ChartType, ChartOptions, } from 'chart.js';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-best-selling-report',
  templateUrl: './best-selling-report.component.html',
  styleUrls: ['./best-selling-report.component.scss'],
})
export class BestSellingReportComponent implements OnInit {
  merchCat: any = [];
  rowData: any = [];
  reportForm: FormGroup;
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;

  constructor(private api: ApiService,
    private cp: CurrencyPipe,
    private fb: FormBuilder,
    private alert: AlertController) { }

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

  labels = []
  data = []
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


      this.api.TopProduct(salesForm).subscribe((res) => {
        this.rowData = res;
        this.rowData.forEach(e => {
          this.labels.push(e.name)
        this.data.push(e.quantity)
        });
        
        console.log(this.rowData);
        this.createPieChart(this.labels, this.data)
      });

     
   
    } else {
      this.ErrorAlert('Please Enter Valid Information');
    }
  }

  
  createPieChart(label: any, data: any) {
    var chartExist = Chart.getChart("myChart"); // <canvas> id
    if (chartExist != undefined)  
      chartExist.destroy(); 

      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: label,
          datasets:[{
            data: data,
            backgroundColor: [
              "#f29cb9",
            ],
            hoverBackgroundColor: [
              "#f29cb9",
            ],
            borderWidth: 2,

          }]},
        options: {
          responsive: true,
          indexAxis: 'y',
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Bar Chart'
            }
          }}
      });
    // this.barChart = new Chart(this.barCanvas.nativeElement, {
    //   type: 'bar',
    //   data: {
    //     labels: [data.name],
    //     datasets: [
    //       {
    //         label: 'My First Dataset',
    //         data: [data.quantity],
    //         backgroundColor: [
    //           'rgb(255, 99, 132)',
    //           'rgb(54, 162, 235)',
    //           'rgb(255, 205, 86)',
    //         ],
    //       },
    //       ,
    //     ],
    //   },
    //   options: {
    //     indexAxis: "y",
    //     scales: {
    //       y: {
    //         type: 'linear',
    //         ticks: {
    //           color: "blue",
    //           font: {
    //             size: 24
    //           },
    //         },
    //       }
    //     }
    //   }
    // });
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
