/** * Created by Lay Hunt on 2021-09-06 21:06:32. */
<template>
  <div class="artworks container">
    <div class="title">Featured Artworks</div>
    <div class="list-head">
      <div class="auctions-head">Timed Auctions</div>
      <div class="offers-head">Offers</div>
    </div>
    <div class="list-body">
      <div class="auctions-body">
        <div class="main-item">
          <img
            src="https://ipfs.pixura.io/ipfs/QmVPaeYb8mSDTUkMuw1HHnCP6evmv1Zr3LEASRtbRLcWz2/StephenTompkins_Typhon.jpg"
          />
        </div>
        <div class="artist-info">
          <div class="avatar">
            <div class="avatar-image">
              <img src="https://avatars.githubusercontent.com/u/87279659?v=4" />
              <div class="name">Kyle Bighead</div>
            </div>
          </div>
          <div class="info">
            <div class="vote-number">
              Current High Bid <span style="color: #fe0000">1500</span> USDT
            </div>
            <div class="vote-date">
              <img src="@/assets/images/date-clock.png" />
              <div class="date">3 Days 23 Hour 59 Minute 59 Second</div>
            </div>
          </div>
        </div>
      </div>
      <div class="offers-body">
        <div class="sub-item">
          <div class="item-content">
            <img
              src="https://ipfs.pixura.io/ipfs/QmVPaeYb8mSDTUkMuw1HHnCP6evmv1Zr3LEASRtbRLcWz2/StephenTompkins_Typhon.jpg"
            />
          </div>
          <div class="item-user">
            <span class="username">name@</span>
            <span style="color: #fe0000">$1500</span>
          </div>
        </div>
        <div class="sub-item">
          <div class="item-content">
            <img
              src="https://ipfs.pixura.io/ipfs/QmVPaeYb8mSDTUkMuw1HHnCP6evmv1Zr3LEASRtbRLcWz2/StephenTompkins_Typhon.jpg"
            />
          </div>
          <div class="item-user">
            <span class="username">name@</span>
            <span style="color: #fe0000">$1500</span>
          </div>
        </div>
        <div class="sub-item">
          <div class="item-content">
            <img
              src="https://ipfs.pixura.io/ipfs/QmVPaeYb8mSDTUkMuw1HHnCP6evmv1Zr3LEASRtbRLcWz2/StephenTompkins_Typhon.jpg"
            />
          </div>
          <div class="item-user">
            <span class="username">name@</span>
            <span style="color: #fe0000">$1500</span>
          </div>
        </div>
      </div>
    </div>
    <div class="list-body">
      <div class="auctions-body">
        <div class="main-item">
          <img
            src="https://ipfs.pixura.io/ipfs/QmVPaeYb8mSDTUkMuw1HHnCP6evmv1Zr3LEASRtbRLcWz2/StephenTompkins_Typhon.jpg"
          />
        </div>
        <div class="artist-info">
          <div class="avatar">
            <div class="avatar-image">
              <img src="https://avatars.githubusercontent.com/u/87279659?v=4" />
              <div class="name">Kyle Bighead</div>
            </div>
          </div>
          <div class="info">
            <div class="vote-number">
              Current High Bid <span style="color: #fe0000">1500</span> USDT
            </div>
            <div class="vote-date">
              <img src="@/assets/images/date-clock.png" />
              <div class="date">3 Days 23 Hour 59 Minute 59 Second</div>
            </div>
          </div>
        </div>
      </div>
      <div class="offers-body">
        <div class="sub-item">
          <div class="item-content">
            <img
              src="https://ipfs.pixura.io/ipfs/QmVPaeYb8mSDTUkMuw1HHnCP6evmv1Zr3LEASRtbRLcWz2/StephenTompkins_Typhon.jpg"
            />
          </div>
          <div class="item-user">
            <span class="username">name@</span>
            <span style="color: #fe0000">$1500</span>
          </div>
        </div>
        <div class="sub-item">
          <div class="item-content">
            <img
              src="https://ipfs.pixura.io/ipfs/QmVPaeYb8mSDTUkMuw1HHnCP6evmv1Zr3LEASRtbRLcWz2/StephenTompkins_Typhon.jpg"
            />
          </div>
          <div class="item-user">
            <span class="username">name@</span>
            <span style="color: #fe0000">$1500</span>
          </div>
        </div>
        <div class="sub-item">
          <div class="item-content">
            <img
              src="https://ipfs.pixura.io/ipfs/QmVPaeYb8mSDTUkMuw1HHnCP6evmv1Zr3LEASRtbRLcWz2/StephenTompkins_Typhon.jpg"
            />
          </div>
          <div class="item-user">
            <span class="username">name@</span>
            <span style="color: #fe0000">$1500</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "artworks",
  setup() {
    // TODO

    return {};
  },
});
</script>

<style lang="scss" scoped>
.title {
  margin-top: 159px;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: #000000;
  line-height: 48px;
  margin-bottom: 81px;
}
.list-head {
  margin-bottom: 38px;
  display: flex;
  justify-content: center;
  .auctions-head {
    font-size: 18px;
    font-family: Montserrat-Medium;
    font-weight: 400;
    width: 492px;
    text-align: left;
    color: #040000;
    line-height: 23px;
  }
  .offers-head {
    font-size: 18px;
    margin-left: 196px;
    width: 143px;
    font-family: Montserrat-Medium;
    font-weight: 400;
    text-align: left;
    color: #040000;
    line-height: 23px;
  }
}
.list-body {
  display: flex;
  justify-content: center;
  .auctions-body {
    .main-item {
      width: 492px;
      height: 540px;
      overflow: hidden;
      box-shadow: 3px 4px 12px 12px rgba(34, 24, 20, 0.11);
      img {
        height: 100%;
      }
    }
    .artist-info {
      padding-left: 30px;
      margin-top: 23px;
      overflow: hidden;
      .avatar {
        float: left;
        margin-bottom: 10px;
      }
      .info {
        float: left;
      }
      .avatar-image {
        display: flex;
        align-items: center;
        img {
          overflow: hidden;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          box-shadow: 3px 4px 9px 0px rgba(34, 24, 20, 0.52);
        }
        .name {
          margin-left: 14px;
          font-size: 13px;
          font-family: Montserrat-Regular, Montserrat-Light;
          font-weight: 300;
          text-align: left;
          color: #000000;
        }
      }
      .avatar .name {
        font-size: 13px;
        font-family: Montserrat-Regular, Montserrat-Light;
        font-weight: 300;
        text-align: left;
        color: #000000;
      }
      .info {
        margin-left: 39px;
        font-size: 13px;
        font-family: Montserrat, Montserrat-Light;
        font-weight: 300;
        text-align: left;
        color: #898989;
        .vote-number {
          font-size: 13px;
          font-weight: 300;
          text-align: center;
          color: #040000;
          line-height: 24px;
          line-height: 36px;
        }
        .vote-date {
          display: flex;
          align-items: center;
          margin-top: 7px;
        }
        .vote-date img {
          width: 20px;
          height: 20px;
        }
        .vote-date .date {
          margin-left: 5px;
        }
      }
    }
  }
  .offers-body {
    margin-left: 196px;
    margin-bottom: 110px;
    .sub-item {
      margin-bottom: 31px;
      .item-content {
        width: 143px;
        height: 143px;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
      .item-user {
        font-size: 13px;
        font-family: Montserrat-Regular, Montserrat-Light;
        font-weight: 300;
        text-align: left;
        color: #898989;
        margin-top: 15px;
        line-height: 24px;
        .username {
          margin-right: 17px;
        }
      }
    }
  }
}
</style>
