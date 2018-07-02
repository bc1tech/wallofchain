import ether from './helpers/ether';
import assertRevert from './helpers/assertRevert';

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const WallOfChainMarket = artifacts.require('WallOfChainMarket.sol');
const WallOfChainToken = artifacts.require('WallOfChainToken.sol');

const ROLE_MINTER = 'minter';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

contract('WallOfChainMarket', function ([_, wallet, purchaser, beneficiary]) {
  const name = 'WallOfChainToken';
  const symbol = 'WOC';

  const tokenDetails = {
    value: ether(0.1),
    firstName: 'Vittorio',
    lastName: 'Minacori',
    pattern: 'yellow',
    icon: 'default',
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
        await assertRevert(
          WallOfChainMarket.new(ZERO_ADDRESS, this.token.address)
        );
      });
    });

    describe('if token is the zero address', function () {
      it('reverts ', async function () {
        await assertRevert(
          WallOfChainMarket.new(wallet, ZERO_ADDRESS)
        );
      });
    });
  });

  describe('after creation', function () {
    it('should have minter role on token', async function () {
      const isMinter = await this.token.hasRole(this.crowdsale.address, ROLE_MINTER);
      isMinter.should.equal(true);
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
      ).should.be.fulfilled;
    });

    it('should reject payments if beneficiary is the zero address', async function () {
      await assertRevert(
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
      await assertRevert(
        this.crowdsale.send(value)
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

    it('should forward funds to wallet', async function () {
      const pre = web3.eth.getBalance(wallet);
      await this.crowdsale.buyToken(
        beneficiary,
        tokenDetails.firstName,
        tokenDetails.lastName,
        tokenDetails.pattern,
        tokenDetails.icon,
        { value: value, from: purchaser }
      );
      const post = web3.eth.getBalance(wallet);
      post.minus(pre).should.be.bignumber.equal(value);
    });
  });
});
