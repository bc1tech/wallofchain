pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/access/roles/MinterRole.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "eth-token-recover/contracts/TokenRecover.sol";
import "solidity-linked-list/contracts/StructuredLinkedList.sol";

contract WallOfChainToken is ERC721Full, TokenRecover, MinterRole {
  using StructuredLinkedList for StructuredLinkedList.List;

  StructuredLinkedList.List list;

  struct WallStructure {
    uint256 value;
    string firstName;
    string lastName;
    uint256 pattern;
    uint256 icon;
  }

  bool public mintingFinished = false;

  uint256 public progressiveId = 0;

  // Mapping from token ID to the structures
  mapping(uint256 => WallStructure) structureIndex;

  modifier canGenerate() {
    require(
      !mintingFinished,
      "Minting is finished"
    );
    _;
  }

  constructor(string _name, string _symbol) public
  ERC721Full(_name, _symbol)
  {}

  /**
   * @dev Function to stop minting new tokens.
   */
  function finishMinting() public onlyOwner canGenerate {
    mintingFinished = true;
  }

  function newToken(
    address _beneficiary,
    uint256 _value,
    string _firstName,
    string _lastName,
    uint256 _pattern,
    uint256 _icon
  )
    public
    canGenerate
    onlyMinter
    returns (uint256)
  {
    uint256 tokenId = progressiveId.add(1);
    _mint(_beneficiary, tokenId);
    structureIndex[tokenId] = WallStructure(
      _value,
      _firstName,
      _lastName,
      _value == 0 ? 0 : _pattern,
      _value == 0 ? 0 : _icon
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
    onlyMinter
    returns (uint256)
  {
    require(
      _exists(_tokenId),
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
      value == 0 ? 0 : _pattern,
      value == 0 ? 0 : _icon
    );

    return _tokenId;
  }

  function getWall (
    uint256 _tokenId
  )
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
      _exists(_tokenId),
      "Token must exists"
    );

    WallStructure storage wall = structureIndex[_tokenId];

    tokenOwner = ownerOf(_tokenId);

    value = wall.value;
    firstName = wall.firstName;
    lastName = wall.lastName;
    pattern = wall.pattern;
    icon = wall.icon;
  }

  function getValue (uint256 _tokenId) public view returns (uint256) {
    require(
      _exists(_tokenId),
      "Token must exists"
    );
    WallStructure storage wall = structureIndex[_tokenId];
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
  function burn(uint256 _tokenId) public {
    address tokenOwner = isOwner() ? ownerOf(_tokenId) : msg.sender;
    super._burn(tokenOwner, _tokenId);
    list.remove(_tokenId);
    delete structureIndex[_tokenId];
  }
}
