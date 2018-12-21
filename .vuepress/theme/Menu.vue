<template>
  <div class="main-menu container">
    <div class="row">
      <div class="col-lg-8">
        <ul class="main-menu__nav">
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
      </div>
      <div class="col-lg-4">
        <div>
          <p>
            Vestibulum id ligula porta felis euismod semper.
            Integer posuere erat a ante Etherscan dapibus posuere velit aliquet.
            Maecenas sed diam eget risus varius blandit sit amet non magna.
            Integer posuere erat a ante venenatis.
          </p>
        </div>
        <div>
          <p>
            Vestibulum id ligula porta felis euismod semper.
            Integer posuere erat a ante Etherscan dapibus posuere velit aliquet.
            Maecenas sed diam eget risus varius blandit sit amet non magna.
            Integer posuere erat a ante venenatis.
          </p>
        </div>
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
        &__nav {
            list-style: none;
            margin: 0;
            padding: 0;
        }
    }
</style>
