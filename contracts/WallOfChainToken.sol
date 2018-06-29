pragma solidity ^0.4.24;

import "./ERC721RBACMintableToken.sol";


contract WallOfChainToken is ERC721RBACMintableToken {
  struct WallStructure {
    uint256 value;
    string backColor;
    string frontColor;
    string text;
    string icon;
  }

  uint256 public progressiveId = 0;

  // Mapping from token ID to the structures
  mapping(uint256 => WallStructure) structureIndex;

  constructor(string _name, string _symbol) public
  ERC721RBACMintableToken(_name, _symbol)
  {}

  function newToken(
    address _beneficiary,
    uint256 _value,
    string _backColor,
    string _frontColor,
    string _text,
    string _icon
  )
  public
  returns (uint256)
  {
    uint256 tokenId = progressiveId.add(1);
    _mint(_beneficiary, tokenId);
    structureIndex[tokenId] = WallStructure(
      _value,
      _backColor,
      _frontColor,
      _text,
      _icon
    );
    progressiveId = tokenId;
    return tokenId;
  }

  function getWall (uint256 tokenId)
  public
  view
  returns (
    address tokenOwner,
    uint256 value,
    string backColor,
    string frontColor,
    string text,
    string icon
  )
  {
    require(exists(tokenId));

    WallStructure storage wall = structureIndex[tokenId];

    tokenOwner = ownerOf(tokenId);

    value = wall.value;
    backColor = wall.backColor;
    frontColor = wall.frontColor;
    text = wall.text;
    icon = wall.icon;
  }

  /**
   * @dev Only contract owner or token owner can burn
   */
  function burn(uint256 tokenId) public {
    address tokenOwner = msg.sender == owner ? ownerOf(tokenId) : msg.sender;
    super._burn(tokenOwner, tokenId);
    delete structureIndex[tokenId];
  }
}
