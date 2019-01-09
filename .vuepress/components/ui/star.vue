<template>
  <div ref="star"
      class="star"
      :class="`star--style-${!parseFloat(amount) ? '0' : styleType} ${itemClass(index)}`"
      @click="toggleModal()">
    <div ref="starContent"
        class="star__content">
      <span v-if="!!parseFloat(amount)"
          class="star__icon"
          :class="`icon-${icon}`"></span>
      <h2 class="star__title">
        {{ title }}
      </h2>
      <div class="star__amount">
        {{ amount | number }} <span>{{ currency }}</span>
      </div>
    </div>

    <ui-dialog :ref="'detail-id-' + tokenID"
        class="star__dialog">
      <span v-if="!!parseFloat(amount)"
          class="star__icon"
          :class="`icon-${icon}`"></span>
      <h2 class="star__title">
        {{ title }}
      </h2>
      <div class="star__amount">
        {{ amount | number }} <span>{{ currency }}</span>
      </div>

      <hr class="modal__divisor">

      <div class="star__info">
        <span class="star__label">
          Token ID
        </span>
        <span class="star__data">
          {{ tokenID }}
        </span>
      </div>
      <div class="star__info">
        <span class="star__label">
          Owner
        </span>
        <span class="star__data">
          {{ tokenOwner }}
        </span>
      </div>

      <template slot="footer">
        <a :href="this.etherscanLink"
            target="_blank"
            class="btn btn--outline d-block">
          View on Etherscan.com
        </a>
      </template>
    </ui-dialog>
  </div>
</template>
<script>
  import VanillaTilt from 'vanilla-tilt';

  const sizes = [{
    className: 'size-1',
    classNameSmall: 'size-small-1',
  }, {
    className: 'size-2',
    classNameSmall: 'size-small-2',
  }, {
    className: 'size-3',
    classNameSmall: 'size-small-3',
  }];

  export default {
    filters: {
      number(num, maxDecimals = 5, minDecimals = 0) {
        const value = parseFloat(num);
        return value.toLocaleString('en', {
          maximumFractionDigits: maxDecimals,
          minimumFractionDigits: minDecimals,
        });
      },
    },
    props: ['tokenID', 'tokenOwner', 'amount', 'currency', 'icon', 'styleType', 'title', 'etherscanLink', 'index', 'small'],
    mounted() {
      VanillaTilt.init(this.$refs.starContent, {
        max: 25,
        perspective: 2000,
        // scale: 1.025,
        glare: true,
        'max-glare': 0.5,
      });
    },
    beforeDestroy() {
      this.$refs.starContent.vanillaTilt.destroy();
    },
    methods: {
      itemClass(index) {
        let itemClass = 'star--';

        if (index < 3) {
          itemClass += sizes[0][this.small ? 'classNameSmall' : 'className'];
        } else if (index < 7) {
          itemClass += sizes[1][this.small ? 'classNameSmall' : 'className'];
        } else {
          itemClass += sizes[2][this.small ? 'classNameSmall' : 'className'];
        }

        if (this.small) {
          itemClass += ' star--small';
        }

        return itemClass;
      },
      toggleModal() {
        this.$refs[`detail-id-${this.tokenID}`].open();
      },
    },
  };
</script>
<style lang="scss">
  .star {
    $root: &;

    &__content {
      transform-style: preserve-3d;
    }

    &__title {
      transform: translateZ(50px);
    }

    &__icon, &__amount {
      transform: translateZ(40px);
    }

    .js-tilt-glare {
      border-radius: 4px;
    }
  }
</style>
