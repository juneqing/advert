import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertFinancialPageComponent } from './advert-financial-page.component';

describe('AdvertFinancialPageComponent', () => {
  let component: AdvertFinancialPageComponent;
  let fixture: ComponentFixture<AdvertFinancialPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertFinancialPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertFinancialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
