import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';
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
  session: any;
  username;
  commission:any;
  p
  p1
  p2
  
  ionCheck={isChecked:false}
  
  @ViewChild('All' ) fileInput: ElementRef;
  @ViewChild('clickOnView') clickOnView: ElementRef;

  constructor(
    private menu: MenuController,
    public popoverController: PopoverController,
    public alert: AlertController,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private tmpStorage: TemporaryStorage,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo();
    this.menu.enable(true, 'ambassador-menu');
    this.ViewSalesOrder();
    this.username = localStorage.getItem('UserName');
    this.update = this.fb.group({
      status: new FormControl('', Validators.required),
      tNumber: new FormControl('', Validators.required),
    });
    this.AmbassadorDiscount()
  }

  ionViewDidEnter() {
    document.getElementById('Pending').style.display = 'flex';
  }

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
  }

  openOrder(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(cityName).style.display = 'flex';
    evt.currentTarget.className += ' active';
  }

  ViewSalesOrder() {
    this.api.ViewSalesOrder().subscribe((res) => {
      console.log(res);
      this.orders = res;
    });

   
  }

  async AmbassadorDiscount() {
    var data = await this.api.AmbassadorDiscount(this.session[0].id).toPromise();
    var dataObj = JSON.parse(JSON.stringify(data[0].commission));
    this.commission = parseFloat(dataObj) 
    console.log(this.commission);
    
  }

  GetCommission(id:number)
  {
    let item = this.orders.find(x => x.id === id);
    return item.amount * this.commission
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
