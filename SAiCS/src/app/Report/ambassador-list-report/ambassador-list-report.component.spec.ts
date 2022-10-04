import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmbassadorListReportComponent } from './ambassador-list-report.component';

describe('AmbassadorListReportComponent', () => {
  let component: AmbassadorListReportComponent;
  let fixture: ComponentFixture<AmbassadorListReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbassadorListReportComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmbassadorListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
