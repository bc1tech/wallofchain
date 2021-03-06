const { ether } = require('openzeppelin-solidity/test/helpers/ether');
const shouldFail = require('openzeppelin-solidity/test/helpers/shouldFail');
const { ZERO_ADDRESS } = require('openzeppelin-solidity/test/helpers/constants');

const { shouldBehaveLikeTokenRecover } = require('eth-token-recover/test/TokenRecover.behaviour');

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

const WallOfChainMarket = artifacts.require('WallOfChainMarket.sol');
const WallOfChainToken = artifacts.require('WallOfChainToken.sol');

contract('WallOfChainMarket', function ([_, wallet, purchaser, beneficiary, anotherAccount]) {
  const name = 'WallOfChainToken';
  const symbol = 'WOC';

  const tokenDetails = {
    value: ether(0.1),
    firstName: 'Vittorio',
    lastName: 'Minacori',
    pattern: new BigNumber(1),
    icon: new BigNumber(1),
  };

  const value = ether(0.01);

  beforeEach(async function () {
    this.token = await WallOfChainToken.new(name, symbol);
    this.crowdsale = await WallOfChainMarket.new(wallet, this.token.address);
    await this.token.addMinter(this.crowdsale.address);
  });

  context('creating a valid market', function () {
    describe('if wallet is the zero address', function () {
      it('reverts ', async function () {
        await shouldFail.reverting(
          WallOfChainMarket.new(ZERO_ADDRESS, this.token.address)
        );
      });
    });

    describe('if token is the zero address', function () {
      it('reverts ', async function () {
        await shouldFail.reverting(
          WallOfChainMarket.new(wallet, ZERO_ADDRESS)
        );
      });
    });
  });

  describe('after creation', function () {
    it('should have minter role on token', async function () {
      const isMinter = await this.token.isMinter(this.crowdsale.address);
      isMinter.should.equal(true);
    });

    context('changing wallet', function () {
      describe('if owner is calling', function () {
        it('success and update wallet', async function () {
          await this.crowdsale.changeWallet(anotherAccount);
          const newWallet = await this.crowdsale.wallet();
          newWallet.should.be.equal(anotherAccount);
        });

        describe('if wallet is the zero address', function () {
          it('reverts ', async function () {
            await shouldFail.reverting(
              this.crowdsale.changeWallet(ZERO_ADDRESS)
            );
          });
        });
      });

      describe('if another account is calling', function () {
        it('reverts ', async function () {
          await shouldFail.reverting(
            this.crowdsale.changeWallet(anotherAccount, { from: anotherAccount })
          );
        });
      });
    });
  });

  describe('accepting payments', function () {
    it('should accept payments through buyToken function', async function () {
      await this.crowdsale.buyToken(
        beneficiary,
        tokenDetails.firstName,
        tokenDetails.lastName,
        tokenDetails.pattern,
        tokenDetails.icon,
        { value: value, from: purchaser }
      );
    });

    it('should reject payments if beneficiary is the zero address', async function () {
      await shouldFail.reverting(
        this.crowdsale.buyToken(
          ZERO_ADDRESS,
          tokenDetails.firstName,
          tokenDetails.lastName,
          tokenDetails.pattern,
          tokenDetails.icon,
          { value: value, from: purchaser }
        )
      );
    });

    it('should reject payments through default payable function', async function () {
      await shouldFail.reverting(
        this.crowdsale.send(value)
      );
    });

    it('should reject after finish minting', async function () {
      await this.token.finishMinting();
      await shouldFail.reverting(
        this.crowdsale.buyToken(
          beneficiary,
          tokenDetails.firstName,
          tokenDetails.lastName,
          tokenDetails.pattern,
          tokenDetails.icon,
          { value: value, from: purchaser }
        )
      );
    });
  });

  describe('token purchase', function () {
    it('should log purchase', async function () {
      const tokenId = await this.token.progressiveId();
      const { logs } = await this.crowdsale.buyToken(
        beneficiary,
        tokenDetails.firstName,
        tokenDetails.lastName,
        tokenDetails.pattern,
        tokenDetails.icon,
        { value: value, from: purchaser }
      );
      const event = logs.find(e => e.event === 'TokenPurchase');
      should.exist(event);
      event.args.purchaser.should.equal(purchaser);
      event.args.beneficiary.should.equal(beneficiary);
      event.args.value.should.be.bignumber.equal(value);
      event.args.tokenId.should.be.bignumber.equal(tokenId.add(1));
    });

    it('should assign token to beneficiary', async function () {
      await this.crowdsale.buyToken(
        beneficiary,
        tokenDetails.firstName,
        tokenDetails.lastName,
        tokenDetails.pattern,
        tokenDetails.icon,
        { value: value, from: purchaser }
      );
      const balance = await this.token.balanceOf(beneficiary);
      balance.should.be.bignumber.equal(1);
    });

    describe('if sending more than 0 wei', function () {
      it('should forward funds to wallet and increase weiRaised', async function () {
        const preBalance = web3.eth.getBalance(wallet);
        const preRaised = await this.crowdsale.weiRaised();
        await this.crowdsale.buyToken(
          beneficiary,
          tokenDetails.firstName,
          tokenDetails.lastName,
          tokenDetails.pattern,
          tokenDetails.icon,
          { value: value, from: purchaser }
        );
        const postBalance = web3.eth.getBalance(wallet);
        postBalance.minus(preBalance).should.be.bignumber.equal(value);

        const postRaised = await this.crowdsale.weiRaised();
        postRaised.minus(preRaised).should.be.bignumber.equal(value);
      });
    });

    describe('if sending 0 wei', function () {
      it('balance and weiRaised should not increase', async function () {
        const preBalance = web3.eth.getBalance(wallet);
        const preRaised = await this.crowdsale.weiRaised();
        await this.crowdsale.buyToken(
          beneficiary,
          tokenDetails.firstName,
          tokenDetails.lastName,
          tokenDetails.pattern,
          tokenDetails.icon,
          { value: 0, from: purchaser }
        );
        const postBalance = web3.eth.getBalance(wallet);
        postBalance.should.be.bignumber.equal(preBalance);

        const postRaised = await this.crowdsale.weiRaised();
        postRaised.should.be.bignumber.equal(preRaised);
      });
    });
  });

  describe('token edit', function () {
    let tokenId;
    beforeEach(async function () {
      await this.crowdsale.buyToken(
        beneficiary,
        tokenDetails.firstName,
        tokenDetails.lastName,
        tokenDetails.pattern,
        tokenDetails.icon,
        { value: value, from: purchaser }
      );

      tokenId = await this.token.progressiveId();
    });

    it('should log edit', async function () {
      const { logs } = await this.crowdsale.editToken(
        tokenId,
        tokenDetails.firstName,
        tokenDetails.lastName,
        tokenDetails.pattern,
        tokenDetails.icon,
        { value: value, from: beneficiary }
      );
      const event = logs.find(e => e.event === 'TokenEdit');
      should.exist(event);
      event.args.beneficiary.should.equal(beneficiary);
      event.args.value.should.be.bignumber.equal(value);
      event.args.tokenId.should.be.bignumber.equal(tokenId);
    });

    it('should fail if caller is not token owner', async function () {
      await shouldFail.reverting(
        this.crowdsale.editToken(
          tokenId,
          tokenDetails.firstName,
          tokenDetails.lastName,
          tokenDetails.pattern,
          tokenDetails.icon,
          { value: value, from: anotherAccount }
        )
      );
    });

    describe('if sending more than 0 wei', function () {
      it('should forward funds to wallet and increase weiRaised', async function () {
        const preBalance = web3.eth.getBalance(wallet);
        const preRaised = await this.crowdsale.weiRaised();
        await this.crowdsale.editToken(
          tokenId,
          tokenDetails.firstName,
          tokenDetails.lastName,
          tokenDetails.pattern,
          tokenDetails.icon,
          { value: value, from: beneficiary }
        );
        const postBalance = web3.eth.getBalance(wallet);
        postBalance.minus(preBalance).should.be.bignumber.equal(value);

        const postRaised = await this.crowdsale.weiRaised();
        postRaised.minus(preRaised).should.be.bignumber.equal(value);
      });
    });

    describe('if sending 0 wei', function () {
      it('balance and weiRaised should not increase', async function () {
        const preBalance = web3.eth.getBalance(wallet);
        const preRaised = await this.crowdsale.weiRaised();
        await this.crowdsale.editToken(
          tokenId,
          tokenDetails.firstName,
          tokenDetails.lastName,
          tokenDetails.pattern,
          tokenDetails.icon,
          { value: 0, from: beneficiary }
        );
        const postBalance = web3.eth.getBalance(wallet);
        postBalance.should.be.bignumber.equal(preBalance);

        const postRaised = await this.crowdsale.weiRaised();
        postRaised.should.be.bignumber.equal(preRaised);
      });
    });
  });

  context('like a TokenRecover', function () {
    beforeEach(async function () {
      this.instance = this.crowdsale;
    });

    shouldBehaveLikeTokenRecover([_, anotherAccount]);
  });
});
