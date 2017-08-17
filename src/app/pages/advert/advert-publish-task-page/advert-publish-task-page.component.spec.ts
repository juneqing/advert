import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertPublishTaskPageComponent } from './advert-publish-task-page.component';

describe('AdvertPublishTaskPageComponent', () => {
  let component: AdvertPublishTaskPageComponent;
  let fixture: ComponentFixture<AdvertPublishTaskPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertPublishTaskPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertPublishTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
