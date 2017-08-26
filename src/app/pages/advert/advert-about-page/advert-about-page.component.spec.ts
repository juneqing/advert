import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertAboutPageComponent } from './advert-about-page.component';

describe('AdvertAboutPageComponent', () => {
  let component: AdvertAboutPageComponent;
  let fixture: ComponentFixture<AdvertAboutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertAboutPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertAboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
