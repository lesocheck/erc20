// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IERC20.sol";


contract Erc20Token is IERC20 {
    uint totalTokens; // Total supply of tokens
    address owner; // Address of the contract owner
    string _name; // Name of the token
    string _symbol; // Symbol (ticker) of the token
    mapping(address => uint) balances; // Mapping of account balances
    mapping(address => mapping(address => uint)) allowances; // Mapping of allowances for spender addresses

    modifier onlyOwner() {
        require(msg.sender == owner, "Access denied!");
        _;
    }

    modifier checkBalanceForEnoughTokens(address from, uint amount) {
        require(balances[from] >= amount, "Insufficient tokens available!");
        _;
    }

    constructor(string memory tokenName, string memory tokenSymbol) {
        _name = tokenName;
        _symbol = tokenSymbol;
        owner = msg.sender;
    }

    // Function to return the name of the token (see IERC20)
    function name() external view returns(string memory) {
        return _name;
    }

    // Function to return the symbol of the token (see IERC20)
    function symbol() external view returns(string memory) {
        return _symbol;
    }

    // Function to return the number of decimals used to display token amounts (see IERC20)
    function decimals() external pure returns(uint) {
        return 18; // Decimals are often set to 18 in ERC20 tokens
    }

    // Function to return the total supply of the token (see IERC20)
    function totalSupply() external view returns(uint) {
        return totalTokens;
    }

    // Function to return the balance of the specified account (see IERC20)
    function balanceOf(address account) public view returns(uint) {
        return balances[account];
    }

    // Function to transfer tokens from the caller's account to the specified recipient (see IERC20)
    function transfer(address to, uint amount) external checkBalanceForEnoughTokens(msg.sender, amount) {
        require(to != address(0), 'Recipient address is not valid');

        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    // Function to transfer tokens from one account to another using the allowance mechanism (see IERC20)
    function transferFrom(address sender, address recipient, uint amount) public checkBalanceForEnoughTokens(sender, amount) {
        require(sender != address(0), 'Sender address is not valid');
        require(recipient != address(0), 'Recipient address is not valid');
        require(allowances[sender][msg.sender] >= amount, "Allowance exceeded");
        
        allowances[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }
    
    // Function to approve a spender to spend tokens on behalf of the caller (see IERC20)
    function approve(address spender, uint amount) public {
        allowances[msg.sender][spender] = amount;
        emit Approve(msg.sender, spender, amount);
    }
    
    // Function to return the remaining allowance of tokens that a spender is allowed to spend on behalf of an owner (see IERC20)
    function allowance(address _owner, address spender) public view returns(uint) {
        return allowances[_owner][spender];
    }

    // Function to mint new tokens and assign them to the specified account 
    function mint(address to, uint256 amount) public onlyOwner {
        totalTokens += amount;
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    // Function to burn tokens from the specified account 
    function burn(address from, uint amount) public onlyOwner checkBalanceForEnoughTokens(from, amount) {
        totalTokens -= amount;
        balances[from] -= amount;
    }
}
