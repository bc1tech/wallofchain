<template>
  <main>
    <div class="container-lg hero">
      <h1 class="hero__title">
        Get a star. Be the star.<br>
        Help the planet.
      </h1>
      <p class="hero__copy">
        Become a part of the Blockchain hall of fame. Collect a star and let it shine.<br>
        It will hang on our wall luminescent, bright and strong – there is your name on it.
      </p>
    </div>
    <div class="section container-lg">
      <Wall load-more></Wall>
    </div>
  </main>
</template>
<script>
  const Wall = () => import('../theme/Wall.vue');

  export default {
    name: 'PageWall',
    components: {
      Wall,
    },
  };
</script>
<style lang="scss">
  @import "../scss/variables";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";

  .hero {
    text-align: center;
    margin-bottom: 3.75em;

    &__title {
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 1.303;

      @include media-breakpoint-up(lg) {
        font-size: 3.5rem;
        font-weight: 600;
      }
    }

    &__copy {
      font-size: 1.125rem;
      margin: 0;
    }
  }
</style>
