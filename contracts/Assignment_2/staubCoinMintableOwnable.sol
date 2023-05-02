// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title staubCoinMintableOwnable
/// @author Christopher Staub
/// @notice This is a simple ERC20 token with a fixed supply and no additional functionality.

contract staubCoinMintableOwnable is IERC20, Ownable {

/// @dev SafeMath is used for all uint256 operations

    using SafeMath for uint256;

/// @dev The token symbol, name, and decimals are immutable. 
/// @dev The total supply is set in the constructor and then minted to the contract creator.

    string public symbol;
    string public name;
    uint8 public decimals;
    uint256 public _totalSupply;

/// @dev The balances mapping keeps track of the token balance of each address.
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed; // allowance of spender to spend owner's tokens 

/// @dev The constructor sets the token symbol, name, and decimals, and mints the initial supply to the contract creator.
    constructor() {
        symbol = "SCMO";
        name = "staubCoinMintableOwnable";
        decimals = 18;
        _totalSupply = 1000000 * 10**uint(decimals); // 1,000,000 tokens with 18 decimals
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }
/// @dev The totalSupply function returns the total token supply.
   function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

/// @dev The balanceOf function returns the token balance of the specified address.
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

/// @dev The transfer function transfers tokens from the sender to the specified recipient.
    function transfer(address _to, uint256 _value) public  returns (bool success) {
        require(balances[msg.sender] >= _value, "Insufficient balance"); /// @dev The sender must have sufficient balance.
        require(_to != address(0), "Cannot send to zero address"); /// @dev The recipient cannot be the zero address.
        balances[msg.sender] = balances[msg.sender].sub(_value); /// @dev The sender's balance is reduced by the amount sent.
        balances[_to] = balances[_to].add(_value); /// @dev The recipient's balance is increased by the amount sent.
        emit Transfer(msg.sender, _to, _value); /// @dev The transfer event is emitted.
        return true; 
    }

/// @dev The allowance function returns the amount of tokens that the spender is allowed to spend on behalf of the owner.
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

/// @dev The approve function allows the spender to spend the specified amount of tokens on behalf of the sender.
    function approve (address _spender, uint256 _value) public returns (bool success) {
        require(_spender != address(0), "Cannot approve zero address");
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

/// @dev The transferFrom function transfers tokens from the specified sender to the specified recipient.
    function transferFrom (address _from, address _to, uint256 _value) public returns (bool success) {
        require(balances[_from] >= _value, "Insufficient balance");
        require(allowed[_from][msg.sender] >= _value, "Insufficient allowance");
        require(_to != address(0), "Cannot send to zero address");
        balances[_from] = balances[_from].sub(_value); 
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value); 
        balances[_to] = balances[_to].add(_value); 
        emit Transfer(_from, _to, _value);
        return true;
    }
}