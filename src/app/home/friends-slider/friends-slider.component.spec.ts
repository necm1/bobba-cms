import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsSliderComponent } from './friends-slider.component';

describe('FriendsSliderComponent', () => {
  let component: FriendsSliderComponent;
  let fixture: ComponentFixture<FriendsSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
