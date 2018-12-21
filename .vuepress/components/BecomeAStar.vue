<template>
  <main class="container">
    <div v-if="trxLink"
        class="jumbotron text-center">
      <h1 class="display-4">
        Generating Star...
      </h1>
      <p class="lead">
        Please wait until generation is completed.
      </p>
      <ui-loading v-if="loading"></ui-loading>
      <a target="_blank"
          :href="trxLink"
          class="btn">
        View transaction
      </a>
    </div>
    <form v-else
        class="form loading-parent row"
        @submit.prevent="submit">
      <div class="col-lg-7 loading-hide"
          :class="{ 'loading-hide--active': loading }">
        <header class="form-header">
          <h2 class="form-header__title">
            Buy your star
          </h2>
        </header>

        <div class="row form__row">
          <div class="col-lg-6">
            <label class="form__label"
                for="form_first_name">
              First Name
            </label>
            <input id="form_first_name"
                v-model="formData.firstName"
                v-validate="'required'"
                class="form__input"
                :class="{'is-invalid': errors.has('firstName') }"
                type="text"
                name="firstName"
                data-vv-as="fist name">
            <p v-show="errors.has('firstName')"
                class="form__helper"
                :class="errors.has('firstName') ? 'text-danger' : ''">
              {{ errors.first('firstName') }}
            </p>
          </div>
          <div class="col-lg-6">
            <label class="form__label"
                for="form_last_name">
              Last Name
            </label>
            <input id="form_last_name"
                v-model="formData.lastName"
                v-validate="'required'"
                class="form__input"
                :class="{'is-invalid': errors.has('lastName') }"
                type="text"
                name="lastName"
                data-vv-as="last name">
            <p v-show="errors.has('lastName')"
                class="form__helper"
                :class="errors.has('lastName') ? 'text-danger' : ''">
              {{ errors.first('lastName') }}
            </p>
          </div>
          <div class="col-lg-6">
            <label class="form__label">
              ETH Value
            </label>
            <input v-model="formData.value"
                v-validate="'min_value:0'"
                class="form__input"
                :class="{'is-invalid': errors.has('valueEth') }"
                type="number"
                name="valueEth"
                step="any"
                min="0"
                data-vv-as="eth"
                @keypress="onlyNumbers($event)">
            <p v-show="errors.has('valueEth')"
                class="form__helper"
                :class="errors.has('valueEth') ? 'text-danger' : ''">
              {{ errors.first('valueEth') }}
            </p>
          </div>
          <div class="col-lg-6">
            <label class="form__label">
              Gift this (optional)
            </label>
            <input v-model="formData.giftEth"
                v-validate="'eth_address'"
                class="form__input"
                :class="{'is-invalid': errors.has('giftEth') }"
                type="text"
                name="giftEth"
                placeholder="Insert an ETH compatible wallet"
                data-vv-as="ETH wallet">
            <p v-show="errors.has('giftEth')"
                class="form__helper"
                :class="errors.has('giftEth') ? 'text-danger' : ''">
              {{ errors.first('giftEth') }}
            </p>
          </div>
        </div>

        <header class="form-header">
          <p class="form-header__copy">
            Insert your information to buy you a piece of WallOfChain.<br>
            You can customize your stars only if you have done a donation of ETH.
          </p>
        </header>

        <div class="row form__row">
          <div class="col-lg-6">
            <label class="form__label">
              Background colors
            </label>
            <ui-dropdown v-model="formData.gradient"
                v-validate="formData.value ? 'required' : ''"
                toggle="Select your gradient"
                :class="{'is-invalid': errors.has('gradient') }"
                type="gradient"
                name="gradient"
                :options="gradients"
                :disabled="formData.value === '0' || !formData.value"></ui-dropdown>
          </div>
          <div class="col-lg-6">
            <label class="form__label">
              Icon
            </label>
            <ui-dropdown v-model="formData.icon"
                v-validate="formData.value ? 'required' : ''"
                toggle="Select your icon"
                :class="{'is-invalid': errors.has('icon') }"
                type="icon"
                name="icon"
                :options="icons"
                :disabled="formData.value === '0' || !formData.value"></ui-dropdown>
          </div>
        </div>
      </div>

      <div class="col-lg-5 loading-hide"
          :class="{ 'loading-hide--active': loading }">
        <div class="edit-star">
          <h2 class="title">
            Watch the Preview
          </h2>

          <div :class="`star star--edit star--style-${(formData.value === '0' || !formData.value) ? 0 : (formData.gradient || 0)}`">
            <div class="star__content">
              <span v-if="formData.value !== '0' && !!formData.value && formData.icon !== ''"
                  class="star__icon"
                  :class="`icon-${ formData.icon }`"></span>
              <h2 class="star__title">
                {{ formData.firstName ? `${formData.firstName} ${formData.lastName}` : 'insert infos' }}
              </h2>
              <div class="star__amount">
                {{ formData.value || 0 }} ETH
              </div>
            </div>
          </div>

          <button type="submit"
              class="btn btn--no-border">
            Create your star
          </button>

          <p class="form-header__copy text-center small">
            <template v-if="!metamask.installed">
              You need the <a href="https://metamask.io/"
                  title="MetaMask"
                  target="_blank">
                MetaMask
              </a> extension.
            </template>
            <template v-else-if="metamask.netId !== network.expectedId"
                class="form-header__copy">
              You are on the wrong Network.<br>
              Please switch your MetaMask on {{ network.expectedName }}.
            </template>
          </p>
        </div>
      </div>
    </form>

    <ui-dialog ref="okay">
      <template slot="title">
        Great :)
      </template>
      Now your star is on our WallOfChain!!
      <template slot="footer">
        <RouterLink to="/"
            class="btn btn--outline d-block"
            @click="toggleModal('okay', true)">
          Go back home
        </RouterLink>
      </template>
    </ui-dialog>

    <ui-dialog ref="metamask">
      <template slot="title">
        Become a star
      </template>
      You’ll need a safe place to store your Wall of Chain!
      The perfect place is in a secure wallet like MetaMask.
      This will also act as your login to the game (no extra password needed).
      <template slot="footer">
        <a href="https://metamask.io/"
            target="_blank"
            class="btn btn--outline d-block">
          INSTALL METAMASK
        </a>
      </template>
    </ui-dialog>
  </main>
