<template>
  <header class="navbar container-lg">
    <button ref="toggler"
        class="navbar__toggler d-none d-md-inline-block"
        :class="menuOpen ? 'navbar__toggler--active' : ''"
        @click="toggleNavbar">
      <span class="navbar__toggler-icon"></span>
    </button>

    <RouterLink class="navbar__brand"
        to="/">
      <strong>Wall</strong>Of<strong>Chain</strong>
    </RouterLink>

    <button ref="toggler"
        class="navbar__toggler d-md-none"
        :class="menuOpen ? 'navbar__toggler--active' : ''"
        @click="toggleNavbar">
      <span class="navbar__toggler-icon"></span>
    </button>
    <RouterLink class="btn d-none d-md-inline-block"
        title="Become a Star"
        to="/become-a-star.html">
      Become a Star
    </RouterLink>
  </header>
</template>
<script>
  export default {
    props: {
      menuOpen: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      toggleNavbar() {
        this.$emit('toggleMenu');
      },
    },
  };
</script>
<style lang="scss">
  @import "../scss/variables";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";

  .navbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 1.25em;
    padding-bottom: 2.5em;
    margin-bottom: 1.5em;

    @include media-breakpoint-up(lg) {
      padding-top: 2.5em;
      padding-bottom: 2.5em;
      flex-wrap: nowrap;
    }

    &__brand {
      font-size: 1.5rem;
      letter-spacing: 3px;
      font-weight: 400;
      line-height: 1.2916;
      text-transform: uppercase;
      color: $primary;

      &:hover {
        text-decoration: none;
      }

      strong {
        font-weight: 900;
      }
    }

    &__toggler {
      $root: &;
      position: relative;
      z-index: 3;
      margin: 0;
      border: 0;
      padding: 0.625em 1em;
      width: 3.5em;
      height: 2.4375em;
      background: none;
      cursor: pointer;

      @include media-breakpoint-up(md) {
        margin-right: 1.25em;
      }

      &:focus {
        outline: none;
      }

      &-icon {
        top: 0;
        margin: 0.625em -0.75em;

        &, &:before, &:after {
          position: absolute;
          width: 1.5em;
          height: 3px;
          transition-timing-function: ease;
          transition-duration: .15s;
          transition-property: transform, background-color;
          background-color: #fff;
        }

        &:before, &:after {
          display: block;
          content: "";
        }

        &:before {
          top: 8px;
          transition-timing-function: ease;
          transition-duration: .15s;
          transition-property: transform, opacity, background-color;
        }

        &:after {
          top: 16px;
        }
      }

      &--active {
        #{$root}-icon {
          transform: translate3d(0, 0.5em, 0) rotate(45deg);

          &:before {
            transform: rotate(-45deg) translate3d(-5.71429px, -6px, 0);
            opacity: 0;
          }

          &:after {
            transform: translate3d(0, -1em, 0) rotate(-90deg);
          }
        }
      }

      &:hover {
        #{$root}-icon {
          &, &:before, &:after {
            background-color: $primary;
          }
        }
      }
    }
  }
</style>
