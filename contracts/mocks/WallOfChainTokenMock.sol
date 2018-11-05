pragma solidity ^0.4.24;

import "../WallOfChainToken.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721MetadataMintable.sol"; // solium-disable-line max-len

contract WallOfChainTokenMock is WallOfChainToken, ERC721Mintable, ERC721MetadataMintable { // solium-disable-line max-len

  constructor(string _name, string _symbol)
  public
  WallOfChainToken(_name, _symbol)
  { }

  // solium-disable-next-line max-len
  function mint(address to, uint256 tokenId) public canGenerate returns (bool) {
    _mint(to, tokenId);
    return true;
  }

  function exists(uint256 tokenId) public view returns (bool) {
    return _exists(tokenId);
  }

  function setTokenURI(uint256 tokenId, string uri) public {
    _setTokenURI(tokenId, uri);
  }

  function removeTokenFrom(address from, uint256 tokenId) public {
    _removeTokenFrom(from, tokenId);
  }
}
