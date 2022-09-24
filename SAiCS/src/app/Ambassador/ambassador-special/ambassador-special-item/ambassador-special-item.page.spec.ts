import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmbassadorSpecialItemPage } from './ambassador-special-item.page';

describe('AmbassadorSpecialItemPage', () => {
  let component: AmbassadorSpecialItemPage;
  let fixture: ComponentFixture<AmbassadorSpecialItemPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbassadorSpecialItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmbassadorSpecialItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
