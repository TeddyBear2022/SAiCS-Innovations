import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewOrderhistoryDetailsComponent } from './view-orderhistory-details.component';

describe('ViewOrderhistoryDetailsComponent', () => {
  let component: ViewOrderhistoryDetailsComponent;
  let fixture: ComponentFixture<ViewOrderhistoryDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderhistoryDetailsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOrderhistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
