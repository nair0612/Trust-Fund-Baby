import { Component, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CampaignconnectionService } from '../services/campaignconnection.service';
import { ContractService } from '../services/contract-services'
import { ReactiveFormsModule } from '@angular/forms';
import { CampaignService } from '../services/campaign-service';
import { WalletService } from '../services/wallet.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css'],
})
export class CampaignDetailsComponent {
  myForm: FormGroup;
  campaignId: string;
  data: any;
  campaignInfo: any;
  isFormVisible: boolean;
  goal: number;
  remianing: number;
  public ethereum;
  accountNo: string;
  priceOfThisTransaction: number;

  campaignAddress = '0x100660EFBE3c77A4Ac6A5A734422D6a488c3B77a';

  constructor(
    private route: ActivatedRoute,
    private contractService: ContractService,
    private campaignService: CampaignService,
    private campaignConnectionService: CampaignconnectionService,
    private _fb: FormBuilder, 
  ) {
    this.myForm = this._fb.group({
      actionPrice: 'invest',
      tokens: '',
    });
    const {ethereum} = <any>window
    this.ethereum = ethereum
  }

  // getCampaignInfo() {
  //   this.contractService
  //     .getCampaignInfoByAddress(this.campaignAddress)
  //     .then((campaignInfo) => {
  //       this.campaignInfo = campaignInfo;
  //       console.log('Campaign Info:', campaignInfo);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }

  ngOnInit() {
    this.campaignId = this.route.snapshot.url[1].path;
    this.contractService
      .getCampaignInfoByAddress(this.campaignId)
      .then((campaignInfo) => {
        this.campaignInfo = campaignInfo;
        console.log('Campaign Address:', campaignInfo[0].campaignAddress);
        console.log('Campaign Info:', campaignInfo);
        this.goal = campaignInfo[0].goal/(10**18);
        this.remianing = (campaignInfo[0].tokenSupply-campaignInfo[1].tokenRemain)/(10**18);
        if(this.route.snapshot.url[1].path.toLowerCase() == campaignInfo[0].owner.toLowerCase()) {
            this.isFormVisible = false;
        }
        else {
          this.isFormVisible = true;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  myFormNew = new FormGroup({
    actionPrice: new FormControl("", [Validators.required]),
    tokens: new FormControl("", [Validators.required]),
  });

  items = [
    'BBCDx33532353fdg4545343',
    'CBCDx33532353fdg4545343',
    'DBCDx33532353fdg4545343',
    'EBCDx33532353fdg4545343',
    'FBCDx33532353fdg4545343',
    'GBCDx33532353fdg4545343',
    'HBCDx33532353fdg4545343',
    'IBCDx33532353fdg4545343',
    'JBCDx33532353fdg4545343',
    'KBCDx33532353fdg4545343',
    'LBCDx33532353fdg4545343',
    'MBCDx33532353fdg4545343',
    'NBCDx33532353fdg4545343',
    'OBCDx33532353fdg4545343',
    'PBCDx33532353fdg4545343',
    'QBCDx33532353fdg4545343',
    'RBCDx33532353fdg4545343',
    'SBCDx33532353fdg4545343',
    'TBCDx33532353fdg4545343',
    'UBCDx33532353fdg4545343',
    'VBCDx33532353fdg4545343',
  ];

  hasDecimals(value: number): boolean {
    return !Number.isInteger(value);
  }

  onSubmitTerminate() {
    try {
      const _ownerAddress = this.campaignInfo.owner
      this.campaignService
        .terminateCampaign(this.campaignId, _ownerAddress)
        .then((receipt: any) => {
          console.log(receipt);
        });      
    } catch (error) {
      console.log(error);
      alert('Some error occured. Please contact Trust Fund Baby')
    }
  }

  onSubmitWithdraw() {
    try {
      const _ownerAddress = this.campaignInfo.owner
      this.campaignService
        .withdrawDevCampaign(this.campaignId, _ownerAddress)
        .then((receipt: any) => {
          console.log(receipt);
        });      
    } catch (error) {
      console.log(error);
      alert('Some error occured. Please contact Trust Fund Baby')
    }
  }

  onSubmitWithdrawTerminated() {
    try {
      const _ownerAddress = this.campaignInfo.owner
      this.campaignService
        .withdrawFromTerminatedCampaign(this.campaignId, _ownerAddress)
        .then((receipt: any) => {
          console.log(receipt);
        });      
    } catch (error) {
      console.log(error);
      alert('Some error occured. Please contact Trust Fund Baby')
    }
  }

  public onSubmitForm = async () => {
    try{
      if(!this.ethereum) return alert ("Please install Meta Mask for your browser");
      const accounts = await this.ethereum.request({method: 'eth_requestAccounts'});
      this.accountNo = accounts[0];
    }catch (e) {
      throw new Error ("No ethereum object found");
    }
    console.log(this.myForm.value);
    const _numOfTokensDonate = this.myForm.value.tokens
    const _campaignAddress = this.campaignInfo[0].campaignAddress
    const _ownerAddress = this.campaignInfo[0].owner
    const _tokenPrice = this.campaignInfo[0].tokenPrice
    if(this.myForm.value.actionPrice== '' || this.myForm.value.tokens=='')
    {
      alert('Please fill all empty fields')
    }
    else if (this.hasDecimals(this.myForm.value.tokens))
    {
      alert('Tokens value cannot be in decimals.')
    }
    else if (this.myForm.value.actionPrice == 'invest') {
      try {
        this.priceOfThisTransaction = _numOfTokensDonate * _tokenPrice
        this.campaignService
          .donateToCampaign(_numOfTokensDonate, this.campaignId, this.accountNo, this.priceOfThisTransaction)
          .then((receipt: any) => {
            console.log(receipt);
          });      
      } catch (error) {
        console.log(error);
        alert('Some error occured. Please contact Trust Fund Baby')
      }
    }
    else if (this.myForm.value.actionPrice == 'withdraw') {
      try {
        const _numOfTokensDonate = this.myForm.value.tokens
        const _campaignAddress = this.campaignInfo[0].campaignAddress
        this.campaignService
          .withdrawFromCampaign(_numOfTokensDonate, this.campaignId, _ownerAddress)
          .then((receipt: any) => {
            console.log(receipt);
          });      
      } catch (error) {
        console.log(error);
        alert('Some error occured. Please contact Trust Fund Baby')
      }
    }
  }

  // getCampaignDetails(param: string) {
  //   this.campaignConnectionService
  //     .getCampaignDetails(this.campaignId)
  //     .subscribe((result) => {
  //       this.data = result;
  //     });
  // }
}
