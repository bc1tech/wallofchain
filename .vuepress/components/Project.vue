<template>
  <main class="container">
    <div class="row">
      <div class="col-md-6 col-lg-5">
        <div class="box">
          <h2 class="box__title">
            What is WallOfChain?
          </h2>
          <p class="box__copy">
            WallOfChain is a collectible token on Ethereum Blockchain.<br><br>
            It is made by the same technologies currently used by the Ethereum technology.<br><br>
            When you acquire a star, it is uniquely owned by you.
            It carries your name, and cannot be replicated. You can let it shine brighter and
            let it grow while using our platform.<br><br>
            Each transaction is stored on the blockchain and you can view and check it through
            <a href="https://etherscan.io/" target="_blank">Etherscan</a>, which is one of the interfaces for the Ethereum network.
            It has a memory of everything that’s happened on the blockchain.
            In this way, you can be 100% sure that your transactions were successful.
          </p>
          <a href="https://etherscan.io/"
              target="_blank">
            <img :src="$withBase('/assets/images/etherscan.png')"
                :srcset="`${$withBase('/assets/images/etherscan.png')} 1x,
              ${$withBase('/assets/images/etherscan@2x.png')} 2x`"
                class="box__image"
                alt="Etherscan">
          </a>
        </div>
      </div>

      <div class="col-md-6 col-lg-5 offset-lg-2">
        <div class="box">
          <h2 class="box__title">
            Why choose WallOfChain?
          </h2>
          <p class="box__copy">
            Owning a star speaks greatly of your character.<br>
            Owning a star speaks greatly of your character.
            WallOfChain hangs your star on the wall, for everyone to see and it
            makes you twice the star: for each token you create, you will be directly
            sustaining the <a href="https://www.coolearth.org"
                target="_blank">
              Cool Earth
            </a> charity. How? WallOfChain devolves part
            of its ETH raised to charity's cause.
          </p>
          <a href="https://www.coolearth.org/"
              target="_blank">
            <img :src="$withBase('/assets/images/coolearth.png')"
                :srcset="`${$withBase('/assets/images/coolearth.png')} 1x,
          ${$withBase('/assets/images/coolearth@2x.png')} 2x`"
                class="box__image"
                alt="Etherscan">
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
  export default {
    name: 'PageProject',
  };
</script>
<style lang="scss">
  @import "../scss/variables";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";

  .box {
    margin-top: 2.5em;

    &__title {
      font-size: 1.75rem;
      font-weight: 800;
    }

    &__copy {
      font-size: 1rem;
      line-height: 1.5;

      a {
        color: #fff;
        text-decoration: underline;

        &:hover {
          color: $primary;
        }
      }
    }

    &__image {
      margin-top: 2.5em;
    }
  }
</style>
