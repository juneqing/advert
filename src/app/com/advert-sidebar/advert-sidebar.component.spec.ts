import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertSidebarComponent } from './advert-sidebar.component';

describe('AdvertSidebarComponent', () => {
  let component: AdvertSidebarComponent;
  let fixture: ComponentFixture<AdvertSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
