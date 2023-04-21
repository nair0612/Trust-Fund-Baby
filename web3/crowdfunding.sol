// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;




contract CrowdFunding{
    struct Campaign{
        address payable fundraiser;
        string title;
        string description;
        uint256 goal;
        uint256 tokenPrice;
        uint256 numberOfTokensTotal;
        uint256 numberOfTokensAvailable;
        //TODO: duration vs. timestamp
        uint256 deadline;
        uint256 amountRaised;
        string profileImage;
        bool isActive;
        mapping (address => uint256) donations; // donator address: amount of donations
    }
    
    mapping (uint256 => Campaign) public campaigns; // campaign index: campaign

    uint256 public numberOfCampaigns = 0;

    event CampaignCreated(uint256 campaignId, address indexed fundraiser, string title, uint256 goal, uint256 deadline);
    event DonationReceived(uint256 indexed campaignId, address indexed donator, uint256 amount);
    event DonationWithdrew(uint256 indexed campaignId, address indexed donator, uint256 amount);

    

    function withdrawFunds(uint256 _campaignId) public {
    Campaign storage campaign = campaigns[_campaignId];
    require(campaign.fundraiser == msg.sender, "Only the campaign's fundraiser can withdraw funds");
    require(campaign.amountRaised >= campaign.goal, "Campaign goal has not been reached yet");

    uint256 amountToWithdraw = campaign.amountRaised;
    campaign.amountRaised = 0; // Reset the amountRaised to 0 before transferring funds
    campaign.isActive = false; // Set the campaign as inactive

    // Transfer funds to the fundraiser's address
    campaign.fundraiser.transfer(amountToWithdraw);

    emit DonationWithdrew(_campaignId, campaign.fundraiser, amountToWithdraw);
    }
    
    function isCampaignActive(uint256 _campaignId) public view returns (bool) {
    Campaign storage campaign = campaigns[_campaignId];
    bool goalReached = campaign.amountRaised >= campaign.goal;
    bool deadlinePassed = block.timestamp >= campaign.deadline;
    return campaign.isActive && !goalReached && !deadlinePassed;
    }

    function refund(uint256 _campaignId) public {
    Campaign storage campaign = campaigns[_campaignId];
    require(!isCampaignActive(_campaignId), "Campaign is still active");
    require(campaign.amountRaised < campaign.goal, "Campaign goal has been reached");

    // Refund all donations to respective investors
    for (uint256 i = 0; i < numberOfCampaigns; i++) {
        address payable donator = payable(campaign.fundraiser); // Cast to address payable
        uint256 amountDonated = campaign.donations[donator];

        if (amountDonated > 0) {
            campaign.donations[donator] = 0;
            donator.transfer(amountDonated);
            emit DonationWithdrew(_campaignId, donator, amountDonated);
        }
    }

    campaign.isActive = false; // Set the campaign as inactive
 }


    

}