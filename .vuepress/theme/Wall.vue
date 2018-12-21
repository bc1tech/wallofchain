<template>
  <Transition name="fade"
      mode="out-in">
    <ui-loading v-if="loading"></ui-loading>
    <div v-else
        key="wall">
      <TransitionGroup name="list"
          class="wall"
          tag="div">
        <ui-star v-for="(item, index) in wall"
            :key="item.id"
            :index="index"
            :tokenID="item.id"
            :tokenOwner="item.tokenOwner"
            :amount="item.amount"
            :currency="item.currency"
            :icon="item.icon"
            :style-type="item.styleType"
            :title="item.title"
            :etherscan-link="item.etherscanLink"
            class="wall__item"></ui-star>
      </TransitionGroup>
      <div v-if="loadMore && !loadingMore && wall.length < totalSupply"
          class="text-center">
        <a href="#"
            class="btn"
            @click.prevent="getMore">
          More position
        </a>
      </div>
    </div>
  </Transition>
</template>
<script>
  import dapp from '../mixins/dapp';

  export default {
    mixins: [
      dapp,
    ],
    props: {
      small: {
        type: Boolean,
        default: false,
      },
      loadMore: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        loading: false,
        loadingMore: this.loadMore,
        totalSupply: 0,
        progressiveId: 0,
        lastId: 0,
        limit: 13,
        wall: [],
      };
    },
    computed: {
      canGetMore() {
        return this.wall.length < this.totalSupply && this.wall.length < this.limit;
      },
    },
    mounted() {
      this.start(false);
    },
    methods: {
      web3Ready() {
        this.loading = true;
        this.instances.token.totalSupply((err, totalSupply) => {
          this.totalSupply = parseInt(totalSupply.valueOf());

          this.instances.token.progressiveId((err, progressiveId) => {
            this.progressiveId = parseInt(progressiveId.valueOf());

            if (this.progressiveId > 0) {
              this.getPreviousStar(0);
            }
          });
        });
      },
      getMore() {
        if (this.wall.length < this.progressiveId) {
          this.limit = this.limit + 12;
          this.getPreviousStar(this.lastId);
        }
      },
      getPreviousStar(tokenID) {
        this.loadingMore = true;

        this.instances.token.getPreviousNode(tokenID, (err, nodeIndex) => {
          if (nodeIndex[0]) {
            const tokenID = nodeIndex[1];
            this.instances.token.getWall(tokenID, (err, rawStar) => {
              /* function getWall returns an array as below
                  [
                      address tokenOwner,
                      uint256 value,
                      string firstName,
                      string lastName,
                      uint256 pattern,
                      uint256 icon
                  ]
               */

              this.lastId = parseInt(tokenID.valueOf());

              if (rawStar) {
                const wallItem = {
                  id: this.lastId,
                  tokenOwner: rawStar[0],
                  amount: this.web3.fromWei(rawStar[1]),
                  title: `${rawStar[2]} ${rawStar[3]}`,
                  currency: 'ETH',
                  styleType: rawStar[4].valueOf(),
                  icon: rawStar[5].valueOf(),
                  etherscanLink: `${this.etherscanLink}/token/${this.instances.token.address}?a=${this.lastId}`,
                };

                this.wall.push(wallItem);
                this.loading = false;
              }

              if (this.wall.length < this.progressiveId
                && this.canGetMore) {
                this.getPreviousStar(this.lastId);
              } else {
                this.loadingMore = false;
              }
            });
          }
        });
      },
    },
  };
</script>
<style>
    .list-enter-active, .list-leave-active {
        transition: all .85s ease-in-out;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: scale(.25);
    }
</style>
