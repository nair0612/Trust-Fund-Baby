// SPDX-License-Identifier: GPL-3.0

import "./crowdfunding_campaign.sol";

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory{
    address[] public crowdfundingContracts;

    event CampaignCreated();
    
    function createNewCrowdFunding(
        address payable _owner,
        string memory _title,
        string memory _description,
        uint256 _goal,
        uint256 _tokenPrice,
        uint256 _numOfTokens,
        uint256 _duration,
        string memory _profileImage
    ) public returns (address)  {
        CrowdFundingCampaign newCrowdFunding = new CrowdFundingCampaign(
            _owner,
            _title,
            _description,
            _goal,
            _tokenPrice,
            _numOfTokens,
            _duration,
            _profileImage
        );

        crowdfundingContracts.push(address(newCrowdFunding));

        return address(newCrowdFunding);
    }

    struct BasicCampaignInfo {
        address campaignAddress;
        address owner;
        string title;
        string description;
        string profileImage;
    }

    function retrieveAllCampaignInfo() public view returns (BasicCampaignInfo[] memory) {
        BasicCampaignInfo[] memory campaigns = new BasicCampaignInfo[](crowdfundingContracts.length);
        for (uint256 i = 0; i < crowdfundingContracts.length; i++) {
            CrowdFundingCampaign campaign = CrowdFundingCampaign(crowdfundingContracts[i]);
            campaigns[i] = BasicCampaignInfo({
                campaignAddress: crowdfundingContracts[i],
                owner: campaign.owner(),
                title: campaign.title(),
                description: campaign.description(),
                profileImage: campaign.profileImage()
            });
        }
        return campaigns;
    }

    struct FullCampaignInfo {
        address campaignAddress;
        address owner;
        string title;
        string description;
        uint256 goal;
        uint256 tokenPrice;
        uint256 totalNumOfTokens;
        uint256 remainNumOfTokens;
        uint256 creationDate;
        uint256 deadline;
        string profileImage;
        uint256 status;
    }

    function getCampaignInfoByAddress(address campaignAddress) public view returns (FullCampaignInfo memory) {
        CrowdFundingCampaign campaign = CrowdFundingCampaign(campaignAddress);

        FullCampaignInfo memory campaignInfo = FullCampaignInfo({
            campaignAddress: campaignAddress,
            owner: campaign.owner(),
            title: campaign.title(),
            description: campaign.description(),
            goal: campaign.goal(),
            tokenPrice: campaign.tokenPrice(),
            totalNumOfTokens: campaign.totalNumOfTokens(),
            remainNumOfTokens: campaign.remainNumOfTokens(),
            creationDate: campaign.creationDate(),
            deadline: campaign.deadline(),
            profileImage: campaign.profileImage(),
            status: campaign.status()
        });

        return campaignInfo;
    }
}