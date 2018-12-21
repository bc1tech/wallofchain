<template>
  <main class="container">
    <h1>
      Frequently Asked Questions
    </h1>

    <div class="accordion-wrapper">
      <div v-for="(item, index) in faqs"
           :key="`faq-${index}`"
           class="accordion">
        <input :id="`faq-${index}`"
               :checked="index === 0"
               name="faq-selected"
               type="radio"
               class="accordion__input">
        <label :for="`faq-${index}`"
               class="accordion__label">
          <i class="accordion__icon"></i> {{ item.title }}
        </label>
        <article class="accordion__content">
          <p class="accordion__copy">
            {{ item.content }}
          </p>
        </article>
      </div>
    </div>
  </main>
</template>
<script>
  export default {
    name: 'PageFaq',
    data() {
      return {
        faqs: [{
          title: 'What is needed to aquire a star?',
          content: 'A computer with Firefox/Chrome.\n'
            + 'We suggest using these two browsers, as they ensure maximum compatibility.\n'
            + 'Mobile navigation is also garanteed.\n'
            + 'Navigation from multiple computers is also allowed.\n'
            + '\n'
            + '    A digital wallet\n'
            + '        To buy a star, you will need a digital wallet, specifically MetaMask.\n'
            + '        As your digital wallet acts as a real one, you’ll need to put money in        it in order to do your first purchase.\n'
            + 'WallOfChain does not have any control over your wallet, that belongs only to you. Please do not share with others your seeds words: they can restore your account in the case it’s deleted, but they can also garantee access to your entire account.\n'
            + 'Your wallet is univocally identified by a wallet address. You can share it with other, and it’s used to convey assets to your wallet.',
        }, {
          title: 'What is an Ethereum?',
          content: 'Ethereum is a digital currency – its value, like any other currency, fluctuates with the market.\n'
            + 'In order to convert your actual currency in Ethereum, you can use the Coinbase.\n'
            + 'Some wallets allow the possibilty to directly aquire Ethereum currency, while others may require you to make a purchase from an exchange. After your purchase, you can transfer your Ethereum from the exchange wallet to your digital one.\n'
            + 'Keep in mind it’s not the shortest process: you’ll need to verify your identity, which will probably take a day or two.\n'
            + 'Worry not – your star awaits for you.',
        },{
          title: 'What is Etherscan?',
          content: 'Etherscan is an interface for the Ethereum Network. It has a memory of everything that’s happened on the blockchain. In this way, you can be 100% sure that your transactions were successful.'
        }, {
          title: 'My transaction failed',
          content: 'It is possible that the setting level of the gas limit was too low.'
        }, {
          title: 'My transaction failed, but my gas was charged',
          content: 'Gas is essential to process requests on the blockchain. In this sense, even a failed transaction still represents a transaction.\n' +
            'This fee is payed to the Ethereum network and miners, and not to WallOfChain.'
        }, {
          title: 'My transaction timed out',
          content: 'It’s possible that the Ethereum network may be too busy to process the transaction. It usually happens when gas prices are too high, or there is a spike in network congestion.'
        }, {
          title: 'Ok, but what is gas?',
          content: 'Gas is a short term used to describe the cost of a transaction or contract in Ethereum.\n' +
            'Each transaction takes a lot of computational power, and is splitted beneath multiple computers. This power is covered by gas.'
        }],
      };
    },
  };
</script>
<style lang="scss">
  @import "../scss/variables";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";

  .accordion {
    position: relative;

    & + & {
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        content: '';
        height: 1px;
        width: 100%;
        display: block;
        background-color: #fff;
        opacity: .4;
      }
    }

    &__label,
    &__input {
      cursor: pointer;
      width: 100%;
    }

    &__label {
      padding: 1.25em 0;
      font-weight: 600;
      font-size: 1.125rem;
      margin: 0;
      display: flex;
      align-items: center;
    }

    &__icon {
      position: relative;
      min-height: 20px;
      min-width: 20px;
      border: 2px solid #fff;
      display: inline-block;
      border-radius: 20px;
      margin-right: 1em;

      &::before,
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: calc(100% - 6px);
        width: 2px;
        content: '';
        margin: auto;
        background-color: #fff;
        display: block;
        transition: all .3s ease-in-out;
      }

      &::before {
        margin: auto;
      }

      &::after {
        transform: rotate(90deg);
      }
    }

    &__input {
      position: absolute;
      top: 1.25em;
      right: 0;
      bottom: 1.25em;
      left: 0;
      opacity: 0;

      &:checked ~ .accordion__content {
        min-height: auto;
        max-height: 1000px;

        .accordion__copy {
          opacity: 1;
          transform: translate( 0 , 0 );
        }
      }

      &:checked ~ .accordion__label {
        cursor: default;
      }

      &:checked ~ .accordion__label .accordion__icon:before {
        transform: rotate(-90deg);
      }
    }

    &__content {
      position: relative;
      z-index: 5;
      min-height: 0;
      max-height: 0;
      padding-left: 2.25em;
      overflow: hidden;
      transition: all .3s ease-in-out;
    }

    &__copy {
      opacity: 0;
      margin-bottom: 1.25em;
      transform: translate(0 , 15% );
      transition: all .3s ease-in-out;
    }
  }
</style>
