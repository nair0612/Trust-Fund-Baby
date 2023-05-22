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
			},
			{
				"internalType": "address payable",
				"name": "_factoryAddress",
				"type": "address"
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
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
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
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_address",
				"type": "address"
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
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "TokensWithdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "fee",
				"type": "uint256"
			}
		],
		"name": "collectFees",
		"outputs": [],
		"stateMutability": "payable",
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
		"inputs": [],
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "donorAddresses",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numOfTokens",
				"type": "uint256"
			}
		],
		"name": "redeemTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "tokenAddress",
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
		"name": "tokenName",
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
		"name": "tokenRemain",
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
		"name": "tokenSupply",
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
		"name": "tokenSymbol",
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

  withdrawFromCampaign(noOfTokens : Number, campaignAddress : string, ownerAddress : string, priceOfThisTransaction : number): Promise<any> {
    if (typeof (window as any).ethereum !== 'undefined') {
        const web3 = new Web3((window as any).ethereum);
        this.campaign = new web3.eth.Contract(campaignABI as any, campaignAddress);
      } else {
        console.log('Please install MetaMask or another Ethereum-compatible browser extension.');
      }
    return this.campaign.methods.withdrawFromCampaign(noOfTokens).send({ from: ownerAddress, value: priceOfThisTransaction });
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