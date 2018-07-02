pragma solidity ^0.4.24;

import "./ERC721RBACMintableToken.sol";


contract WallOfChainToken is ERC721RBACMintableToken {
  struct WallStructure {
    uint256 value;
    string firstName;
    string lastName;
    string pattern;
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
    string _firstName,
    string _lastName,
    string _pattern,
    string _icon
  )
  public
  returns (uint256)
  {
    uint256 tokenId = progressiveId.add(1);
    _mint(_beneficiary, tokenId);
    structureIndex[tokenId] = WallStructure(
      _value,
      _firstName,
      _lastName,
      _pattern,
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
    string firstName,
    string lastName,
    string pattern,
    string icon
  )
  {
    require(exists(tokenId));

    WallStructure storage wall = structureIndex[tokenId];

    tokenOwner = ownerOf(tokenId);

    value = wall.value;
    firstName = wall.firstName;
    lastName = wall.lastName;
    pattern = wall.pattern;
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