</template>
<script>
  import dapp from '../mixins/dapp';

  export default {
    name: 'PageBecomeAStar',
    mixins: [dapp],
    data() {
      return {
        loading: true,
        trxHash: '',
        trxLink: '',
        starLink: '',
        formData: {
          firstName: '',
          lastName: '',
          value: 0,
          giftEth: '',
          gradient: '',
          icon: '',
        },
        // array with numbers from 0 to 10
        gradients: Array(11)
          .fill(undefined)
          .map((v, i) => i),
        // array with numbers from 0 to 9
        icons: Array(10)
          .fill(undefined)
          .map((v, i) => i),
      };
    },
    mounted() {
      this.start(true);
    },
    methods: {
      submit() {
        if (!this.metamask.installed) {
          this.toggleModal('metamask');
          return false;
        }

        this.$validator.validateAll().then(async (valid) => {
          if (this.metamask.netId !== this.network.expectedId) {
            alert(
              `You are on the wrong Network.\nPlease switch your MetaMask on ${
                this.network.expectedName
              }.`,
            );
            return;
          }
          if (valid) {
            this.loading = true;

            try {
              if (!this.legacy) {
                await this.web3Provider.enable();
              }

              setTimeout(() => {
                const firstName = this.formData.firstName;
                const lastName = this.formData.lastName;
                const value = this.web3.toWei(this.formData.value, 'ether');
                const giftEth = this.formData.giftEth || this.web3.eth.coinbase;
                let gradient = this.formData.gradient;
                let icon = this.formData.icon;

                if (value === '0' || !value) {
                  gradient = 0;
                  icon = 0;
                }

                this.instances.market.buyToken(
                  giftEth,
                  firstName,
                  lastName,
                  gradient,
                  icon,
                  {
                    value,
                    from: this.web3.eth.coinbase,
                  },
                  (err, trxHash) => {
                    if (!err) {
                      this.trxHash = trxHash;
                      this.trxLink = `${this.etherscanLink}/tx/${this.trxHash}`;
                      this.instances.market.TokenPurchase(
                        {
                          purchaser: this.web3.eth.coinbase,
                          beneficiary: giftEth,
                        },
                        (err, event) => {
                          if (!err) {
                            console.log(event);

                            this.starLink = this.$withBase(
                              `star.html?id=${parseInt(
                                event.args.tokenId.valueOf(),
                              )}`,
                            );
                            this.loading = false;
                            this.toggleModal('okay');
                          } else {
                            alert(
                              'Some error occurred. Maybe transaction failed for some reasons. Check your transaction id.',
                            );
                          }
                        },
                      );
                    } else {
                      this.loading = false;
                      alert(
                        'Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!',
                      );
                    }
                  },
                );
              }, 500);
            } catch (e) {
              console.warn(e);
              alert(`Some error occurred. ${e.message}`);
              this.loading = false;
            }
          }
        });
      },
      onlyNumbers(e) {
        const evt = e || window.event;
        const charCode = evt.which ? evt.which : evt.keyCode;
        if (
          charCode > 31
          && (charCode < 48 || charCode > 57)
          && charCode !== 46
        ) {
          evt.preventDefault();
        }
      },
      web3Ready() {
        this.loading = false;

        this.$validator.extend('eth_address', {
          getMessage: field => 'Insert a valid Ethereum wallet address.',
          validate: value => this.web3.isAddress(value),
        });
      },
      toggleModal(modal, close) {
        if (close) {
          this.$refs[modal].close();
        } else {
          this.$refs[modal].open();
        }
      },
    },
  };
