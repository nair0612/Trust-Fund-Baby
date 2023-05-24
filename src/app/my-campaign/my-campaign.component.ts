import { Component } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { ContractService } from '../services/contract-services';

interface Card {
  owner: string;
  // Other properties of the card object
}

@Component({
  selector: 'app-my-campaign',
  templateUrl: './my-campaign.component.html',
  styleUrls: ['./my-campaign.component.css']
})
export class MyCampaignComponent
 {
  
  public walletConnected : boolean = false;
  public walletId : string;
  cardDataList : any;
  visibleCardDataList : any;
  accountNo : any;
  campaignInfo: any;
  // visibleCardDataList = this.cardDataList.filter(campaign => campaign.id === '8').slice(0, 12);
  cardsPerLoad = 12;

  constructor(
    private _walletService: WalletService,
    private contractService: ContractService
  ) {

  }

  // showMore() {
  //   const currentLength = this.visibleCardDataList.length;
  //   const nextItems = this.cardDataList.slice(currentLength, currentLength + this.cardsPerLoad);
  //   this.visibleCardDataList = this.visibleCardDataList.concat(nextItems);
  // }

  filterDataById(id: string) {
    this.cardDataList = this.cardDataList.filter((card : Card) => card.owner === id);
    return this.cardDataList;
  }

  async ngOnInit(): Promise<void> {
    if (!this.walletConnected) {
      const accounts = await this._walletService.connectWallet();
      if (accounts.length > 0) {
        this.walletConnected = true;
        this.walletId = accounts[0];
    }
    }
    else {
    const accounts = await this._walletService.checkWalletConnected();
    if (accounts.length > 0) {
      this.walletConnected = true;
      this.walletId = accounts[0];
    }
    }
    this.contractService.retrieveAllCampaignInfo()
      .then((campaignInfo) => {
        this.campaignInfo = campaignInfo;
        console.log('Campaign Info:', campaignInfo);
        this.cardDataList = campaignInfo;
        this.cardDataList = this.cardDataList.filter((card : Card) => card.owner.toLowerCase() === this.walletId.toLowerCase());
        console.log(this.cardDataList)
      })
      .catch((error) => {
        console.error('Error:', error);
      }); 
  }
}
