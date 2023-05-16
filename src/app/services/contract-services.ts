import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';


const contractABI = [
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
  ];

  @Injectable({
    providedIn: 'root'
  })
  export class ContractService {
    private contract: Contract;
    private contractAddress = '0x5033D7A468D204495813041a28c7f254cF02fab0'; // Replace with the deployed contract address
  
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
      return this.contract.methods.retrieveAllCampaignInfo().call();
    }
  
    getCampaignInfoByAddress(campaignAddress: string): Promise<any> {
      return this.contract.methods.getCampaignInfoByAddress(campaignAddress).call();
    }
  }
