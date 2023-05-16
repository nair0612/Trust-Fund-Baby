import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CampaignconnectionService } from '../services/campaignconnection.service';
import { ContractService } from '../services/contract-services';

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

  campaignAddress = '0x100660EFBE3c77A4Ac6A5A734422D6a488c3B77a';

  constructor(
    private route: ActivatedRoute,
    private contractService: ContractService,
    private campaignConnectionService: CampaignconnectionService
  ) {
    this.myForm = new FormGroup({
      actionPrice: new FormControl('invest', Validators.required),
    });
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
        console.log('Campaign Address:', campaignInfo.campaignAddress);
        console.log('Campaign Info:', campaignInfo);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

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

  onSubmit() {
    console.log(this.myForm.value);
  }

  getCampaignDetails(param: string) {
    this.campaignConnectionService
      .getCampaignDetails(this.campaignId)
      .subscribe((result) => {
        this.data = result;
      });
  }
}
