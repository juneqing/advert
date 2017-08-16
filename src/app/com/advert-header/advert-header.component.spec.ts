import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertHeaderComponent } from './advert-header.component';

describe('AdvertHeaderComponent', () => {
  let component: AdvertHeaderComponent;
  let fixture: ComponentFixture<AdvertHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
