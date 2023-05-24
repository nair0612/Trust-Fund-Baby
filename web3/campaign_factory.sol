// SPDX-License-Identifier: GPL-3.0

import "./crowdfunding_campaign.sol";

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory{
    address[] public campaignAddresses; // address array to store all campaign contracts addresses
    mapping(address => CampaignInfoStatic) campaignInfoStatic;


    event CampaignCreated(address indexed owner, string title, address campaign);
    event FeeReceived(address sender, uint256 amount);

    receive() external payable {
        emit FeeReceived(msg.sender, msg.value);
    }

    
    // function: create a new campaign and store the address in array
    function createNewCrowdFunding(
        // campaign info
        string memory _title,
        string memory _description,
        uint256 _goal,
        uint256 _durationInDays,
        string memory _profileImage,
        // token info
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _tokenPrice,
        uint256 _tokenSupply
    ) public {
        CrowdFundingCampaign newCrowdFunding = new CrowdFundingCampaign(
            payable(msg.sender),
            _title,
            _description,
            _goal,
            _durationInDays,
            _profileImage,
            _tokenName,
            _tokenSymbol,
            _tokenPrice,
            _tokenSupply,
            payable(address(this))
        );
        // append new campaign address to array
        campaignAddresses.push(address(newCrowdFunding));
        campaignInfoStatic[address(newCrowdFunding)] = CampaignInfoStatic({
            campaignAddress: address(newCrowdFunding),
            owner: payable(msg.sender),
            title: _title,
            description: _description,
            goal: _goal,
            deadline: _durationInDays,
            profileImage: _profileImage,
            tokenName: _tokenName,
            tokenSymbol: _tokenSymbol,
            tokenPrice: _tokenPrice,
            tokenSupply: _tokenSupply
        });
        // return new address
        emit CampaignCreated(msg.sender, _title, address(newCrowdFunding));
    }

    // struct: static info of a campaign
    struct CampaignInfoStatic {
        address campaignAddress;
        address owner;
        string title;
        string description;
        uint256 goal;
        uint256 deadline;
        string profileImage;
        string tokenName;
        string tokenSymbol;
        uint256 tokenPrice;
        uint256 tokenSupply;
    }

    // function: get static info of all campaigns
    function getAllCampaignsInfo() public view returns (CampaignInfoStatic[] memory) {
        CampaignInfoStatic[] memory staticInfo = new CampaignInfoStatic[](campaignAddresses.length);
        for (uint256 i=0; i < campaignAddresses.length; i++) {
            staticInfo[i] = campaignInfoStatic[campaignAddresses[i]];
        }
        return staticInfo;
    }

    // struct: complete campaign info
    struct CampaignInfoDynamic {
        uint256 status;
        uint256 tokenRemain;
        address tokenAddress;
    }

    // function: get complete campaign info by address
    function getCampaignInfoByAddress(address campaignAddress) public view returns (CampaignInfoStatic memory, CampaignInfoDynamic memory) {
        CrowdFundingCampaign campaign = CrowdFundingCampaign(campaignAddress);

        CampaignInfoStatic memory _staticInfo = campaignInfoStatic[campaignAddress];

        CampaignInfoDynamic memory _dynamicInfo = CampaignInfoDynamic({
            status: campaign.status(),
            tokenRemain: campaign.tokenRemain(),
            tokenAddress: campaign.tokenAddress()
        });
        return (_staticInfo, _dynamicInfo);
    }

}