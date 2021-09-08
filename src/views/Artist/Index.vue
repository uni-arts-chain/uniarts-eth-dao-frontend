/** * Created by Lay Hunt on 2021-09-08 17:27:09. */
<template>
  <div class="index container">
    <div class="artist">
      <img class="avatar" src="https://avatars.githubusercontent.com/u/87279659?v=4" />
      <div class="username">Artist Name</div>
      <p class="desc">
        "Planet spirit" is an oil painting created by in 2010. After successful creation, it has
        aroused great repercussions and won great recognition in the circle, which also led to the
        introduction of the work, introduction... repercussions and won great recognition in the
        circle, which also led to the introduction of the work, introduction... repercussions and
        won great recognition in the circle, which also led to the introduction of the work,
        introduction...
      </p>
    </div>
    <div class="collection">
      <div class="title">CREATIONS</div>
      <div class="list">
        <div class="item" v-for="(v, i) in list" :key="i"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "index",
  setup() {
    // TODO

    const list = [1, 2, 3, 4];

    return {
      list,
    };
  },
});
</script>

<style lang="scss" scoped>
.index {
  margin-top: 125px;
  overflow: hidden;
  margin-bottom: 172px;
}
.artist {
  float: left;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 432px;
  .avatar {
    width: 103px;
    height: 103px;
    border-radius: 50%;
  }
  .username {
    font-size: 44px;
    font-family: Montserrat-Medium;
    text-align: left;
    color: #000000;
    margin-left: 39px;
    line-height: 103px;
    width: 290px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .desc {
    width: 290px;
    font-size: 12px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: justifyLeft;
    color: #898989;
    line-height: 18px;
  }
}
.collection {
  float: left;
  max-width: 680px;
  margin-left: 50px;
  .title {
    font-size: 21px;
    font-family: Montserrat-Medium;
    font-weight: 400;
    text-align: center;
    color: #000000;
    line-height: 64px;
    padding-bottom: 16px;
    border-bottom: 2px solid black;
    margin-bottom: 33px;
  }
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 331px;
      height: 331px;
      background-color: black;
      margin-bottom: 16px;
    }
  }
}
</style>
