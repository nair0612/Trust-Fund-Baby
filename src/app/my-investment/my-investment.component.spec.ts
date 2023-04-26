import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInvestmentComponent } from './my-investment.component';

describe('MyInvestmentComponent', () => {
  let component: MyInvestmentComponent;
  let fixture: ComponentFixture<MyInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyInvestmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