</script>
<style lang="scss">
@import "../scss/variables";
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

.form-header {
  margin-top: 1.25em;
  margin-bottom: 1.25em;

  &:first-child {
    margin-top: 0;
    margin-bottom: 2em;
  }

  &__title {
    font-size: 1.75rem;
    line-height: 1.142;
    margin-bottom: 0.42em;
  }

  &__copy {
    margin: 1.5em 0 2em;
    font-size: 1rem;
    line-height: 1.5;

    &.small {
      font-size: 0.875rem;
      line-height: 1.71;
      opacity: 0.6;
    }

    a {
      font-weight: 600;
      text-decoration: underline;
    }
  }
}

.form {
  &__input {
    background-color: transparent;
    width: 100%;
    display: block;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 0.25rem;
    padding: 1rem;
    color: #fff;
    font-size: 0.875rem;
    line-height: 1.2857;
    margin-bottom: 1.4285em;
    font-weight: 600;
    transition: border-color 0.15s ease-in-out;

    &:focus {
      border-color: #fff;
      outline: none;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
      font-weight: 600;
    }

    &.is-invalid {
      border-color: #dc3545;
      color: #dc3545;

      &::placeholder {
        color: #dc3545;
      }
    }
  }

  &__helper {
    font-size: 0.875rem;
    margin: -0.71425em 0 1.4285em;
  }

  &__label {
    display: inline-block;
    font-weight: 400;
    font-size: 0.875rem;
    color: #fff;
    letter-spacing: 1px;
    line-height: 1.125;
    margin-bottom: 0.5714em;
  }

  .btn {
    width: 100%;
  }
}

.edit-star {
  position: relative;
  height: 100%;

  @include media-breakpoint-up(lg) {
    padding-left: 25px;
    padding-bottom: 80px;
  }

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 1px;
    display: block;
    background-color: #fff;
    opacity: .4;

    @include media-breakpoint-up(lg) {
      content: "";
    }
  }

  .title {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .btn {
    padding-top: 1.3571em;
    padding-bottom: 1.3571em;
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    max-width: calc(100% - 40px);
    background: $primary;
    color: $secondary;

    &:hover, &:focus {
      background: darken($primary, 8%);
    }
  }

  .star {
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
