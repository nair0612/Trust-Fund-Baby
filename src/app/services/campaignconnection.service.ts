import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { WalletService } from '../services/wallet.service';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CampaignconnectionService {
  web3: Web3;
  public ethereum;
  accountNo: string[];
  data: any;
  contract: Contract;
  contractAddress : string = '0xC2C65EDDB5F8a6bAFdAE460bB26B8104F1Faa595';
  contractABI : any = [
    {
      "anonymous": false,
      "inputs": [],
      "name": "CampaignCreated",
      "type": "event"
    },
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
          "name": "_duration",
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
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "profileImage",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "terminated",
              "type": "bool"
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
  ];

  constructor(
    private _walletService : WalletService,
  ) { 
    const {ethereum} = <any>window
    this.ethereum = ethereum
  }

  async checkConnection() {
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
        await this.ethereum.enable();
        this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
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

  getCampaignDetails(param: string): Observable<any> {
    try {
      this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress)
      return from(this.contract.methods.getCampaignInfoByAddress(param).call())
      .pipe(
        map((result) => {
          console.log(result);
          return result;
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      );
  }
  catch(err) {
    console.error(err);
    return of(err);
    }
  }

  getAllCampaign(): Observable<any> {
  try {
    return from(this.ethereum.enable())
      .pipe(
        switchMap(() => {
          this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
          return from(this.contract.methods.retrieveAllCampaignInfo().call());
        }),
        map((result) => {
          console.log(result);
          return result;
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      );
  } catch (err) {
    console.error(err);
    return of(err);
  }
}

}
