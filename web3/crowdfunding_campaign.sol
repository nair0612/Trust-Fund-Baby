// SPDX-License-Identifier: GPL-3.1

pragma solidity >=0.7.0 <0.9.0;

contract CrowdFundingCampaign{
    address payable public owner;
    string public title;
    string public description;
    uint256 public goal;
    uint256 public tokenPrice;
    uint256 public totalNumOfTokens;
    uint256 public remainNumOfTokens;
    uint256 public creationDate;
    uint256 public deadline;
    string public profileImage;
    uint256 public status;
    mapping(address => uint256) public donations;
    bool internal locked;

    event CampaignCreated(address indexed owner, string title);
    event TokensDonated(address indexed donor, uint256 tokens);
    event TokensWithdrawn(address indexed donor, uint256 tokens);
    event CampaignTerminated();

    modifier onlyOwner(){
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    modifier onlyActive(){
        require(status == 1, "Campaign is not active");
        _;
    }

    modifier noReentrancy(){
        require(!locked, "No Reentrancy");
        locked = true;
        _;
        locked = false;
    }

    constructor(
        address payable _owner,
        string memory _title,
        string memory _description,
        uint256 _goal,
        uint256 _tokenPrice,
        uint256 _totalNumOfTokens,
        uint256 _durationInDays,
        string memory _profileImage
    ) {
        owner = _owner;
        title = _title;
        description = _description;
        require(_goal == _tokenPrice * _totalNumOfTokens, "Campaign Creation failed: Goal does not match the token price and number of tokens");
        goal = _goal;
        tokenPrice = _tokenPrice;
        totalNumOfTokens = _totalNumOfTokens;
        remainNumOfTokens = _totalNumOfTokens;
        creationDate = block.timestamp;
        deadline = creationDate + _durationInDays * 1 days;
        profileImage = _profileImage;
        status = 1;

        emit CampaignCreated(owner, title);
    }

    function donateToCampaign(uint256 _numOfTokensDonate) public payable onlyActive{
        updateStatus();
        require(msg.value == _numOfTokensDonate * tokenPrice, "Donation failed: Invalid donation amount");
        require(remainNumOfTokens >= _numOfTokensDonate, "Donation failed: Not enough tokens remain");
        
        donations[msg.sender] += _numOfTokensDonate;
        remainNumOfTokens -= _numOfTokensDonate;

        emit TokensDonated(msg.sender, _numOfTokensDonate);
    }

    function updateStatus() internal {
        require(status == 1);
        if (remainNumOfTokens == 0 || block.timestamp >= deadline) {
            status = 0;
        }
    }

    function withdrawFromCampaign(uint256 _numOfTokensWithdraw) public payable noReentrancy onlyActive{
        updateStatus();
        require(donations[msg.sender] >= _numOfTokensWithdraw, "Withdraw failed: Not enough tokens donated");

        uint256 amountToWithdraw = _numOfTokensWithdraw * tokenPrice;
        payable(msg.sender).transfer(amountToWithdraw);
        donations[msg.sender] -= _numOfTokensWithdraw;
        remainNumOfTokens += _numOfTokensWithdraw;

        emit TokensWithdrawn(msg.sender, _numOfTokensWithdraw);
    }

    function devWithdraw(uint256 _amountWithdraw) public payable onlyOwner noReentrancy{
        updateStatus();
        require(status == 0, "Dev Withdraw failed: You cannot withdraw from active or terminated campaign");
        require(address(this).balance >= _amountWithdraw, "Dev Withdraw failed: Insufficient balance");

        payable(msg.sender).transfer(_amountWithdraw);
    }

    function terminateCampaign() public onlyOwner onlyActive{
        updateStatus();

        status = 2;
    }

    function withdrawFromTerminatedCampaign() public payable noReentrancy{
        require(status == 2);
        require(donations[msg.sender] >= 1, "Withdraw from Terminated failed: You have no donations");

        uint256 amountToWithdraw = donations[msg.sender] * tokenPrice;
        payable(msg.sender).transfer(amountToWithdraw);
        donations[msg.sender] = 1;
    }

}