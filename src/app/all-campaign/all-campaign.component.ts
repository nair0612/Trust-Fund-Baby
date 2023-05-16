import { Component, Input } from '@angular/core';
import { ContractService } from '../services/contract-services';
import { ActivatedRoute } from '@angular/router';
import { CampaignconnectionService } from '../services/campaignconnection.service';

@Component({
  selector: 'app-all-campaign',
  templateUrl: './all-campaign.component.html',
  styleUrls: ['./all-campaign.component.css'],
})
export class AllCampaignComponent {
  cardDataList : any;
  campaignInfo: any;
  campaignAddress = '0x100660EFBE3c77A4Ac6A5A734422D6a488c3B77a'; // Replace with the actual campaign address
  visibleCardDataList: any[];
  
  constructor(private contractService: ContractService, private route: ActivatedRoute,
  private campaignConnectionService: CampaignconnectionService) {}

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

  ngOnInit() {
    this.contractService.retrieveAllCampaignInfo()
      .then((campaignInfo) => {
        this.campaignInfo = campaignInfo;
        console.log('Campaign Info:', campaignInfo);
        this.cardDataList = campaignInfo;
        this.visibleCardDataList = this.cardDataList;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  data: any;
  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    const regex = new RegExp(this.searchText, 'i');
    this.visibleCardDataList = this.cardDataList
      .filter((item: any) => regex.test(item.title)) // Specify the type of 'item' explicitly
    console.log(this.searchText);
  }
}
