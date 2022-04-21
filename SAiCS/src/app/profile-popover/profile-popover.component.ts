import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  viewProfile()
  {
    window.open('/profile', '_self')
    this.popoverController.dismiss();
  }

  close()
  {
    this.popoverController.dismiss();
  }
}
