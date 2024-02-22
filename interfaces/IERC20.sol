// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    
    // Returns the name of the token.
    // This function can be called by any external party.
    // It retrieves and returns the name of the token as a string.
    function name() external view returns (string memory);

    // Returns the symbol of the token.
    // This function can be called by any external party.
    // It retrieves and returns the symbol of the token as a string.
    function symbol() external view returns (string memory);

    // Returns the number of decimals used to display token amounts.
    // This function can be called by any external party.
    // It returns a fixed value indicating the number of decimal places used.
    function decimals() external pure returns (uint);

    // Returns the total supply of the token.
    // This function can be called by any external party.
    // It retrieves and returns the total supply of the token as a uint.
    function totalSupply() external view returns (uint);

    // Returns the balance of the specified address.
    // This function can be called by any external party.
    // It takes an address as input and returns the balance of that address as a uint.
    function balanceOf(address account) external view returns (uint);

    // Transfers tokens from the caller's account to the specified recipient.
    // This function can be called by any external party.
    // It transfers tokens from the caller's account to the specified recipient's account.
    // This function emits a Transfer event to indicate the token transfer.
    function transfer(address to, uint amount) external;

    // Returns the remaining allowance of tokens that the spender is allowed to spend on behalf of the owner.
    // This function can be called by any external party.
    // It retrieves and returns the remaining allowance of tokens that the spender is allowed to spend on behalf of the owner.
    function allowance(address _owner, address spender) external view returns (uint);

    // Sets the allowance for the spender to spend tokens from the owner's account.
    // This function can be called by the owner of the tokens.
    // It sets the allowance for the spender to spend tokens from the owner's account.
    // This function emits an Approve event to indicate the approval.
    function approve(address spender, uint amount) external;

    // Transfers tokens from the sender's account to the recipient's account using the allowance mechanism.
    // This function can be called by the token holder.
    // It transfers tokens from the sender's account to the recipient's account using the allowance mechanism.
    // This function emits a Transfer event to indicate the token transfer.
    // This function requires approval to transfer tokens on behalf of the owner.
    function transferFrom(address sender, address recipient, uint amount) external;

    // Event emitted when tokens are transferred from one address to another.
    // This event is emitted whenever tokens are transferred from one address to another.
    // It includes parameters for the sender's address, the recipient's address, and the transferred amount.
    event Transfer(address indexed from, address indexed to, uint amount);

    // Event emitted when the approval of a spender to spend tokens on behalf of the owner is set.
    // This event is emitted whenever the approval of a spender to spend tokens on behalf of the owner is set.
    // It includes parameters for the owner's address, the spender's address, and the approved amount.
    event Approve(address indexed owner, address indexed spender, uint amount);
}