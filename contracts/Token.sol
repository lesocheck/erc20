// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IERC20.sol";

contract Erc20Token is IERC20 {
    uint totalTokens;
    address owner;
    string _name;
    string _symbol;
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowances;

    modifier onlyOwner() {
        require(msg.sender == owner, "Access denied!");
        _;
    }

    constructor(string memory tokenName, string memory tokenSymbol, uint initialSupply) {
        _name = tokenName;
        _symbol = tokenSymbol;
        owner = msg.sender;
        mint(owner, initialSupply);
    }

    // Token name
    function name() external view returns(string memory) {
        return _name;
    }

    // Token symbol
    function symbol() external view returns(string memory) {
        return _symbol;
    }

    // A number of simbols after comma
    function decimals() external pure returns(uint) {
        return 8;
    }

    // Total number of tokens
    function totalSupply() external view returns(uint) {
        return totalTokens;
    }

    // How many tokens should be at the current address
    function balanceOf(address account) public view returns(uint) {
        return balances[account];
    }

    // Number of tokens sent from totalSupply to the user
    function transfer(address to, uint amount) external {
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    // Ability to change tokens between users
    function transferFrom(address sender, address recipient, uint amount) public {
        allowances[sender][recipient] -= amount; 
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }
    
    // Consent to send tokens
    function approve(address spender, uint amount) public {
        allowances[msg.sender][spender] = amount;
        emit Approve(msg.sender, spender, amount);
    }
    
    // Checking if a user can send a specified number of tokens to another user
    function allowance(address _owner, address spender) public view returns(uint) {
        return allowances[_owner][spender];
    }

    // Token emission
    function mint(address to, uint256 amount) public onlyOwner {
        balances[to] += amount;
        totalTokens += amount;
        emit Transfer(address(0), to, amount);
    }

    // Token burning
    function burn(address from, uint amount) public onlyOwner {
        balances[from] -= amount;
        totalTokens -= amount;
    }
}
