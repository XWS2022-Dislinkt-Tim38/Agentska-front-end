import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestListAdminComponent } from './request-list-admin.component';

describe('RequestListAdminComponent', () => {
  let component: RequestListAdminComponent;
  let fixture: ComponentFixture<RequestListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
