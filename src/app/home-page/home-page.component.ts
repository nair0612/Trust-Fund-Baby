import { Component } from '@angular/core';
import { ContractService } from '../services/contract-services';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})

export class HomePageComponent {
  cardDataList : any;
  campaignInfo: any;
  campaignAddress = '0x100660EFBE3c77A4Ac6A5A734422D6a488c3B77a'; // Replace with the actual campaign address

  constructor(private contractService: ContractService,
              private HeaderComponent: HeaderComponent,
              private router: Router) {}

  getCampaignInfo() {
    this.contractService
      .getCampaignInfoByAddress(this.campaignAddress)
      .then((campaignInfo) => {
        this.campaignInfo = campaignInfo;
        console.log('Campaign Info:', campaignInfo);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  openCampaignForm(): void {
    this.HeaderComponent.openCampaignForm();
  }
  
  navigateToAllCampaign(): void {
    this.router.navigate(['/AllCampaign']);
  }
  
  ngOnInit() {
    this.contractService.retrieveAllCampaignInfo()
      .then((campaignInfo) => {
        this.campaignInfo = campaignInfo;
        console.log('Campaign Info:', campaignInfo);
        this.cardDataList = campaignInfo;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
