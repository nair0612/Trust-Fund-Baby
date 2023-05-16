// SPDX-License-Identifier: GPL-3.0

import "./crowdfunding_campaign.sol";

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory{
    address[] public crowdfundingContracts; // address array to store all campaign contracts addresses
    
    // function: create a new campaign and store the address in array
    function createNewCrowdFunding(
        // campaign info
        address payable owner,
        string memory title,
        string memory description,
        uint256 goal,
        uint256 durationInDays,
        string memory profileImage,
        // token info
        string memory tokenName,
        string memory tokenSymbol,
        uint256 tokenPrice,
        uint256 tokenSupply
    ) public returns (address) {
        CrowdFundingCampaign newCrowdFunding = new CrowdFundingCampaign(
            owner,
            title,
            description,
            goal,
            durationInDays,
            profileImage,
            tokenName,
            tokenSymbol,
            tokenPrice,
            tokenSupply
        );
        // append new campaign address to array
        crowdfundingContracts.push(address(newCrowdFunding));
        // return new address
        return address(newCrowdFunding);
    }

    function getAllCampaignAddresses() public view returns (address[] memory campaignaddresses) {
        return crowdfundingContracts;
    }

    // struct: basic info of a campaign
    struct CampaignInfoBasic {
        address campaignAddress;
        address owner;
        string title;
        string description;
        string profileImage;
    }

    // function: get basic of all campaigns
    function getAllCampaignsInfo() public view returns (CampaignInfoBasic[] memory) {
        CampaignInfoBasic[] memory campaigns = new CampaignInfoBasic[](crowdfundingContracts.length);
        for (uint256 i = 0; i < crowdfundingContracts.length; i++) {
            CrowdFundingCampaign campaign = CrowdFundingCampaign(crowdfundingContracts[i]);
            campaigns[i] = CampaignInfoBasic({
                campaignAddress: crowdfundingContracts[i],
                owner: campaign.owner(),
                title: campaign.title(),
                description: campaign.description(),
                profileImage: campaign.profileImage()
            });
        }
        return campaigns;
    }

    // struct: complete campaign info
    struct CampaignInfoComplete {
        address campaignAddress;
        address owner;
        string title;
        string description;
        uint256 goal;
        uint256 creationDate;
        uint256 deadline;
        string profileImage;
        uint256 status;
        uint256 tokenPrice;
        uint256 tokenSupply;
        uint256 tokenRemain;
    }

    // function: get complete campaign info by address
    function getCampaignInfoByAddress(address campaignAddress) public view returns (CampaignInfoComplete memory) {
        CrowdFundingCampaign campaign = CrowdFundingCampaign(campaignAddress);

        CampaignInfoComplete memory campaignInfoComplete = CampaignInfoComplete({
            campaignAddress: campaignAddress,
            owner: campaign.owner(),
            title: campaign.title(),
            description: campaign.description(),
            goal: campaign.goal(),
            creationDate: campaign.creationDate(),
            deadline: campaign.deadline(),
            profileImage: campaign.profileImage(),
            status: campaign.status(),
            tokenPrice: campaign.tokenPrice(),
            tokenSupply: campaign.tokenSupply(),
            tokenRemain: campaign.tokenRemain()
        });

        return campaignInfoComplete;
    }
}