import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewAmbassadorFeedbackPage } from './view-ambassador-feedback.page';

describe('ViewAmbassadorFeedbackPage', () => {
  let component: ViewAmbassadorFeedbackPage;
  let fixture: ComponentFixture<ViewAmbassadorFeedbackPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAmbassadorFeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAmbassadorFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
