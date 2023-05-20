// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.3/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.3/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.3/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract CampaignToken is ERC20Capped, ERC20Burnable {
    address public factoryAddress;
    uint256 private fee;

    constructor(
        string memory name,
        string memory symbol,
        uint256 supply,
        address _factoryAddress,
        uint256 _fee
        ) ERC20(name, symbol) ERC20Capped(supply * 1e18){
        _mint(msg.sender, supply * 1e18);
        factoryAddress = _factoryAddress;
        fee = _fee;
    }

    function _mint(address account, uint256 amount) internal virtual override (ERC20Capped, ERC20){
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

    function _transfer(address sender, address recipient, uint256 amount) internal virtual override {
        super._transfer(sender, recipient, amount);
        payable(factoryAddress).transfer(fee);
    }
}