import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

<<<<<<<< HEAD:SAiCS/src/app/ambassador-order/ambassador-checkout/edit-address/edit-address.page.spec.ts
import { EditAddressPage } from './edit-address.page';

describe('EditAddressPage', () => {
  let component: EditAddressPage;
  let fixture: ComponentFixture<EditAddressPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAddressPage);
========
import { BankingDetailsPage } from './banking-details.page';

describe('BankingDetailsPage', () => {
  let component: BankingDetailsPage;
  let fixture: ComponentFixture<BankingDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BankingDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BankingDetailsPage);
>>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/register/banking-details/banking-details.page.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
