import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertHomePageComponent } from './advert-home-page.component';

describe('AdvertHomePageComponent', () => {
  let component: AdvertHomePageComponent;
  let fixture: ComponentFixture<AdvertHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
