import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RankingModalComponent } from 'src/app/modals/ranking-modal/ranking-modal.component';


@Component({
  selector: 'app-view-ambassadors',
  templateUrl: './view-ambassadors.page.html',
  styleUrls: ['./view-ambassadors.page.scss'],
})
export class ViewAmbassadorsPage implements OnInit {

  closeResult: string;

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  RankingRequest(){
    this.rankingrequest
  }
  async rankingrequest()
  {
    const modal = await this.modal.create({
      component: RankingModalComponent,
      id: "rankingrequestClass",
    });
    modal.onDidDismiss().then(()=>{
    })
  }


}
