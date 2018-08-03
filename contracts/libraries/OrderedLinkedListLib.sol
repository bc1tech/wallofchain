pragma solidity ^0.4.24;


contract StructureInterface {
  function getValue (uint256 structureId) public view returns (uint256);
}


/**
 * @title OrderedLinkedListLib
 * @author Vittorio Minacori (@vittominacori), Stefano Finocchiaro (@stefanuc111) for Pane&Design (@paneedesign).
 *
 * This utility library was forked from https://github.com/Modular-Network/ethereum-libraries/tree/master/LinkedListLib
 * It has been updated to add additional functionality and be more compatible with solidity 0.4.24 coding patterns.
*/
library OrderedLinkedListLib {

  uint256 constant NULL = 0;
  uint256 constant HEAD = 0;
  bool constant PREV = false;
  bool constant NEXT = true;

  struct OrderedLinkedList {
    mapping (uint256 => mapping (bool => uint256)) list;
  }

  /// @dev returns true if the list exists
  /// @param self stored linked list from contract
  function listExists(
    OrderedLinkedList storage self
  )
    internal
    view
    returns (bool)
  {
    // if the head nodes previous or next pointers both point to itself, then there are no items in the list
    if (self.list[HEAD][PREV] != HEAD || self.list[HEAD][NEXT] != HEAD) {
      return true;
    } else {
      return false;
    }
  }

  /// @dev returns true if the node exists
  /// @param self stored linked list from contract
  /// @param _node a node to search for
  function nodeExists(
    OrderedLinkedList storage self,
    uint256 _node
  )
    internal
    view
    returns (bool)
  {
    if (self.list[_node][PREV] == HEAD && self.list[_node][NEXT] == HEAD) {
      if (self.list[HEAD][NEXT] == _node) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  /// @dev Returns the number of elements in the list
  /// @param self stored linked list from contract
  function sizeOf(
    OrderedLinkedList storage self
  )
    internal
    view
    returns (uint256 numElements)
  {
    bool exists;
    uint256 i;
    (exists, i) = getAdjacent(self, HEAD, NEXT);
    while (i != HEAD) {
      (exists, i) = getAdjacent(self, i, NEXT);
      numElements++;
    }
    return;
  }

  /// @dev Returns the links of a node as a tuple
  /// @param self stored linked list from contract
  /// @param _node id of the node to get
  function getNode(
    OrderedLinkedList storage self,
    uint256 _node
  )
    internal
    view
    returns (bool, uint256, uint256)
  {
    if (!nodeExists(self, _node)) {
      return (false, 0, 0);
    } else {
      return (true, self.list[_node][PREV], self.list[_node][NEXT]);
    }
  }

  /// @dev Returns the link of a node `_node` in direction `_direction`.
  /// @param self stored linked list from contract
  /// @param _node id of the node to step from
  /// @param _direction direction to step in
  function getAdjacent(
    OrderedLinkedList storage self,
    uint256 _node,
    bool _direction
  )
    internal
    view
    returns (bool, uint256)
  {
    if (!nodeExists(self, _node)) {
      return (false, 0);
    } else {
      return (true, self.list[_node][_direction]);
    }
  }

  /// @dev Returns the link of a node `_node` in direction `NEXT`.
  /// @param self stored linked list from contract
  /// @param _node id of the node to step from
  function getNextNode(
    OrderedLinkedList storage self,
    uint256 _node
  )
    internal
    view
    returns (bool, uint256)
  {
    return getAdjacent(self, _node, NEXT);
  }

  /// @dev Returns the link of a node `_node` in direction `PREV`.
  /// @param self stored linked list from contract
  /// @param _node id of the node to step from
  function getPreviousNode(
    OrderedLinkedList storage self,
    uint256 _node
  )
    internal
    view
    returns (bool, uint256)
  {
    return getAdjacent(self, _node, PREV);
  }

  /// @dev Can be used before `insert` to build an ordered list
  /// @dev This is adapted to our needs. If you want to order basing on other than structure.value edit this function
  /// @param self stored linked list from contract
  /// @param _structure the structure instance
  /// @param _value value to seek
  //  @return next first node with a value less than _value
  function getSortedSpot(
    OrderedLinkedList storage self,
    StructureInterface _structure,
    uint256 _value
  )
  internal view returns (uint256)
  {
    if (sizeOf(self) == 0) {
      return 0;
    }
    bool exists;
    uint256 next;
    (exists, next) = getAdjacent(self, HEAD, NEXT);
    while ((next != 0) && ((_value < _structure.getValue(next)) != NEXT)) {
      next = self.list[next][NEXT];
    }
    return next;
  }

  /// @dev Creates a bidirectional link between two nodes on direction `_direction`
  /// @param self stored linked list from contract
  /// @param _node first node for linking
  /// @param _link  node to link to in the _direction
  function createLink(
    OrderedLinkedList storage self,
    uint256 _node,
    uint256 _link,
    bool _direction
  )
  internal
  {
    self.list[_link][!_direction] = _node;
    self.list[_node][_direction] = _link;
  }

  /// @dev Insert node `_new` beside existing node `_node` in direction `_direction`.
  /// @param self stored linked list from contract
  /// @param _node existing node
  /// @param _new  new node to insert
  /// @param _direction direction to insert node in
  function insert(
    OrderedLinkedList storage self,
    uint256 _node,
    uint256 _new,
    bool _direction
  )
    internal returns (bool)
  {
    if (!nodeExists(self, _new) && nodeExists(self, _node)) {
      uint256 c = self.list[_node][_direction];
      createLink(
        self,
        _node,
        _new,
        _direction
      );
      createLink(
        self,
        _new,
        c,
        _direction
      );
      return true;
    } else {
      return false;
    }
  }

  /// @dev Insert node `_new` beside existing node `_node` in direction `NEXT`.
  /// @param self stored linked list from contract
  /// @param _node existing node
  /// @param _new  new node to insert
  function insertAfter(
    OrderedLinkedList storage self,
    uint256 _node,
    uint256 _new
  )
    internal
    returns (bool)
  {
    return insert(
      self,
      _node,
      _new,
      NEXT
    );
  }

  /// @dev Insert node `_new` beside existing node `_node` in direction `PREV`.
  /// @param self stored linked list from contract
  /// @param _node existing node
  /// @param _new  new node to insert
  function insertBefore(
    OrderedLinkedList storage self,
    uint256 _node,
    uint256 _new
  )
    internal
    returns (bool)
  {
    return insert(
      self,
      _node,
      _new,
      PREV
    );
  }

  /// @dev removes an entry from the linked list
  /// @param self stored linked list from contract
  /// @param _node node to remove from the list
  function remove(
    OrderedLinkedList storage self,
    uint256 _node
  )
    internal
    returns (uint256)
  {
    if ((_node == NULL) || (!nodeExists(self, _node))) {
      return 0;
    }
    createLink(
      self,
      self.list[_node][PREV],
      self.list[_node][NEXT],
      NEXT
    );
    delete self.list[_node][PREV];
    delete self.list[_node][NEXT];
    return _node;
  }

  /// @dev pushes an entry to the head of the linked list
  /// @param self stored linked list from contract
  /// @param _node new entry to push to the head
  /// @param _direction push to the head (NEXT) or tail (PREV)
  function push(
    OrderedLinkedList storage self,
    uint256 _node,
    bool _direction
  )
    internal
    returns (bool)
  {
    return insert(
      self,
      HEAD,
      _node,
      _direction
    );
  }

  /// @dev pops the first entry from the linked list
  /// @param self stored linked list from contract
  /// @param _direction pop from the head (NEXT) or the tail (PREV)
  function pop(
    OrderedLinkedList storage self,
    bool _direction
  )
    internal
    returns (uint256)
  {
    bool exists;
    uint256 adj;

    (exists, adj) = getAdjacent(self, HEAD, _direction);

    return remove(self, adj);
  }
}
