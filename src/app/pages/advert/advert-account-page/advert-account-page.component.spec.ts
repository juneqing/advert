import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertAccountPageComponent } from './advert-account-page.component';

describe('AdvertAccountPageComponent', () => {
  let component: AdvertAccountPageComponent;
  let fixture: ComponentFixture<AdvertAccountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertAccountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
