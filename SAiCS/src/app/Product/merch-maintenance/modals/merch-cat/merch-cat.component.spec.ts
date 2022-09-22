import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

<<<<<<<< HEAD:SAiCS/src/app/Product/merch-maintenance/modals/merch-cat/merch-cat.component.spec.ts
import { MerchCatComponent } from './merch-cat.component';

describe('MerchCatComponent', () => {
  let component: MerchCatComponent;
  let fixture: ComponentFixture<MerchCatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchCatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MerchCatComponent);
========
import { NoRefferralCodePage } from './no-refferral-code.page';

describe('NoRefferralCodePage', () => {
  let component: NoRefferralCodePage;
  let fixture: ComponentFixture<NoRefferralCodePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoRefferralCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoRefferralCodePage);
>>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/register/modals/no-refferral-code/no-refferral-code.page.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
