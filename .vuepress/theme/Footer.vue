<template>
  <footer class="container-lg footer">
    <hr class="footer__divisor">
    <h3 class="footer__brand">
      <strong>Wall</strong>Of<strong>Chain</strong>
    </h3>
    <p class="footer__copy">
      Copyright (c) 2018 WALLOFCHAIN
    </p>
    <span class="footer__credits">
      <span>
        Proudly made by <a href="https://bc1.tech"
            target="_blank">
          BC1
        </a>
      </span>
      <span>
        <img width="16"
            :src="$withBase('/assets/images/github-logo.svg')"> <a href="https://github.com/paneedesign/wallofchain"
            target="_blank">
          See on GitHub
        </a>
      </span>
    </span>
  </footer>
</template>
<script>
  export default {};
</script>
<style lang="scss">
  @import "../scss/variables";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";

  .footer {
    margin-top: 2.5rem;
    padding-top: 2.5em;
    padding-bottom: 2.5em;
    text-align: center;

    @include media-breakpoint-up(md) {
      margin-top: 4rem;
    }

    @include media-breakpoint-up(lg) {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }


    &__divisor {
      margin: 0 0 2.5em;
      border: 0;
      height: 1px;
      background-color: #fff;
      width: 100%;
      opacity: .4;
    }

    &__brand {
      font-size: 1rem;
      font-weight: 400;
      letter-spacing: 2px;
      line-height: 1.3125;
      text-transform: uppercase;
      margin: 0;
      color: $primary;

      strong {
        font-weight: 900;
      }
    }

    &__copy {
      font-size: 0.75rem;
      font-style: italic;
      line-height: 2;
      margin: 0 auto 0 1rem;
    }

    &__credits {
      font-size: 0.875rem;
      letter-spacing: 0;
      line-height: 1.714;

      span {
        display: inline-block;
        margin: 0 1.25rem;
      }

      a {
        font-weight: 600;
        text-decoration: underline;

        &:hover {
          color: $primary;
        }
      }
    }
  }
</style>
