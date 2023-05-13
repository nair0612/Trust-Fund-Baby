import { TestBed } from '@angular/core/testing';

import { CampaignconnectionService } from './campaignconnection.service';

describe('CampaignconnectionService', () => {
  let service: CampaignconnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignconnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
