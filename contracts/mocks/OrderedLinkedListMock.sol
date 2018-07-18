pragma solidity ^0.4.24;

import "../libraries/OrderedLinkedListLib.sol";


contract OrderedLinkedListMock {
  using OrderedLinkedListLib for OrderedLinkedListLib.OrderedLinkedList;

  OrderedLinkedListLib.OrderedLinkedList list;

  event LogNotice(string msg);

  function listExists() public view returns (bool) {
    return list.listExists();
  }

  /// @dev checks to see if a node exists
  function nodeExists(uint256 _node) public view returns (bool) {
    return list.nodeExists(_node);
  }

  /// @dev Returns the number of elements in the list
  function sizeOf() public view returns (uint256 numElements) {
    return list.sizeOf();
  }

  /// @dev Returns the links of a node as and array
  /// @param _node id of the node to get
  function getNode(uint256 _node) public view returns (bool, uint256, uint256) {
    return list.getNode(_node);
  }

  /// @dev Returns the link of a node `n` in direction `d`.
  /// @param _node id of the node to step from
  /// @param _direction direction to step in
  function getAdjacent(uint256 _node, bool _direction) public view returns (bool, uint256) {
    return list.getAdjacent(_node, _direction);
  }

  /// @dev Returns the link of a node `n` in direction `NEXT`.
  /// @param _node id of the node to step from
  function getNextNode(uint256 _node) public view returns (bool, uint256) {
    return list.getNextNode(_node);
  }

  /// @dev Returns the link of a node `n` in direction `PREV`.
  /// @param _node id of the node to step from
  function getPreviousNode(uint256 _node) public view returns (bool, uint256) {
    return list.getPreviousNode(_node);
  }

  /// @dev Can be used before `insert` to build an ordered list
  /// @param _value value to seek
  //  @return next first node with a value less than _value
  function getSortedSpot(WallOfChainToken _token, uint256 _value) public view returns (uint256 next) {
    return list.getSortedSpot(_token, _value);
  }

  /// @dev Insert node `_new` beside existing node `_node` in direction `_direction`.
  /// @param _node existing node
  /// @param _new  new node to insert
  /// @param _direction direction to insert node in
  function insert(uint256 _node, uint256 _new, bool _direction) public {
    list.insert(_node, _new, _direction);
  }

  /// @dev Insert node `_new` beside existing node `_node` in direction `NEXT`.
  /// @param _node existing node
  /// @param _new  new node to insert
  function insertAfter(uint256 _node, uint256 _new) public {
    list.insertAfter(_node, _new);
  }

  /// @dev Insert node `_new` beside existing node `_node` in direction `PREV`.
  /// @param _node existing node
  /// @param _new  new node to insert
  function insertBefore(uint256 _node, uint256 _new) public {
    list.insertBefore(_node, _new);
  }

  /// @dev removes an entry from the linked list
  /// @param _node node to remove from the list
  function remove(uint256 _node) public returns (uint256) {
    return list.remove(_node);
  }

  /// @dev pushes an enrty to the head of the linked list
  /// @param _node new entry to push to the head
  /// @param _direction push to the head (NEXT) or tail (PREV)
  function push(uint256 _node, bool _direction) public {
    list.push(_node, _direction);
  }

  /// @dev pops the first entry from the linked list
  /// @param _direction pop from the head (NEXT) or the tail (PREV)
  function pop(bool _direction) public returns (uint256) {
    return list.pop(_direction);
  }
}
