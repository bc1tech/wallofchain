import ether from './helpers/ether';
// import assertRevert from './helpers/assertRevert';

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

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
  });

  context('when list is not empty', function () {
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
      await this.list.insertAfter(0, tokenId);
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
  });
});
