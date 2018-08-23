pragma solidity ^0.4.24;

import "./token/ERC721RBACMintableToken.sol";
import "./libraries/OrderedLinkedListLib.sol";


contract WallOfChainToken is ERC721RBACMintableToken {
  using OrderedLinkedListLib for OrderedLinkedListLib.OrderedLinkedList;

  OrderedLinkedListLib.OrderedLinkedList list;

  struct WallStructure {
    uint256 value;
    string firstName;
    string lastName;
    uint256 pattern;
    uint256 icon;
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
    uint256 _pattern,
    uint256 _icon
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

    uint256 position = list.getSortedSpot(StructureInterface(this), _value);
    list.insertBefore(position, tokenId);

    return tokenId;
  }

  function editToken (
    uint256 _tokenId,
    uint256 _value,
    string _firstName,
    string _lastName,
    uint256 _pattern,
    uint256 _icon
  )
  public
  hasMintPermission
  returns (uint256)
  {
    require(
      exists(_tokenId),
      "Token must exists"
    );

    uint256 value = getValue(_tokenId);

    if (_value > 0) {
      value = value.add(_value); // add the new value sent

      // reorder the list
      list.remove(_tokenId);
      uint256 position = list.getSortedSpot(StructureInterface(this), value);
      list.insertBefore(position, _tokenId);
    }

    structureIndex[_tokenId] = WallStructure(
      value,
      _firstName,
      _lastName,
      _pattern,
      _icon
    );

    return _tokenId;
  }

  function getWall (uint256 tokenId)
  public
  view
  returns (
    address tokenOwner,
    uint256 value,
    string firstName,
    string lastName,
    uint256 pattern,
    uint256 icon
  )
  {
    require(
      exists(tokenId),
      "Token must exists"
    );

    WallStructure storage wall = structureIndex[tokenId];

    tokenOwner = ownerOf(tokenId);

    value = wall.value;
    firstName = wall.firstName;
    lastName = wall.lastName;
    pattern = wall.pattern;
    icon = wall.icon;
  }

  function getValue (uint256 tokenId) public view returns (uint256) {
    require(
      exists(tokenId),
      "Token must exists"
    );
    WallStructure storage wall = structureIndex[tokenId];
    return wall.value;
  }

  function getNextNode(uint256 _tokenId) public view returns (bool, uint256) {
    return list.getNextNode(_tokenId);
  }

  function getPreviousNode(
    uint256 _tokenId
  )
  public
  view
  returns (bool, uint256)
  {
    return list.getPreviousNode(_tokenId);
  }

  /**
   * @dev Only contract owner or token owner can burn
   */
  function burn(uint256 tokenId) public {
    address tokenOwner = msg.sender == owner ? ownerOf(tokenId) : msg.sender;
    super._burn(tokenOwner, tokenId);
    list.remove(tokenId);
    delete structureIndex[tokenId];
  }
}
