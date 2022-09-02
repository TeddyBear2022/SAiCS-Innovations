import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  MenuController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { uOrderStatusVM } from 'src/app/Models/ViewModels/uOrderStatusVM';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { UpdateOrderStatusComponent } from '../update-order-status/update-order-status.component';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.page.html',
  styleUrls: ['./view-orders.page.scss'],
})
export class ViewOrdersPage implements OnInit {
  update: FormGroup;
  orders: any = [];
  orderStats: any = []
  isModalOpen = false;
  item = {};
  
  ionCheck={isChecked:false}

  constructor(
    private menu: MenuController,
    public popoverController: PopoverController,
    public alert: AlertController,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    this.ViewSalesOrder();

    this.update = this.fb.group({
      status: new FormControl('', Validators.required),
      tNumber: new FormControl('', Validators.required),
    });
  }

  ViewSalesOrder() {
    this.api.ViewSalesOrder().subscribe((res) => {
      console.log(res);
      this.orders = res;
    });

   
  }

  ViewOrderDetail(id: number) {
    localStorage.setItem('SalesOrderDetails', JSON.stringify(id));
    this.router.navigate(['/view-order-details']);
  }

 
  // GetOrderById(id: number) {
 

    
  // }

  async setOpen(id: number) {
    const modal = await this.modalCtrl.create({
      component: UpdateOrderStatusComponent,
      componentProps: {
       id: id
      },
      cssClass: 'customModal'
    });
    await modal.present();
  }
    // this.isModalOpen = isOpen;

    // if(this.isModalOpen == true)
    // {
    //   let info: any;
    //   this.api.SalesOrderDetails(id).subscribe((res) => {
    //     info = res;
  
    //     if(info.delivery == null)
    //       this.ionCheck.isChecked = false
    //     else
    //     this.ionCheck.isChecked = true
  
  
    //     this.item = {
    //       id: info.id,
    //       delivery: info.delivery,
    //       orderStatus: info.orderStatus,
    //     };
    //   });
    // }
    
  //}

  returnFalse()
  {
    this.ionCheck.isChecked = false
  }



  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
