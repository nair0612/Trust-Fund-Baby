// SPDX-License-Identifier: GPL-3.1

pragma solidity >=0.7.0 <0.9.0;

import "./campaign_token.sol";

contract CrowdFundingCampaign{
    // campaign info
    address payable public owner;
    string public title;
    string public description;
    uint256 public goal;
    uint256 public deadline;
    string public profileImage;
    uint256 public status;
    address[] public donorAddresses;
    mapping(address => uint256) public donations;
    address payable private factoryAddress;

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
    event TokensDonated(address indexed donor, uint256 tokens, address _address);
    event TokensWithdrawn(address indexed donor, uint256 tokens, address _address);
    event CampaignTerminated(address indexed donor, address _address);

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
    modifier afterTokenCreation() {
        require(tokenCreated, "Token has not been created");
        _;
    }

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
        uint256 _deadline,
        string memory _profileImage,
        // token info
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _tokenPrice,
        uint256 _tokenSupply,
        // factory info
        address payable _factoryAddress
    ) {
        // campaign info
        owner = _owner;
        title = _title;
        description = _description;
        require(_goal == _tokenPrice * _tokenSupply, "Campaign Creation failed: Goal does not match the token price and number of tokens");
        goal = _goal;
        require(_deadline > block.timestamp, "Campaign Creation Rejected: Deadline needs to be ahead of time");
        deadline = _deadline;
        profileImage = _profileImage;
        status = 1;
        tokenRemain = _tokenSupply;
        // token info
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        tokenPrice = _tokenPrice;
        tokenSupply = _tokenSupply;
        tokenCreated = false;
        // factory info
        factoryAddress = _factoryAddress;
    }

    // function: donor donate to campaign
    function donateToCampaign(uint256 _numOfTokensDonate) public payable onlyActive notOwner{
        updateStatus();
        require(msg.value == _numOfTokensDonate * tokenPrice, "Donation failed: Invalid donation amount");
        require(tokenRemain >= _numOfTokensDonate, "Donation failed: Not enough tokens remain");
        
        donorAddresses.push(msg.sender);
        donations[msg.sender] += _numOfTokensDonate;
        tokenRemain -= _numOfTokensDonate;
        if (tokenRemain == 0) {
            updateStatus();
        }

        emit TokensDonated(msg.sender, _numOfTokensDonate, address(this));
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

        emit TokensWithdrawn(msg.sender, _numOfTokensWithdraw, address(this));
    }

    // function: dev withdraw from campaign (after campaign ends)
    function devWithdraw() public payable onlyOwner noReentrancy onlyEnded afterTokenCreation{
        uint256 balance = address(this).balance;
        require(address(this).balance > 0, "Dev Withdraw failed: Insufficient balance");
        uint256 fee = address(this).balance * 3 / 100;
        collectFees(fee);
        payable(msg.sender).transfer(balance - fee);
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
    function createNewToken() private onlyEnded returns (address) {
        require(!tokenCreated, "Create Token failed: Tokens already minted");
        CampaignToken newCampaignToken = new CampaignToken(
            tokenName,
            tokenSymbol,
            tokenSupply,
            factoryAddress,
            tokenPrice / 50
        );
        tokenAddress = address(newCampaignToken);
        tokenCreated = true;

        return address(newCampaignToken);
    }

    // function: transfer the tokens to donor (after campaign ends)
    function distributeTokens() private onlyEnded noReentrancy afterTokenCreation {
        for (uint256 i=0; i < donorAddresses.length; i++) {
            address donor = donorAddresses[i];
            uint256 tokens = donations[donor] * 1e18;
            if (tokens > 0) {
                CampaignToken(tokenAddress).transfer(donor, tokens);
                donations[donor] = 0;
            }
        }
    }

    // function: redeem tokens
    function redeemTokens(uint256 _numOfTokens) public noReentrancy afterTokenCreation{
        CampaignToken(tokenAddress).approve(address(this), _numOfTokens * 1e18);
        require(CampaignToken(tokenAddress).allowance(msg.sender, address(this)) >= _numOfTokens * 1e18, "Insufficient allowance");
        CampaignToken(tokenAddress).burnFrom(msg.sender, _numOfTokens * 1e18);
    }

    // function: collect fees
    function collectFees(uint256 fee) public payable onlyEnded{
        require(address(this).balance >= fee, "Insufficient contract balance");
        payable(factoryAddress).transfer(fee);
    }

}