import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-maintain-vat',
  templateUrl: './maintain-vat.component.html',
  styleUrls: ['./maintain-vat.component.scss'],
})
export class MaintainVatComponent implements OnInit {
  update: FormGroup;
  vat: any;

  constructor(
    private modalCtrl: ModalController,
    private api: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.update = this.fb.group({
      vatPercentage: new FormControl('', Validators.required),
    });

    this.getVatAmount();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  getVatAmount() {
    this.api.GetVAT().subscribe((res) => {
      this.vat = res;
      this.update.controls['vatPercentage'].setValue(this.vat.amount);
      console.log(this.vat);
    });
  }

  submitForm() {
    if (this.update.valid && this.update.get('vatPercentage').value > -1) {
      console.log(this.update.get('vatPercentage').value);
      this.api
        .UpdateVAT(this.vat.id, this.update.get('vatPercentage').value)
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      console.log('invalid');
    }
  }
}
