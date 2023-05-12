// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CrowdFundingCampaign{
    address payable public owner;
    string public title;
    string public description;
    uint256 public goal;
    uint256 public tokenPrice;
    uint256 public totalNumOfTokens;
    uint256 public remainNumOfTokens;
    uint256 public deadline;
    string public profileImage;
    bool public isActive;
    bool public terminated;
    // todo: creation date
    // todo: three states: active, inactivev, terminated
    mapping(address => uint256) public donations;


    constructor(
        address payable _owner,
        string memory _title,
        string memory _description,
        uint256 _goal,
        uint256 _tokenPrice,
        uint256 _totalNumOfTokens,
        uint256 _duration,
        string memory _profileImage
    ) {
        owner = _owner;
        title = _title;
        description = _description;
        goal = _goal;
        tokenPrice = _tokenPrice;
        totalNumOfTokens = _totalNumOfTokens;
        remainNumOfTokens = _totalNumOfTokens;
        deadline = block.timestamp + _duration;
        profileImage = _profileImage;
        isActive = true;
        terminated = false;
    }

    function donateToCampaign(uint256 _numOfTokensDonate) public payable {
        checkStatus();
        require(isActive, "Campaign is not active");
        require(!terminated, "Camapign has been terminated");
        require(msg.value % tokenPrice == 0, "Invalid donation amount, not full token");
        require(msg.value == _numOfTokensDonate * tokenPrice, "Invalid donation amount, not enough crypto");
        require(remainNumOfTokens >= _numOfTokensDonate, "Not enough tokens left");
        
        donations[msg.sender] += _numOfTokensDonate;
        remainNumOfTokens -= _numOfTokensDonate;
        // Additional logic for updating campaign state or emitting events can be added here
    }

    function checkStatus() public {
        require(isActive, "Campaign is already inactive");
        require(!terminated, "Campaign has been terminated");

        if (remainNumOfTokens == 0 || block.timestamp >= deadline) {
            isActive = false;
        }
    }

    function withdrawFromCampaign(uint256 _numOfTokensWithdraw) public payable {
        checkStatus();
        require(isActive, "Campaign is not active");
        require(!terminated, "Campaign has been terminated");
        require(donations[msg.sender] < _numOfTokensWithdraw, "Invalid number of tokens to withdraw");

        uint256 amountToWithdraw = _numOfTokensWithdraw * tokenPrice;
        payable(msg.sender).transfer(amountToWithdraw);
        donations[msg.sender] -= amountToWithdraw;
        remainNumOfTokens += _numOfTokensWithdraw;
    }

    function devWithdraw(uint256 _amountWithdraw) public payable {
        checkStatus();
        require(msg.sender == owner, "You cannot withdraw, you are not the owner of this campaign");
        require(!isActive, "You cannot withdraw, campaign has not ended yet");
        require(!terminated, "You cannot withdraw, campaign has been terminated");
        require(address(this).balance >= _amountWithdraw, "You cannot withdraw, insufficient funds left");

        payable(msg.sender).transfer(_amountWithdraw);
    }

    function terminateCampaign() public {
        checkStatus();
        require(msg.sender == owner, "You cannot terminate the campaign, you are not the owner of this campaign");
        require(!isActive, "You cannot terminate the campaign, the goal has been reached");
        require(!terminated, "You cannot terminate the campaign, the campaign has been terminated");

        isActive = false;
        terminated = true;
    }

    function withdrawFromTerminatedCampaign() public payable {
        require(terminated == true, "You cannot withdraw, the campaign is still active");
        require(donations[msg.sender] >= 0, "You cannot withdraw, you have no donations in this campaign");

        uint256 amountToWithdraw = donations[msg.sender];
        payable(msg.sender).transfer(amountToWithdraw);
        donations[msg.sender] = 0;
    }

}