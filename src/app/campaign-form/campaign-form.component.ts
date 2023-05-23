import { Component, Inject, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('spinner') spinner: ElementRef;
  isDisabled: boolean = true
  camForm: FormGroup;
  public ethereum;
  accountNo: string[];
  web3: Web3;
  goal: string;
  tokenPrice: string;
  contract: Contract;
  isLoading: boolean = false;

  contractAddress : string = '0x498fc595A806ACe30FF0D99Cf115983F49f39dBC';
  contractABI : any = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "campaign",
          "type": "address"
        }
      ],
      "name": "CampaignCreated",
      "type": "event"
    },
    {
      "inputs": [
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
          "name": "_durationInDays",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_profileImage",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tokenName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tokenSymbol",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_tokenPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_tokenSupply",
          "type": "uint256"
        }
      ],
      "name": "createNewCrowdFunding",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "FeeReceived",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "campaignAddresses",
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
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "profileImage",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tokenName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tokenSymbol",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "tokenPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "tokenSupply",
              "type": "uint256"
            }
          ],
          "internalType": "struct CampaignFactory.CampaignInfoStatic[]",
          "name": "",
          "type": "tuple[]"
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
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "profileImage",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tokenName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tokenSymbol",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "tokenPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "tokenSupply",
              "type": "uint256"
            }
          ],
          "internalType": "struct CampaignFactory.CampaignInfoStatic",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "status",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "tokenRemain",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
            }
          ],
          "internalType": "struct CampaignFactory.CampaignInfoDynamic",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  


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
  this.spinner.nativeElement.style.display = 'block';
  this.isLoading = true;
  console.log(this.camForm.value);
  if(this.camForm.value.campaignTitle== '' || this.camForm.value.description== '' || this.camForm.value.noTokens== '' || this.camForm.value.tokenName== '' 
  || this.camForm.value.tokenPrice== '' || this.camForm.value.tokenSymbol== '' || this.camForm.value.endDate== '' || this.camForm.value.profileImage== '') {
    alert('Please fill all the empty fields')
    this.spinner.nativeElement.style.display = 'none';
    this.isLoading = false;
  }
  else if (this.hasDecimals(this.camForm.value.noTokens)) {
    alert('Number of Tokens cannot be in decimal values')
    this.spinner.nativeElement.style.display = 'none';
    this.isLoading = false;
  }
  else {
    try {
    const currendate = new Date();
    const enteredDate = new Date(this.camForm.value.endDate);
    const timeDiff = Math.abs(currendate.getTime() - enteredDate.getTime());
    const _owner = this.accountNo;
    const _title = this.camForm.value.campaignTitle;
    const _description = this.camForm.value.description;
    const _goal = ((this.camForm.value.tokenPrice) * (this.camForm.value.noTokens) * (10**18));
    this.goal= _goal.toString();
    const _durationInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));;
    const _profileImage = this.camForm.value.profileImage;
    const _tokenName = this.camForm.value.tokenName;
    const _tokenSymbol = this.camForm.value.tokenSymbol;
    const _tokenPrice = (this.camForm.value.tokenPrice) * (10**18);
    this.tokenPrice = _tokenPrice.toString();
    const _tokenSupply = this.camForm.value.noTokens;
    this.contract.methods
  .createNewCrowdFunding(
    _title,
    _description,
    this.goal,
    _durationInDays,
    _profileImage,
    _tokenName,
    _tokenSymbol,
    this.tokenPrice,
    _tokenSupply,
  )
  .send({ from: this.accountNo })
  .then((receipt: any) => {
    console.log(receipt);
    this.spinner.nativeElement.style.display = 'none';
    this._dialogRef.close();
    window.location.reload();
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