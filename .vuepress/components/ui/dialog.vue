<template>
  <div class="modal fade"
      :class="{'show' : isOpen }"
       :aria-hidden="isOpen ? 'true' : 'false'"
      tabindex="-1"
      role="dialog">
    <div class="modal__dialog"
        role="document">
      <div class="modal__content">
        <button v-if="showClosed"
            class="modal__close"
            type="button"
            title="Close"
            @click.stop="close">
          x
        </button>
        <div class="modal__body">
          <h2 v-if="$slots.title"
              class="modal__title">
            <slot name="title"></slot>
          </h2>
          <p class="modal__copy">
            <slot></slot>
          </p>
        </div>
        <div class="modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      showClosed: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        isOpen: false,
      };
    },
    beforeDestroy() {
      this.isOpen = false;
    },
    methods: {
      open() {
        this.isOpen = true;
      },
      close() {
        this.isOpen = false;
      },
    },
  };
</script>
<style lang="scss">

  @import "../../scss/variables";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";

  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $zindex-modal;
    visibility: hidden;
    overflow: hidden;
    background-color: rgba(44, 33, 93, 0.8);

    display: flex;
    align-items: center;
    justify-content: center;

    &.fade {
      visibility: hidden;
      opacity: 0;
      transition: opacity .25s, visibility 0s .25s;

      &.show {
        visibility: visible;
        opacity: 1;
        transition: opacity .25s;
      }
    }

    &__close {
      position: absolute;
      z-index: 1;
      top: 1rem;
      right: 1rem;
      width: 2em;
      height: 2em;
      border: 0;
      padding: 0.5em;
      color: #fff;
      background-color: #fff;
      background-image: url(../../svg/close.svg);
      background-size: 60%;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
      text-indent: -10000%;
      overflow: hidden;
    }

    &__divisor {
      border-color: rgba(44, 33, 93, 0.1);
      border-bottom: 0;
      margin: 1.5rem -2.5rem;
    }

    &__title {
      font-family: $font-family-base;
      font-size: 1.75rem;
      font-weight: bold;
    }

    &__copy {
      font-size: 1.125rem;
      margin-bottom: 2.5em;
      font-weight: 400;
    }

    &__dialog {
      position: relative;
      margin: $modal-dialog-margin;
      pointer-events: none;

      display: flex;
      align-items: center;
      min-height: calc(100% - (#{$modal-dialog-margin} * 2));

      width: 90%;
      max-width: 440px;

      .modal.fade & {
        @include transition($modal-transition);
        transform: translate(0, -10%);
      }
      .modal.show & {
        transform: translate(0, 0);
      }
    }

    &__content {
      position: relative;
      width: 100%;
      max-height: calc(100vh - 15px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      pointer-events: auto;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      background-color: #fff;
      border: 0;
      padding: 1.75rem;
      border-radius: 0.25em;
      background-clip: padding-box;
      outline: 0;
      color: $secondary;

      @include media-breakpoint-up('md') {
        padding: 2.5rem;
      }
    }

    &__body {
      width: 100%;
    }

    &__footer {
      width: 100%;

      .btn {
        &:nth-child(n+2) {
          margin-top: 1rem;
        }
      }
    }
  }
</style>
