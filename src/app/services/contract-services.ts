import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';


const contractABI = [
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

  @Injectable({
    providedIn: 'root'
  })
  export class ContractService {
    private contract: Contract;
    private contractAddress = '0x498fc595A806ACe30FF0D99Cf115983F49f39dBC'; // Replace with the deployed contract address
  
    constructor() {
      if (typeof (window as any).ethereum !== 'undefined') {
        const web3 = new Web3((window as any).ethereum);
        this.contract = new web3.eth.Contract(contractABI as any, this.contractAddress);
      } else {
        console.log('Please install MetaMask or another Ethereum-compatible browser extension.');
      }
    }
    
  
    createNewCrowdFunding(
      _owner: string,
      _title: string,
      _description: string,
      _goal: number,
      _tokenPrice: number,
      _numOfTokens: number,
      _durationInDays: number,
      _profileImage: string
    ): Promise<any> {
      return this.contract.methods.createNewCrowdFunding(
        _owner,
        _title,
        _description,
        _goal,
        _tokenPrice,
        _numOfTokens,
        _durationInDays,
        _profileImage
      ).send({ from: '<your-wallet-address>' });
    }
  
    getAllCampaignsInfo(): Promise<any> {
      return this.contract.methods.getAllCampaignsInfo().call();
    }
  
    retrieveAllCampaignInfo(): Promise<any> {
      return this.contract.methods.getAllCampaignsInfo().call();
    }
  
    getCampaignInfoByAddress(campaignAddress: string): Promise<any> {
      return this.contract.methods.getCampaignInfoByAddress(campaignAddress).call();
    }
  }
