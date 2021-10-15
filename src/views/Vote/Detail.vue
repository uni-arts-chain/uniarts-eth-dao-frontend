/** * Created by Lay Hunt on 2021-09-09 21:49:35. */
<template>
  <div class="detail" :class="{ mobile: $store.state.global.isMobile }">
    <img class="detail-logo" src="@/assets/images/banner-logo@2x.png" />
    <p class="detail-desc">The right formula for the best art never exists.</p>
    <div class="button-group">
      <button class="candidate" @click="goVoteQueue">View All Candidates</button>
      <button class="auction" @click="goAuctionQueue">View Timed Auctions</button>
    </div>
    <div class="list">
      <div class="item">
        <div class="nft">
          <div class="nft-assets">
            <img src="@/assets/images/art-info1.jpeg" alt="" />
          </div>
        </div>
        <div class="desc">
          <span>Vote for NFT to gain staking reward during the voting round</span>
        </div>
      </div>
      <div class="item">
        <div class="nft">
          <div class="nft-assets">
            <img src="@/assets/images/art-info2.jpeg" alt="" />
          </div>
        </div>
        <div class="desc">
          <span
            >Token cast into NFT with number of votes received and can be retrieved by its
            owner</span
          >
        </div>
      </div>
      <div class="item">
        <div class="nft">
          <div class="nft-assets">
            <img src="@/assets/images/art-info3.png" alt="" />
          </div>
        </div>
        <div class="desc">
          <span>Higher bidding price, more reward available</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "detail",
  setup() {
    // TODO

    const router = useRouter();

    const list = [1, 2, 3];

    const goVoteQueue = () => {
      router.push("/vote/votelist");
    };

    const goAuctionQueue = () => {
      router.push("/vote/auctionlist");
    };

    return {
      list,

      goVoteQueue,
      goAuctionQueue,
    };
  },
});
</script>

<style lang="scss" scoped>
.detail-logo {
  width: 361px;
  height: 83px;
  margin: 0 auto;
  margin-top: 130px;
  display: block;
}
.detail-desc {
  font-size: 18px;
  font-family: Montserrat-Regular;
  font-weight: 300;
  text-align: center;
  color: #040000;
  margin-top: 40px;
  margin-bottom: 52px;
}
.button-group {
  display: flex;
  justify-content: center;
  button {
    width: 234px;
    height: 47px;
    background: #000000;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    line-height: 18px;
    margin: 0 49px;
    cursor: pointer;
  }
}
.list {
  margin-top: 112px;
  display: flex;
  justify-content: space-between;
  .item {
    border: 1px solid #cacbcc;
  }
  .nft {
    padding: 10px;
  }
  .desc {
    border-top: 1px solid #cacbcc;
    width: 100%;
    height: 87px;
    font-size: 12px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    color: #040000;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      display: block;
      max-width: 209px;
      text-align: center;
    }
  }
  .nft-assets {
    width: 324px;
    max-width: 100%;
    height: 296px;
    img {
      width: 100%;
    }
  }
}
.mobile {
  .detail-logo {
    width: 240px;
    height: auto;
  }
  .list {
    flex-direction: column;
  }
  .item {
    margin-bottom: 50px;
  }
  .candidate,
  .auction {
    width: 46%;
    margin: 0 2%;
    font-size: 12px;
    height: 45px;
  }
  .detail-desc {
    font-family: Montserrat-Medium;
  }
  .nft-assets {
    margin: 0 auto;
    width: 313px;
    height: 313px;
  }
}
</style>
