import { advanceBlock } from './helpers/advanceToBlock';
import assertRevert from './helpers/assertRevert';

import ether from './helpers/ether';

import shouldBeAnERC721RBACMintableToken from './ERC721/ERC721RBACMintableToken.behaviour';

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
      pattern: 'yellow',
      icon: 'default',
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
        pattern.should.be.equal(this.structure.pattern);
      });

      it('has a icon', async function () {
        const icon = tokenStructure[5];
        icon.should.be.equal(this.structure.icon);
      });

      describe('if token id not exists', function () {
        it('reverts', async function () {
          await assertRevert(this.token.getWall(999));
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
  });

  context('like an ERC721RBACMintableToken', function () {
    beforeEach(async function () {
      await this.token.addMinter(minter, { from: creator });
    });

    shouldBeAnERC721RBACMintableToken(accounts, creator, minter, name, symbol);
  });
});
