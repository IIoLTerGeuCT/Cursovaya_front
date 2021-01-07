import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortServiceComponent } from './sort-service.component';

describe('SortServiceComponent', () => {
  let component: SortServiceComponent;
  let fixture: ComponentFixture<SortServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
