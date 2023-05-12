import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCampaignComponent } from './all-campaign.component';

describe('AllCampaignComponent', () => {
  let component: AllCampaignComponent;
  let fixture: ComponentFixture<AllCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCampaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
