import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmbassadorOrderHistoryComponent } from './ambassador-order-history.component';

describe('AmbassadorOrderHistoryComponent', () => {
  let component: AmbassadorOrderHistoryComponent;
  let fixture: ComponentFixture<AmbassadorOrderHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbassadorOrderHistoryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmbassadorOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
