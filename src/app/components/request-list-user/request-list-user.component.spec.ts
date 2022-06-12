import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestListUserComponent } from './request-list-user.component';

describe('RequestListUserComponent', () => {
  let component: RequestListUserComponent;
  let fixture: ComponentFixture<RequestListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestListUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
