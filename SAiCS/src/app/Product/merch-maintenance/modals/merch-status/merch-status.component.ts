import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-merch-status',
  templateUrl: './merch-status.component.html',
  styleUrls: ['./merch-status.component.scss'],
})
export class MerchStatusComponent implements OnInit {

  merchStatus = [];
  
  constructor(private api: ApiService, ) { }

  ngOnInit() {}

  GetMerchStatuses() {
    this.api.GetMerchStatuses().subscribe((data) => {
      this.merchStatus = data;
      console.log("Loaded statuses successfully");
    });
  }
}
