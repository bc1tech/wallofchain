pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./WallOfChainToken.sol";


contract WallOfChainMarket {
  using SafeMath for uint256;

  // The token being sold
  WallOfChainToken public token;

  // Address where funds are collected
  address public wallet;

  // Amount of wei raised
  uint256 public weiRaised;

  /**
   * Event for token purchase logging
   * @param purchaser who paid for the tokens
   * @param beneficiary who got the tokens
   * @param value weis paid for purchase
   * @param tokenId the token id purchased
   */
  event TokenPurchase(
    address indexed purchaser,
    address indexed beneficiary,
    uint256 value,
    uint256 tokenId
  );

  /**
   * @param _wallet Address where collected funds will be forwarded to
   * @param _token Address of the token being sold
   */
  constructor(address _wallet, WallOfChainToken _token) public {
    require(
      _wallet != address(0),
      "Wallet can't be the zero address"
    );
    require(
      _token != address(0),
      "Token can't be the zero address"
    );

    wallet = _wallet;
    token = _token;
  }

  /**
   * @dev low level token purchase ***DO NOT OVERRIDE***
   */
  function buyToken(
    address beneficiary,
    string _firstName,
    string _lastName,
    uint256 _pattern,
    uint256 _icon
  )
  public
  payable
  {
    uint256 weiAmount = msg.value;

    _preValidatePurchase(beneficiary);

    // update state
    weiRaised = weiRaised.add(weiAmount);

    uint256 lastTokenId = _processPurchase(
      beneficiary,
      weiAmount,
      _firstName,
      _lastName,
      _pattern,
      _icon
    );

    emit TokenPurchase(
      msg.sender,
      beneficiary,
      weiAmount,
      lastTokenId
    );

    _forwardFunds();
  }

  // -----------------------------------------
  // Internal interface (extensible)
  // -----------------------------------------

  /**
   * @dev Validation of an incoming purchase. Use require statements to revert state when conditions are not met. Use super to concatenate validations.
   * @param _beneficiary Address performing the token purchase
   */
  function _preValidatePurchase(
    address _beneficiary
  )
  internal
  pure
  {
    require(
      _beneficiary != address(0),
      "Beneficiary can't be the zero address"
    );
  }

  /**
   * @dev Executed when a purchase has been validated and is ready to be executed.
   */
  function _processPurchase(
    address _beneficiary,
    uint256 _weiAmount,
    string _firstName,
    string _lastName,
    uint256 _pattern,
    uint256 _icon
  )
  internal
  returns (uint256)
  {
    return token.newToken(
      _beneficiary,
      _weiAmount,
      _firstName,
      _lastName,
      _pattern,
      _icon
    );
  }

  /**
   * @dev Determines how ETH is stored/forwarded on purchases.
   */
  function _forwardFunds() internal {
    wallet.transfer(msg.value);
  }
}
