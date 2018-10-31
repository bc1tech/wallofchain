const { advanceBlock } = require('openzeppelin-solidity/test/helpers/advanceToBlock');
const { ether } = require('openzeppelin-solidity/test/helpers/ether');
const shouldFail = require('openzeppelin-solidity/test/helpers/shouldFail');
const { ZERO_ADDRESS } = require('openzeppelin-solidity/test/helpers/constants');

const { shouldBehaveLikeTokenRecover } = require('eth-token-recover/test/TokenRecover.behaviour');
const { shouldBehaveLikeERC721Full } = require('./ERC721/ERC721Full.behavior');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

const WallOfChainToken = artifacts.require('WallOfChainTokenMock.sol');

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

    this.newStructure = {
      value: ether(0.2),
      firstName: 'Stefano',
      lastName: 'Finocchiaro',
      pattern: new BigNumber(2),
      icon: new BigNumber(2),
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
          await shouldFail.reverting(this.token.getWall(999));
        });
      });
    });

    describe('get wall value', function () {
      it('is the right value', async function () {
        const tokenValue = await this.token.getValue(tokenId);
        tokenValue.should.be.bignumber.equal(this.structure.value);
      });

      describe('if token id not exists', function () {
        it('reverts', async function () {
          await shouldFail.reverting(this.token.getValue(999));
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
        await shouldFail.reverting(
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
        await shouldFail.reverting(
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

    describe('if sending 0 wei', function () {
      beforeEach(async function () {
        await this.token.newToken(
          beneficiary,
          0,
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

        it('has zero value', async function () {
          const value = tokenStructure[1];
          value.should.be.bignumber.equal(0);
        });

        it('has a default pattern', async function () {
          const pattern = tokenStructure[4];
          pattern.should.be.bignumber.equal(0);
        });

        it('has a default icon', async function () {
          const icon = tokenStructure[5];
          icon.should.be.bignumber.equal(0);
        });
      });

      describe('get wall value', function () {
        it('is the right value', async function () {
          const currentTokenValue = await this.token.getValue(tokenId);
          currentTokenValue.should.be.bignumber.equal(0);
        });
      });

      describe('edit sending 0 wei', function () {
        beforeEach(async function () {
          await this.token.editToken(
            tokenId,
            0,
            this.newStructure.firstName,
            this.newStructure.lastName,
            this.newStructure.pattern,
            this.newStructure.icon,
            { from: minter }
          );
        });

        describe('check metadata', function () {
          let tokenStructure;

          beforeEach(async function () {
            tokenStructure = await this.token.getWall(tokenId);
          });

          it('has zero value', async function () {
            const value = tokenStructure[1];
            value.should.be.bignumber.equal(0);
          });

          it('has a default pattern', async function () {
            const pattern = tokenStructure[4];
            pattern.should.be.bignumber.equal(0);
          });

          it('has a default icon', async function () {
            const icon = tokenStructure[5];
            icon.should.be.bignumber.equal(0);
          });
        });

        describe('get wall value', function () {
          it('is the right value', async function () {
            const currentTokenValue = await this.token.getValue(tokenId);
            currentTokenValue.should.be.bignumber.equal(0);
          });
        });
      });
    });
  });

  context('editing an existing token', function () {
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

      await this.token.editToken(
        tokenId,
        this.newStructure.value,
        this.newStructure.firstName,
        this.newStructure.lastName,
        this.newStructure.pattern,
        this.newStructure.icon,
        { from: minter }
      );
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
        value.should.be.bignumber.equal(this.structure.value.add(this.newStructure.value));
      });

      it('has a firstName', async function () {
        const firstName = tokenStructure[2];
        firstName.should.be.equal(this.newStructure.firstName);
      });

      it('has a lastName', async function () {
        const lastName = tokenStructure[3];
        lastName.should.be.equal(this.newStructure.lastName);
      });

      it('has a pattern', async function () {
        const pattern = tokenStructure[4];
        pattern.should.be.bignumber.equal(this.newStructure.pattern);
      });

      it('has a icon', async function () {
        const icon = tokenStructure[5];
        icon.should.be.bignumber.equal(this.newStructure.icon);
      });

      describe('if token id not exists', function () {
        it('reverts', async function () {
          await shouldFail.reverting(this.token.getWall(999));
        });
      });
    });

    describe('progressive id', function () {
      it('should not increase', async function () {
        const oldProgressiveId = await this.token.progressiveId();

        await this.token.editToken(
          tokenId,
          this.newStructure.value,
          this.newStructure.firstName,
          this.newStructure.lastName,
          this.newStructure.pattern,
          this.newStructure.icon,
          { from: minter }
        );
        const newProgressiveId = await this.token.progressiveId();

        newProgressiveId.should.be.bignumber.equal(oldProgressiveId);
      });
    });

    describe('if token id not exists', function () {
      it('reverts', async function () {
        await shouldFail.reverting(
          this.token.editToken(
            999,
            this.newStructure.value,
            this.newStructure.firstName,
            this.newStructure.lastName,
            this.newStructure.pattern,
            this.newStructure.icon,
            { from: minter }
          )
        );
      });
    });

    describe('if caller has not minter permission', function () {
      it('reverts', async function () {
        await shouldFail.reverting(
          this.token.editToken(
            tokenId,
            this.newStructure.value,
            this.newStructure.firstName,
            this.newStructure.lastName,
            this.newStructure.pattern,
            this.newStructure.icon,
            { from: anotherAccount }
          )
        );
      });
    });

    describe('if sending 0 wei', function () {
      let tokenValue;

      beforeEach(async function () {
        tokenValue = await this.token.getValue(tokenId);

        await this.token.editToken(
          tokenId,
          0,
          this.newStructure.firstName,
          this.newStructure.lastName,
          this.newStructure.pattern,
          this.newStructure.icon,
          { from: minter }
        );
      });

      describe('check metadata', function () {
        let tokenStructure;

        beforeEach(async function () {
          tokenStructure = await this.token.getWall(tokenId);
        });

        it('has the previous value', async function () {
          const value = tokenStructure[1];
          value.should.be.bignumber.equal(this.structure.value.add(this.newStructure.value));
        });
      });

      describe('get wall value', function () {
        it('is the right value', async function () {
          const currentTokenValue = await this.token.getValue(tokenId);
          currentTokenValue.should.be.bignumber.equal(tokenValue);
        });

        describe('if token id not exists', function () {
          it('reverts', async function () {
            await shouldFail.reverting(this.token.getValue(999));
          });
        });
      });

      describe('check getNextNode and getPreviousNode', function () {
        let newTokenId;
        beforeEach(async function () {
          await this.token.newToken(
            beneficiary,
            tokenValue.add(1),
            this.structure.firstName,
            this.structure.lastName,
            this.structure.pattern,
            this.structure.icon,
            { from: minter }
          );

          newTokenId = await this.token.progressiveId();
        });

        it('getNextNode should be newTokenId', async function () {
          const expectedToken = await this.token.getNextNode(tokenId);
          expectedToken[0].should.be.equal(true);
          expectedToken[1].should.be.bignumber.equal(newTokenId);
        });

        it('getPreviousNode should be HEAD', async function () {
          const expectedToken = await this.token.getPreviousNode(tokenId);
          expectedToken[0].should.be.equal(true);
          expectedToken[1].should.be.bignumber.equal(0);
        });

        it('should be the same after edit', async function () {
          await this.token.editToken(
            tokenId,
            0,
            this.newStructure.firstName,
            this.newStructure.lastName,
            this.newStructure.pattern,
            this.newStructure.icon,
            { from: minter }
          );
          let expectedToken = await this.token.getNextNode(tokenId);
          expectedToken[0].should.be.equal(true);
          expectedToken[1].should.be.bignumber.equal(newTokenId);

          expectedToken = await this.token.getPreviousNode(tokenId);
          expectedToken[0].should.be.equal(true);
          expectedToken[1].should.be.bignumber.equal(0);
        });
      });
    });

    describe('if sending more than 0 wei', function () {
      describe('get wall value', function () {
        it('is the right value', async function () {
          const tokenValue = await this.token.getValue(tokenId);
          tokenValue.should.be.bignumber.equal(this.structure.value.add(this.newStructure.value));
        });

        describe('if token id not exists', function () {
          it('reverts', async function () {
            await shouldFail.reverting(this.token.getValue(999));
          });
        });
      });

      describe('check getNextNode and getPreviousNode', function () {
        let newTokenId;
        beforeEach(async function () {
          const tokenValue = await this.token.getValue(tokenId);
          await this.token.newToken(
            beneficiary,
            tokenValue.add(1),
            this.structure.firstName,
            this.structure.lastName,
            this.structure.pattern,
            this.structure.icon,
            { from: minter }
          );

          newTokenId = await this.token.progressiveId();
        });

        it('getNextNode should be newTokenId', async function () {
          const expectedToken = await this.token.getNextNode(tokenId);
          expectedToken[0].should.be.equal(true);
          expectedToken[1].should.be.bignumber.equal(newTokenId);
        });

        it('getPreviousNode should be HEAD', async function () {
          const expectedToken = await this.token.getPreviousNode(tokenId);
          expectedToken[0].should.be.equal(true);
          expectedToken[1].should.be.bignumber.equal(0);
        });

        it('should be reordered after edit', async function () {
          await this.token.editToken(
            tokenId,
            new BigNumber(2),
            this.newStructure.firstName,
            this.newStructure.lastName,
            this.newStructure.pattern,
            this.newStructure.icon,
            { from: minter }
          );
          let expectedToken = await this.token.getNextNode(newTokenId);
          expectedToken[0].should.be.equal(true);
          expectedToken[1].should.be.bignumber.equal(tokenId);

          expectedToken = await this.token.getNextNode(tokenId);
          expectedToken[0].should.be.equal(true);
          expectedToken[1].should.be.bignumber.equal(0);

          expectedToken = await this.token.getPreviousNode(newTokenId);
          expectedToken[0].should.be.equal(true);
          expectedToken[1].should.be.bignumber.equal(0);

          expectedToken = await this.token.getPreviousNode(tokenId);
          expectedToken[0].should.be.equal(true);
          expectedToken[1].should.be.bignumber.equal(newTokenId);
        });
      });
    });
  });

  context('testing ERC721 behaviors', function () {
    beforeEach(async function () {
      await this.token.addMinter(minter, { from: creator });
    });

    shouldBehaveLikeERC721Full(creator, minter, accounts, name, symbol);
  });

  context('like a TokenRecover', function () {
    beforeEach(async function () {
      this.instance = this.token;
    });

    shouldBehaveLikeTokenRecover([creator, anotherAccount]);
  });
});
