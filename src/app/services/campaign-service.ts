import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

const campaignABI = [
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
				"name": "_totalNumOfTokens",
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
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
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
			}
		],
		"name": "CampaignCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "CampaignTerminated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "TokensDonated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "TokensWithdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "creationDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deadline",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "description",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amountWithdraw",
				"type": "uint256"
			}
		],
		"name": "devWithdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numOfTokensDonate",
				"type": "uint256"
			}
		],
		"name": "donateToCampaign",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "donations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "goal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "profileImage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "remainNumOfTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "status",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "terminateCampaign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "title",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenContract",
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
		"name": "tokenPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalNumOfTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numOfTokensWithdraw",
				"type": "uint256"
			}
		],
		"name": "withdrawFromCampaign",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFromTerminatedCampaign",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
];

@Injectable({
    providedIn: 'root'
  })

export class CampaignService {
    private campaign: Contract;

constructor() {
    
  }


  donateToCampaign(noOfTokens : Number, campaignAddress : string, ownerAddress : string, priceOfThisTransaction : number): Promise<any> {
    if (typeof (window as any).ethereum !== 'undefined') {
        const web3 = new Web3((window as any).ethereum);
        this.campaign = new web3.eth.Contract(campaignABI as any, campaignAddress);
      } else {
        console.log('Please install MetaMask or another Ethereum-compatible browser extension.');
      }
    return this.campaign.methods.donateToCampaign(noOfTokens).send({ from: ownerAddress, value: priceOfThisTransaction });
  }

  withdrawFromCampaign(noOfTokens : Number, campaignAddress : string, ownerAddress : string): Promise<any> {
    if (typeof (window as any).ethereum !== 'undefined') {
        const web3 = new Web3((window as any).ethereum);
        this.campaign = new web3.eth.Contract(campaignABI as any, campaignAddress);
      } else {
        console.log('Please install MetaMask or another Ethereum-compatible browser extension.');
      }
    return this.campaign.methods.withdrawFromCampaign(noOfTokens).send({ from: ownerAddress });
  }

  terminateCampaign(campaignAddress : string, ownerAddress : string): Promise<any> {
    if (typeof (window as any).ethereum !== 'undefined') {
        const web3 = new Web3((window as any).ethereum);
        this.campaign = new web3.eth.Contract(campaignABI as any, campaignAddress);
      } else {
        console.log('Please install MetaMask or another Ethereum-compatible browser extension.');
      }
    return this.campaign.methods.terminateCampaign().send({ from: ownerAddress });
  }

  withdrawDevCampaign(campaignAddress : string, ownerAddress : string): Promise<any> {
    if (typeof (window as any).ethereum !== 'undefined') {
        const web3 = new Web3((window as any).ethereum);
        this.campaign = new web3.eth.Contract(campaignABI as any, campaignAddress);
      } else {
        console.log('Please install MetaMask or another Ethereum-compatible browser extension.');
      }
    return this.campaign.methods.devWithdraw().send({ from: ownerAddress });
  }

  withdrawFromTerminatedCampaign(campaignAddress : string, ownerAddress : string): Promise<any> {
    if (typeof (window as any).ethereum !== 'undefined') {
        const web3 = new Web3((window as any).ethereum);
        this.campaign = new web3.eth.Contract(campaignABI as any, campaignAddress);
      } else {
        console.log('Please install MetaMask or another Ethereum-compatible browser extension.');
      }
    return this.campaign.methods.withdrawFromTerminatedCampaign().send({ from: ownerAddress });
  }

}