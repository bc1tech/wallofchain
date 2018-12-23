<template>
  <div class="main-menu container">
    <div class="row">
      <div class="col-lg-6">
        <ul class="main-menu__nav">
          <li class="main-menu__item d-md-none">
            <RouterLink class="main-menu__link"
                title="Become a Star"
                to="/become-a-star.html">
              Become a Star
            </RouterLink>
          </li>
          <li class="main-menu__item">
            <RouterLink class="main-menu__link"
                title="The Wall"
                to="/">
              The Wall
            </RouterLink>
          </li>
          <li class="main-menu__item">
            <RouterLink class="main-menu__link"
                title="The Project"
                to="/project.html">
              The Project
            </RouterLink>
          </li>
          <li class="main-menu__item">
            <RouterLink class="main-menu__link"
                title="FAQs"
                to="/faq.html">
              FAQs
            </RouterLink>
          </li>
        </ul>

        <ul class="credits d-none d-lg-block">
          <li class="credits__item">
            Proudly made by <a href="https://bc1.tech"
                target="_blank">
              BC1
            </a>
          </li>
          <li class="credits__item">
            See on <a href="https://github.com/paneedesign/wallofchain"
                target="_blank">
              GitHub
            </a> <img width="16"
                :src="$withBase('/assets/images/github-logo.svg')">
          </li>
        </ul>
      </div>
      <div class="offset-lg-1 col-lg-5">
        <div class="info-block">
          <a href="https://etherscan.io/"
              target="_blank">
            <img :src="$withBase('/assets/images/etherscan.png')"
                :srcset="`${$withBase('/assets/images/etherscan.png')} 1x,
              ${$withBase('/assets/images/etherscan@2x.png')} 2x`"
                class="info-block__image"
                alt="Etherscan">
          </a>
          <p class="info-block__copy">
            Each transaction is stored on the blockchain and you can view and check it through
            <a href="https://etherscan.io/" target="_blank">Etherscan</a>, which is one of the interfaces for the Ethereum network.
            It has a memory of everything that’s happened on the blockchain.
            In this way, you can be 100% sure that your transactions were successful.
          </p>
        </div>
        <div class="info-block">
          <a href="https://www.coolearth.org/"
              target="_blank">
            <img :src="$withBase('/assets/images/coolearth.png')"
                :srcset="`${$withBase('/assets/images/coolearth.png')} 1x,
              ${$withBase('/assets/images/coolearth@2x.png')} 2x`"
                class="info-block__image"
                alt="Etherscan">
          </a>
          <p class="info-block__copy">
            WallOfChain makes you twice the star: for each token you create,
            you will be directly sustaining the <a href="https://www.coolearth.org"
                target="_blank">
              Cool Earth
            </a> charity.
            How? WallOfChain devolves part of its ETH raised to charity's cause.
          </p>
        </div>

        <ul class="credits d-lg-none">
          <li class="credits__item">
            Proudly made by <a href="https://www.bc1.tech"
                target="_blank">
              BC1
            </a>
          </li>
          <li class="credits__item">
            See on <a href="https://github.com/paneedesign/wallofchain"
                target="_blank">
              GitHub
            </a> <img width="16"
                :src="$withBase('/assets/images/github-logo.svg')">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style lang="scss">
  @import "../scss/variables";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";

  .main-menu {
    padding-bottom: 3.125em;

    @include media-breakpoint-up(md) {
      margin-top: 4rem;
      padding-bottom: 6.25em;
    }

    &__nav {
      list-style: none;
      margin: 0 0 3rem;
      padding: 0;

      @include media-breakpoint-up(lg) {
        margin-bottom: 4em;
      }
    }

    &__item {
      & + & {
        margin-top: 2em;
      }
    }

    &__link {
      display: inline-block;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.3035;
      color: #fff;
      transition: color .15s ease-in, transform .15s ease-in;

      @include media-breakpoint-up(lg) {
        font-size: 3.5rem;
        font-weight: 600;
      }

      &:hover {
        color: $primary;
        text-decoration: none;
        transform: translateX(1rem);
      }

      &.router-link-exact-active {
        color: $primary;
      }
    }
  }

  .credits {
    margin: 3em 0 0;
    padding: 0;
    list-style: none;
    text-align: center;

    @include media-breakpoint-up(lg) {
      text-align: left;
      margin-top: 0;
    }

    &__item {
      display: inline-block;
      font-size: 1rem;
      line-height: 1.3125;
      margin-left: 1.25em;
      margin-right: 1.25em;

      @include media-breakpoint-up(lg) {
        margin-left: 0;
        margin-right: 0;
        display: block;
      }

      & + & {
        @include media-breakpoint-up(lg) {
          margin-top: 2em;
        }
      }

      a {
        color: #fff;
        font-weight: 600;

        &:hover {
          color: $primary;
          text-decoration: underline;
        }
      }
    }
  }

  .info-block {
    & + & {
      margin-top: 3em;

      @include media-breakpoint-up(lg) {
        margin-top: 5em;
      }
    }

    &__image {
      margin-bottom: 2em;
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
  }
</style>
