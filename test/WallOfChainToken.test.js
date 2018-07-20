import { advanceBlock } from './helpers/advanceToBlock';
import assertRevert from './helpers/assertRevert';

import ether from './helpers/ether';

import shouldBehaveLikeRBACMintableERC721Token from './ERC721/ERC721RBACMintableToken.behaviour';

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const WallOfChainToken = artifacts.require('WallOfChainTokenMock.sol');

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

contract('WallOfChainToken', function (accounts) {
  const name = 'WallOfChainToken';
  const symbol = 'WOC';
  const creator = accounts[0];
  const minter = accounts[1];
  const beneficiary = accounts[2];
  const anotherAccount = accounts[3];
  // const anotherAccount = accounts[3];

  let tokenId;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by ganache
    await advanceBlock();
  });

  beforeEach(async function () {
    this.structure = {
      value: ether(0.1),
      firstName: 'Vittorio',
      lastName: 'Minacori',
      pattern: new BigNumber(1),
      icon: new BigNumber(1),
    };

    this.token = await WallOfChainToken.new(name, symbol, { from: creator });
  });

  context('creating new token', function () {
    beforeEach(async function () {
      await this.token.addMinter(minter, { from: creator });
      await this.token.newToken(
        beneficiary,
        this.structure.value,
        this.structure.firstName,
        this.structure.lastName,
        this.structure.pattern,
        this.structure.icon,
        { from: minter }
      );

      tokenId = await this.token.progressiveId();
    });

    describe('check metadata', function () {
      let tokenStructure;

      beforeEach(async function () {
        tokenStructure = await this.token.getWall(tokenId);
      });

      it('has a tokenOwner', async function () {
        const tokenOwner = tokenStructure[0];
        tokenOwner.should.be.equal(beneficiary);
      });

      it('has a value', async function () {
        const value = tokenStructure[1];
        value.should.be.bignumber.equal(this.structure.value);
      });

      it('has a firstName', async function () {
        const firstName = tokenStructure[2];
        firstName.should.be.equal(this.structure.firstName);
      });

      it('has a lastName', async function () {
        const lastName = tokenStructure[3];
        lastName.should.be.equal(this.structure.lastName);
      });

      it('has a pattern', async function () {
        const pattern = tokenStructure[4];
        pattern.should.be.bignumber.equal(this.structure.pattern);
      });

      it('has a icon', async function () {
        const icon = tokenStructure[5];
        icon.should.be.bignumber.equal(this.structure.icon);
      });

      describe('if token id not exists', function () {
        it('reverts', async function () {
          await assertRevert(this.token.getWall(999));
        });
      });
    });

    describe('get wall value', function () {
      it('is the right value', async function () {
        const tokenValue = await this.token.getWallValue(tokenId);
        tokenValue.should.be.bignumber.equal(this.structure.value);
      });

      describe('if token id not exists', function () {
        it('reverts', async function () {
          await assertRevert(this.token.getWallValue(999));
        });
      });
    });

    describe('progressive id', function () {
      it('should increase', async function () {
        const oldProgressiveId = await this.token.progressiveId();

        await this.token.newToken(
          beneficiary,
          this.structure.value,
          this.structure.firstName,
          this.structure.lastName,
          this.structure.pattern,
          this.structure.icon,
          { from: minter }
        );
        const newProgressiveId = await this.token.progressiveId();

        newProgressiveId.should.be.bignumber.equal(oldProgressiveId.add(1));
      });
    });

    describe('if beneficiary is the zero address', function () {
      it('reverts', async function () {
        await assertRevert(
          this.token.newToken(
            ZERO_ADDRESS,
            this.structure.value,
            this.structure.firstName,
            this.structure.lastName,
            this.structure.pattern,
            this.structure.icon,
            { from: minter }
          )
        );
      });
    });

    describe('if caller has not minter permission', function () {
      it('reverts', async function () {
        await assertRevert(
          this.token.newToken(
            beneficiary,
            this.structure.value,
            this.structure.firstName,
            this.structure.lastName,
            this.structure.pattern,
            this.structure.icon,
            { from: anotherAccount }
          )
        );
      });
    });

    describe('check getNextNode', function () {
      let newTokenId;
      beforeEach(async function () {
        await this.token.newToken(
          beneficiary,
          this.structure.value.add(1),
          this.structure.firstName,
          this.structure.lastName,
          this.structure.pattern,
          this.structure.icon,
          { from: minter }
        );

        newTokenId = await this.token.progressiveId();
      });

      it('should be newTokenId', async function () {
        const expectedToken = await this.token.getNextNode(tokenId);
        expectedToken[0].should.be.equal(true);
        expectedToken[1].should.be.bignumber.equal(newTokenId);
      });
    });

    describe('check getPreviousNode', function () {
      let newTokenId;
      beforeEach(async function () {
        await this.token.newToken(
          beneficiary,
          this.structure.value.sub(1),
          this.structure.firstName,
          this.structure.lastName,
          this.structure.pattern,
          this.structure.icon,
          { from: minter }
        );

        newTokenId = await this.token.progressiveId();
      });

      it('should be newTokenId', async function () {
        const expectedToken = await this.token.getPreviousNode(tokenId);
        expectedToken[0].should.be.equal(true);
        expectedToken[1].should.be.bignumber.equal(newTokenId);
      });
    });
  });

  context('like an ERC721RBACMintableToken', function () {
    beforeEach(async function () {
      await this.token.addMinter(minter, { from: creator });
    });

    shouldBehaveLikeRBACMintableERC721Token(accounts, creator, minter, name, symbol);
  });
});
