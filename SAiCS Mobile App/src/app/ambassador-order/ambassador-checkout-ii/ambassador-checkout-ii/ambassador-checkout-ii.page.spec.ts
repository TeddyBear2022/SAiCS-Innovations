import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmbassadorCheckoutIiPage } from './ambassador-checkout-ii.page';

describe('AmbassadorCheckoutIiPage', () => {
  let component: AmbassadorCheckoutIiPage;
  let fixture: ComponentFixture<AmbassadorCheckoutIiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbassadorCheckoutIiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmbassadorCheckoutIiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
