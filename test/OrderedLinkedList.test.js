import ether from './helpers/ether';

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const HEAD = 0;

const OrderedLinkedList = artifacts.require('OrderedLinkedListMock.sol');
const WallOfChainToken = artifacts.require('WallOfChainToken.sol');

contract('OrderedLinkedList', function ([owner, minter, beneficiary]) {
  const name = 'WallOfChainToken';
  const symbol = 'WOC';

  const tokenDetails = {
    value: ether(0.1),
    firstName: 'Vittorio',
    lastName: 'Minacori',
    pattern: new BigNumber(1),
    icon: new BigNumber(1),
  };

  beforeEach(async function () {
    this.list = await OrderedLinkedList.new({ from: owner });
    this.token = await WallOfChainToken.new(name, symbol, { from: owner });
    await this.token.addMinter(minter);
  });

  context('when list is empty', function () {
    describe('listExists', function () {
      it('should be false', async function () {
        const exists = await this.list.listExists();
        exists.should.be.equal(false);
      });
    });

    describe('sizeOf', function () {
      it('should be zero', async function () {
        const sizeOf = await this.list.sizeOf();
        sizeOf.should.be.bignumber.equal(0);
      });
    });

    describe('getNode', function () {
      it('should not exists', async function () {
        const node = await this.list.getNode(1);
        node[0].should.be.equal(false);
        node[1].should.be.bignumber.equal(HEAD);
        node[2].should.be.bignumber.equal(HEAD);
      });
    });
  });

  context('when list is not empty (1 node)', function () {
    let tokenId;

    beforeEach(async function () {
      await this.token.newToken(
        beneficiary,
        tokenDetails.value,
        tokenDetails.firstName,
        tokenDetails.lastName,
        tokenDetails.pattern,
        tokenDetails.icon,
        { from: minter }
      );

      tokenId = await this.token.progressiveId();
      await this.list.insertAfter(HEAD, tokenId);
    });

    describe('listExists', function () {
      it('should be true', async function () {
        const exists = await this.list.listExists();
        exists.should.be.equal(true);
      });
    });

    describe('sizeOf', function () {
      it('should be greater than zero', async function () {
        const sizeOf = await this.list.sizeOf();
        sizeOf.should.be.bignumber.gt(0);
      });
    });

    describe('nodeExists', function () {
      it('should be true', async function () {
        const nodeExists = await this.list.nodeExists(tokenId);
        nodeExists.should.be.equal(true);
      });
    });

    describe('getNode', function () {
      it('PREV and NEXT should be HEAD', async function () {
        const node = await this.list.getNode(tokenId);
        node[0].should.be.equal(true);
        node[1].should.be.bignumber.equal(HEAD);
        node[2].should.be.bignumber.equal(HEAD);
      });
    });

    describe('getNextNode of not existent node', function () {
      it('should be false', async function () {
        const node = await this.list.getNextNode(111);
        node[0].should.be.equal(false);
        node[1].should.be.bignumber.equal(HEAD);
      });
    });

    describe('getPreviousNode of not existent node', function () {
      it('should be false', async function () {
        const node = await this.list.getPreviousNode(111);
        node[0].should.be.equal(false);
        node[1].should.be.bignumber.equal(HEAD);
      });
    });

    context('adding more nodes (not ordered)', function () {
      let firstTokenId;
      let secondTokenId;

      beforeEach(async function () {
        await this.token.newToken(
          beneficiary,
          tokenDetails.value,
          tokenDetails.firstName,
          tokenDetails.lastName,
          tokenDetails.pattern,
          tokenDetails.icon,
          { from: minter }
        );

        firstTokenId = await this.token.progressiveId();

        await this.token.newToken(
          beneficiary,
          tokenDetails.value,
          tokenDetails.firstName,
          tokenDetails.lastName,
          tokenDetails.pattern,
          tokenDetails.icon,
          { from: minter }
        );

        secondTokenId = await this.token.progressiveId();
      });

      describe('adding after (2 times)', function () {
        let node;
        let firstNode;
        let secondNode;

        beforeEach(async function () {
          await this.list.insertAfter(tokenId, firstTokenId);
          await this.list.insertAfter(firstTokenId, secondTokenId);
          node = await this.list.getNode(tokenId);
          firstNode = await this.list.getNode(firstTokenId);
          secondNode = await this.list.getNode(secondTokenId);
        });

        it('node PREV should be HEAD', async function () {
          node[1].should.be.bignumber.equal(HEAD);
        });

        it('node NEXT should be firstNode', async function () {
          node[2].should.be.bignumber.equal(firstTokenId);
        });

        it('firstNode PREV should be node', async function () {
          firstNode[1].should.be.bignumber.equal(tokenId);
        });

        it('firstNode NEXT should be secondNode', async function () {
          firstNode[2].should.be.bignumber.equal(secondTokenId);
        });

        it('secondNode PREV should be firstNode', async function () {
          secondNode[1].should.be.bignumber.equal(firstTokenId);
        });

        it('secondNode NEXT should be HEAD', async function () {
          secondNode[2].should.be.bignumber.equal(HEAD);
        });

        context('testing getNextNode', function () {
          describe('using node', function () {
            it('should be firstNode', async function () {
              const retrievedTokenId = await this.list.getNextNode(tokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(tokenId);
              retrievedNode[2].should.be.bignumber.equal(secondTokenId);
            });
          });

          describe('using firstNode', function () {
            it('should be secondNode', async function () {
              const retrievedTokenId = await this.list.getNextNode(firstTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(firstTokenId);
              retrievedNode[2].should.be.bignumber.equal(HEAD);
            });
          });

          describe('using secondNode', function () {
            it('should be HEAD', async function () {
              const retrievedTokenId = await this.list.getNextNode(secondTokenId);
              retrievedTokenId[0].should.be.equal(true);
              retrievedTokenId[1].should.be.bignumber.equal(HEAD);
            });
          });
        });

        context('testing getPreviousNode', function () {
          describe('using node', function () {
            it('should be HEAD', async function () {
              const retrievedTokenId = await this.list.getPreviousNode(tokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(secondTokenId);
              retrievedNode[2].should.be.bignumber.equal(tokenId);
            });
          });

          describe('using firstNode', function () {
            it('should be node', async function () {
              const retrievedTokenId = await this.list.getPreviousNode(firstTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(HEAD);
              retrievedNode[2].should.be.bignumber.equal(firstTokenId);
            });
          });

          describe('using secondNode', function () {
            it('should be firstNode', async function () {
              const retrievedTokenId = await this.list.getPreviousNode(secondTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(tokenId);
              retrievedNode[2].should.be.bignumber.equal(secondTokenId);
            });
          });
        });
      });

      describe('adding before (2 times)', function () {
        let node;
        let firstNode;
        let secondNode;

        beforeEach(async function () {
          await this.list.insertBefore(tokenId, firstTokenId);
          await this.list.insertBefore(firstTokenId, secondTokenId);
          node = await this.list.getNode(tokenId);
          firstNode = await this.list.getNode(firstTokenId);
          secondNode = await this.list.getNode(secondTokenId);
        });

        it('node PREV should be firstNode', async function () {
          node[1].should.be.bignumber.equal(firstTokenId);
        });

        it('node NEXT should be HEAD', async function () {
          node[2].should.be.bignumber.equal(HEAD);
        });

        it('firstNode PREV should be secondNode', async function () {
          firstNode[1].should.be.bignumber.equal(secondTokenId);
        });

        it('firstNode NEXT should be node', async function () {
          firstNode[2].should.be.bignumber.equal(tokenId);
        });

        it('secondNode PREV should be HEAD', async function () {
          secondNode[1].should.be.bignumber.equal(HEAD);
        });

        it('secondNode NEXT should be firstNode', async function () {
          secondNode[2].should.be.bignumber.equal(firstTokenId);
        });

        context('testing getNextNode', function () {
          describe('using node', function () {
            it('should be HEAD', async function () {
              const retrievedTokenId = await this.list.getNextNode(tokenId);
              retrievedTokenId[0].should.be.equal(true);
              retrievedTokenId[1].should.be.bignumber.equal(HEAD);
            });
          });

          describe('using firstNode', function () {
            it('should be node', async function () {
              const retrievedTokenId = await this.list.getNextNode(firstTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(firstTokenId);
              retrievedNode[2].should.be.bignumber.equal(HEAD);
            });
          });

          describe('using secondNode', function () {
            it('should be firstNode', async function () {
              const retrievedTokenId = await this.list.getNextNode(secondTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(secondTokenId);
              retrievedNode[2].should.be.bignumber.equal(tokenId);
            });
          });
        });

        context('testing getPreviousNode', function () {
          describe('using secondNode', function () {
            it('should be HEAD', async function () {
              const retrievedTokenId = await this.list.getPreviousNode(secondTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(tokenId);
              retrievedNode[2].should.be.bignumber.equal(secondTokenId);
            });
          });

          describe('using firstNode', function () {
            it('should be secondNode', async function () {
              const retrievedTokenId = await this.list.getPreviousNode(firstTokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(HEAD);
              retrievedNode[2].should.be.bignumber.equal(firstTokenId);
            });
          });

          describe('using node', function () {
            it('should be HEAD', async function () {
              const retrievedTokenId = await this.list.getPreviousNode(tokenId);
              const retrievedNode = await this.list.getNode(retrievedTokenId[1]);
              retrievedNode[0].should.be.equal(true);
              retrievedNode[1].should.be.bignumber.equal(secondTokenId);
              retrievedNode[2].should.be.bignumber.equal(tokenId);
            });
          });
        });
      });
    });
  });
});
