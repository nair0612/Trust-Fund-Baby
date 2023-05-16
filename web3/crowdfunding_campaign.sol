// SPDX-License-Identifier: GPL-3.1

pragma solidity >=0.7.0 <0.9.0;

import "./campaign_token.sol";

contract CrowdFundingCampaign{
    // campaign info
    address payable public owner;
    string public title;
    string public description;
    uint256 public goal;
    uint256 public creationDate;
    uint256 public deadline;
    string public profileImage;
    uint256 public status;
    address[] public donorAddresses;
    mapping(address => uint256) public donations;

    // security variables
    bool private locked;
    mapping(address => uint256) private requestsTimestamps;
    uint256 private constant REQUEST_INTERVAL = 5 seconds;

    // token variables
    string public tokenName;
    string public tokenSymbol;
    uint256 public tokenPrice;
    uint256 public tokenSupply;
    uint256 public tokenRemain;
    address public tokenAddress;
    bool private tokenCreated;

    // events
    event CampaignCreated(address indexed owner, string title);
    event TokensDonated(address indexed donor, uint256 tokens);
    event TokensWithdrawn(address indexed donor, uint256 tokens);
    event CampaignTerminated();

    // modifier: only owner can call
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    // modifier: owner cannot call
    modifier notOwner(){
        require(msg.sender != owner, "Caller should not be owner");
        _;
    }

    // modifier: only donor can call
    modifier onlyDonor() {
        require(donations[msg.sender] > 0, "Caller is not donor");
        _;
    }

    // modifier: only after token has been created

    // modifier: only active campaigns can call
    modifier onlyActive() {
        require(status == 1, "Campaign is not active");
        _;
    }

    // modifier: only ended campaigns can call
    modifier onlyEnded() {
        require(status == 0, "Campaign is not ended");
        _;
    }

    // modifier: prevent reentrancy attack
    modifier noReentrancy() {
        require(!locked, "No Reentrancy");
        locked = true;
        _;
        locked = false;
    }

    // modifier: prevent DOS attack
    modifier rateLimiter() {
        require(block.timestamp >= requestsTimestamps[msg.sender] + REQUEST_INTERVAL, "Rate limit exceeded");
        _;
        requestsTimestamps[msg.sender] = block.timestamp;
    }

    // constructor: initialize the campaign
    constructor(
        // campaign info
        address payable _owner,
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
    ) {
        // campaign info
        owner = _owner;
        title = _title;
        description = _description;
        require(_goal == _tokenPrice * _tokenSupply, "Campaign Creation failed: Goal does not match the token price and number of tokens");
        goal = _goal;
        creationDate = block.timestamp;
        deadline = creationDate + _durationInDays * 1 days;
        profileImage = _profileImage;
        status = 1;
        tokenRemain = _tokenSupply;

        // token info
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        tokenPrice = _tokenPrice;
        tokenSupply = _tokenSupply;
        tokenCreated = false;

        emit CampaignCreated(owner, title);
    }

    // function: donor donate to campaign (before campaign ends)
    function donateToCampaign(uint256 _numOfTokensDonate) public payable onlyActive {
        updateStatus();
        require(msg.value == _numOfTokensDonate * tokenPrice, "Donation failed: Invalid donation amount");
        require(tokenRemain >= _numOfTokensDonate, "Donation failed: Not enough tokens remain");
        
        donorAddresses.push(msg.sender);
        donations[msg.sender] += _numOfTokensDonate;
        tokenRemain -= _numOfTokensDonate;
        if (tokenRemain == 0) {
            updateStatus();
        }

        emit TokensDonated(msg.sender, _numOfTokensDonate);
    }

    function updateStatus() internal onlyActive {
        if (tokenRemain == 0 || block.timestamp >= deadline) {
            status = 0;
            createNewToken();
            distributeTokens();
        }
    }

    // function: donor withdraw from donated campaign (before campaign ends)
    function withdrawFromCampaign(uint256 _numOfTokensWithdraw) public payable noReentrancy onlyActive onlyDonor{
        updateStatus();
        require(donations[msg.sender] >= _numOfTokensWithdraw, "Withdraw failed: Not enough tokens donated");

        uint256 amountToWithdraw = _numOfTokensWithdraw * tokenPrice;
        payable(msg.sender).transfer(amountToWithdraw);
        donations[msg.sender] -= _numOfTokensWithdraw;
        tokenRemain += _numOfTokensWithdraw;

        emit TokensWithdrawn(msg.sender, _numOfTokensWithdraw);
    }

    // function: dev withdraw from campaign (after campaign ends)
    function devWithdraw(uint256 _amountWithdraw) public payable onlyOwner noReentrancy onlyEnded{
        require(address(this).balance >= _amountWithdraw, "Dev Withdraw failed: Insufficient balance");

        payable(msg.sender).transfer(_amountWithdraw);
    }

    // function: dev terminate the campaign (before campaign ends)
    function terminateCampaign() public onlyOwner onlyActive{
        updateStatus();
        status = 2;
    }

    // function: donor withdraw from terminated campaign (after terminated)
    function withdrawFromTerminatedCampaign() public payable noReentrancy onlyDonor{
        require(status == 2);
        require(donations[msg.sender] >= 1, "Withdraw from Terminated failed: You have no donations");

        uint256 amountToWithdraw = donations[msg.sender] * tokenPrice;
        payable(msg.sender).transfer(amountToWithdraw);
        donations[msg.sender] = 0;
    }

    // function: mint new tokens (after campaign ends)
    function createNewToken() public onlyEnded returns (address) {
        require(!tokenCreated, "Create Token failed: Tokens already minted");
        CampaignToken newCampaignToken = new CampaignToken(
            tokenName,
            tokenSymbol,
            tokenSupply
        );
        tokenAddress = address(newCampaignToken);
        tokenCreated = true;

        return address(newCampaignToken);
    }

    // function: transfer the tokens to donor (after campaign ends)
    function distributeTokens() public onlyEnded noReentrancy {
        require(tokenCreated, "Transfer Token failed: Tokens not created");
        for (uint256 i=0; i < donorAddresses.length; i++) {
            address donor = donorAddresses[i];
            uint256 tokens = donations[donor] * 1e18;
            if (tokens > 0) {
                CampaignToken(tokenAddress).transfer(donor, tokens);
                donations[donor] = 0;
            }
        }
    }

    function redeemTokens(uint256 _numOfTokens) public noReentrancy {
        
    }

}