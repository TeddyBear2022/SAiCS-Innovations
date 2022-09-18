import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainSpecialTypeComponent } from './main-special-type.component';

describe('MainSpecialTypeComponent', () => {
  let component: MainSpecialTypeComponent;
  let fixture: ComponentFixture<MainSpecialTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSpecialTypeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainSpecialTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
