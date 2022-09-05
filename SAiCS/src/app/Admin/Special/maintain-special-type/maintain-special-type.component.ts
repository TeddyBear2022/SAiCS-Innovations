import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-maintain-special-type',
  templateUrl: './maintain-special-type.component.html',
  styleUrls: ['./maintain-special-type.component.scss'],
})
export class MaintainSpecialTypeComponent implements OnInit {

  update: FormGroup;
  type: any;
  specialTypes: any = [];
  constructor( private modalCtrl: ModalController,
    private api: ApiService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.update = this.fb.group({
      typeName: new FormControl('', Validators.required),
    });

  }

  GetInfo()
  {
      this.api.GetSpecialTypes().subscribe(res => {
        this.specialTypes = res
      })

  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  submitForm()
  {
    if (this.update.valid) {
      console.log(this.update.get('typeName').value);
      
    } else {
      console.log('invalid');
    }
  }
}
