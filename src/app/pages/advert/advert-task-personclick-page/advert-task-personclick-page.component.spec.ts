import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertTaskPersonclickPageComponent } from './advert-task-personclick-page.component';

describe('AdvertTaskPersonclickPageComponent', () => {
  let component: AdvertTaskPersonclickPageComponent;
  let fixture: ComponentFixture<AdvertTaskPersonclickPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertTaskPersonclickPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertTaskPersonclickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
