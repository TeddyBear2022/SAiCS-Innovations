import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

<<<<<<<< HEAD:SAiCS/src/app/Client/client-special/client-special.page.spec.ts
import { ClientSpecialPage } from './client-special.page';

describe('ClientSpecialPage', () => {
  let component: ClientSpecialPage;
  let fixture: ComponentFixture<ClientSpecialPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSpecialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSpecialPage);
========
import { UpdateBankingDetailsPage } from './update-banking-details.page';

describe('UpdateBankingDetailsPage', () => {
  let component: UpdateBankingDetailsPage;
  let fixture: ComponentFixture<UpdateBankingDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBankingDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateBankingDetailsPage);
>>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/profile/update-banking-details/update-banking-details.page.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
