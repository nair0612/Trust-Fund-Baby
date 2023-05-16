import { Component, Inject, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignService } from '../services/campaign.service';
import { WalletService } from '../services/wallet.service';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit {
  isDisabled: boolean = true
  camForm: FormGroup;
  public ethereum;
  accountNo: string[];
  web3: Web3;
  contract: Contract;
  contractAddress : string = '0x5033D7A468D204495813041a28c7f254cF02fab0';
  contractABI : any = [
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_goal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_tokenPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_numOfTokens",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_durationInDays",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_profileImage",
          "type": "string"
        }
      ],
      "name": "createNewCrowdFunding",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "crowdfundingContracts",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllCampaignsInfo",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "campaignAddress",
          "type": "address[]"
        },
        {
          "internalType": "address[]",
          "name": "ownerAddress",
          "type": "address[]"
        },
        {
          "internalType": "string[]",
          "name": "title",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "description",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "profileImage",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "campaignAddress",
          "type": "address"
        }
      ],
      "name": "getCampaignInfoByAddress",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "campaignAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "goal",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "tokenPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalNumOfTokens",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "remainNumOfTokens",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "creationDate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "profileImage",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "status",
              "type": "uint256"
            }
          ],
          "internalType": "struct CampaignFactory.FullCampaignInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "retrieveAllCampaignInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "campaignAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "profileImage",
              "type": "string"
            }
          ],
          "internalType": "struct CampaignFactory.BasicCampaignInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]


  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _camService: CampaignService,
    private _dialogRef: MatDialogRef<CampaignFormComponent>,
    private _walletService : WalletService
  ) { 
    const {ethereum} = <any>window
    this.ethereum = ethereum
    this.camForm = this._fb.group({
      campaignTitle: '',
      description: '',
      noTokens: '',
      tokenPrice: '',
      endDate: '',
      profileImage: '',
      tokenName: '',
      tokenSymbol: ''
    })

  }

  ngOnInit() : void {
  this.camForm.patchValue(this.data);
  if (this.ethereum) {
    if (!this.checkWalletConnected()) {
      this.connectToWallet();
    }
    else {
      this.checkWalletConnected();
    }
    console.log(this.accountNo);
    this.web3 = new Web3(this.ethereum);
    try {
      this.ethereum.enable().then(() => {
        this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

connectToWallet = async () => {
  const accounts = await this._walletService.connectWallet();
}

checkWalletConnected = async () => {
 const accounts = await this._walletService.checkWalletConnected();
 if(accounts.length >0) {
   this.accountNo = accounts[0];
 }
}

// private loadContract(): void {
//   this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
// }

campaignForm = new FormGroup({
  campaignTitle: new FormControl("", [Validators.required, Validators.minLength(10)]),
  endDate: new FormControl("", [Validators.required]),
  description: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
  noTokens: new FormControl("", [Validators.required]),
  tokenPrice: new FormControl("", [Validators.required]),
  tokenName: new FormControl("", [Validators.required]),
  tokenSymbol: new FormControl("", [Validators.required, Validators.minLength(3)]), 
  profileImage: new FormControl("", [Validators.required]),
});

hasDecimals(value: number): boolean {
  return !Number.isInteger(value);
}

campaignSubmitted() {
  console.log(this.camForm.value);
  if(this.camForm.value.campaignTitle== '' || this.camForm.value.description== '' || this.camForm.value.noTokens== '' || this.camForm.value.tokenName== '' 
  || this.camForm.value.tokenPrice== '' || this.camForm.value.tokenSymbol== '' || this.camForm.value.endDate== '' || this.camForm.value.profileImage== '') {
    alert('Please fill all the empty fields')
  }
  else if (this.hasDecimals(this.camForm.value.noTokens)) {
    alert('Number of Tokens cannot be in decimal values')
  }
  else {
    try {
    const currendate = new Date();
    const enteredDate = new Date(this.camForm.value.endDate);
    const _owner = this.accountNo;
    const _title = this.camForm.value.campaignTitle;
    const _description = this.camForm.value.description;
    const _goal = ((this.camForm.value.tokenPrice) * (this.camForm.value.noTokens) * (10**18));
    const _durationInDays = 10;
    const _profileImage = this.camForm.value.profileImage;
    const _tokenName = this.camForm.value.tokenName;
    const _tokenSymbol = this.camForm.value.tokenSymbol;
    const _tokenPrice = (this.camForm.value.tokenPrice) * (10**18);
    const _tokenSupply = this.camForm.value.noTokens;
    this.contract.methods
  .createNewCrowdFunding(
    _owner,
    _title,
    _description,
    _goal,
    _durationInDays,
    _profileImage,
    _tokenName,
    _tokenSymbol,
    _tokenPrice,
    _tokenSupply,
  )
  .send({ from: this.accountNo })
  .then((receipt: any) => {
    console.log(receipt);
    this._dialogRef.close();
  });
  } catch(error) {
  console.error(error);
  }
  }
}



 get CampaignTitle(): FormControl{
  return this.campaignForm.get("campaignTitle") as FormControl;
 }

 get Description(): FormControl{
  return this.campaignForm.get("description") as FormControl;
 }

 get NoTokens(): FormControl{
  return this.campaignForm.get("noTokens") as FormControl;
 }

 get TokenPrice(): FormControl{
  return this.campaignForm.get("tokenPrice") as FormControl;
 }

 get EndDate(): FormControl{
  return this.campaignForm.get("endDate") as FormControl;
 }

 get profileImage(): FormControl{
  return this.campaignForm.get("profileImage") as FormControl;
 }

 get TokenName(): FormControl{
  return this.campaignForm.get("tokenName") as FormControl;
 }

 get TokenSymbol(): FormControl{
  return this.campaignForm.get("tokenSymbol") as FormControl;
 }

}