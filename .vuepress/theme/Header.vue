<template>
  <header class="navbar container-lg">
    <button ref="toggler"
        class="navbar__toggler"
        :class="menuOpen ? 'navbar__toggler--active' : ''"
        @click="toggleNavbar">
      <span class="navbar__toggler-icon"></span>
    </button>

    <RouterLink class="navbar__brand"
        to="/">
      <strong>Wall</strong>Of<strong>Chain</strong>
    </RouterLink>

    <RouterLink class="btn"
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
      margin-right: 1.25em;
      border: 0;
      padding: 0.625em 1.5em;
      width: 4.5em;
      height: 2.4375em;
      background: none;
      cursor: pointer;

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

    &__menu {
      position: fixed;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(143deg, #2D215E, #0A0E2C);
      min-height: 100vh;
      opacity: 0;
      visibility: hidden;

      &--open {
        opacity: 1;
        visibility: visible;
      }
    }

    &__nav {
      list-style: none;
      margin: 1.25em 0 0;
      padding: 0;
      text-align: left;
    }

    &__item {
      display: block;
      margin: 0 0 1em;
      text-align: center;

      @include media-breakpoint-up(md) {
        text-align: left;
        display: inline-block;
        margin: 0 1em;

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-right: 0;
        }
      }

      @include media-breakpoint-up(lg) {
        margin: 0 1.25em;
      }
    }

    &__link {
      display: inline-block;
      padding: 0 2em;
      text-transform: uppercase;
      font-size: 0.875rem;
      line-height: 1.285;
      letter-spacing: 0.214em;
      color: #fff;

      @include media-breakpoint-up(lg) {
        padding: 0;
      }

      &::before {
        content: attr(title);
        height: 0;
        display: block;
        font-weight: 700;
        overflow: hidden;
        visibility: hidden;
      }

      &::after {
        content: '';
        display: block;
        position: relative;
        top: 0.428em;
        width: 20%;
        margin: 0 auto;
        height: 2px;
        background-image: linear-gradient(94deg, #4090ef, #9c9a42);
        opacity: 0;
        transform: translateY(-4px);
        transition: .15s ease-in-out;

        @include media-breakpoint-up(md) {
          top: 0.928em;
        }
      }

      &.router-link-exact-active {
        font-weight: 700;

        &::after {
          opacity: 1;
          width: 60%;
          transform: translateY(0);
        }
      }

      &:hover {
        font-weight: 700;
        text-decoration: none;
        color: #fff;
      }

      &:focus {
        outline: none;
      }
    }
  }
</style>
