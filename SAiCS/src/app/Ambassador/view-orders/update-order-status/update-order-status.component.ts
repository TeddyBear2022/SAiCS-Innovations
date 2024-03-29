import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { uOrderStatusVM } from 'src/app/Models/ViewModels/uOrderStatusVM';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-update-order-status',
  templateUrl: './update-order-status.component.html',
  styleUrls: ['./update-order-status.component.scss'],
})
export class UpdateOrderStatusComponent implements OnInit {
  @Input() id: number;
  info: any;
  ionCheck = { isChecked: false };
  //item = {};
  update: FormGroup;
  orderStats: any = [];

  constructor(
    private modalCtrl: ModalController,
    private api: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    
    this.loadInfo(this.id);
    this.loadStatuses();
    this.update = this.fb.group({
      status: new FormControl('', Validators.required),
      tNumber: new FormControl('', Validators.required)
    });

    

    
  }

  loadInfo(id: number) {

    this.api.SalesOrderById(id).subscribe((res) => {
      this.info = res;
      console.log(this.info);
      this.update.get('status').setValue(this.info.orderStatusId);
      this.update.get('tNumber').setValue(this.info.trackingNumber);

      if (this.info.delivery == null) this.ionCheck.isChecked = false;
      else this.ionCheck.isChecked = true;
    });
  }

  loadStatuses() {
    this.api.GetAllOrderStatuses().subscribe((res) => {
      this.orderStats = res;
      console.log(this.orderStats);
    });
  }

  submitForm()
  {
    if(this.ionCheck.isChecked == false) 
      {
       this.update.get('tNumber').clearValidators();
       this.update.get('tNumber').updateValueAndValidity();
      }

    if(this.update.valid)
    {
      let order = {} as uOrderStatusVM;
      order.orderId = this.info.id
      order.orderStatusId = this.update.value.status 
      if(this.info.delivery != null)
      {
        order.checked = true
        order.deliveryId = this.info.delivery
        order.trackingNumber = this.update.value.tNumber 
      }
      
      
      this.api.UpdateSalesOrderStatus(order).subscribe((res) =>{
        console.log(res.body);
        
        if(res.body == "true")
        {
          if(order.trackingNumber)
          {
            
            this.api.OrderStatusTracking(this.info.email, this.info.id, order.trackingNumber).subscribe()
          }
          else{
            this.api.OrderStatusEmail(this.info.email, this.info.id).subscribe()
          }
        this.dismissModal()
        }
        this.update.get('tNumber').setValidators(Validators.required);
      this.update.get('tNumber').updateValueAndValidity();
      })

      
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
