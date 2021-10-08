/** * Created by Lay Hunt on 2021-10-08 15:07:11. */
<template>
  <div class="rule container">
    <div class="title">Vote Rules:</div>
    <p>
      1. UART & wETH Holder can staking their token to vote for NFTs that they think are most
      in-demand to earn UART reward.
    </p>
    <p>2. There are 6 NFTs candidates for each voting round, and the period of which is 14 days.</p>
    <p>
      3. All NFTs will be transferred to auction round after voting round finish, and the period of
      auction around is 5 days
    </p>
    <p>
      4. According to the number of votes obtained by each NFT, UART rewards will be continuously
      cast into NFTs, which can be retrieved by the owner.
    </p>
    <p>5. Vote for NFT won't cost any token, voted token can be retrieved at UTC 00:00 next day.</p>
    <p>6. Vote reward will be distributed at UTC 00:00 everyday during the voting period.</p>
    <p>
      7. Auction reward will be distributed after the auction round. The higher the deal price, the
      more benefit will be available for the voters of the NFT.
    </p>
    <p>8. If NOT retrieved, voted token will be count as another vote for the same NFT.</p>
    <p>9. 1 wETH vote = 100 UART vote</p>
    <p>
      10. Both vote rewards and auction rewards are bonded at first, you need to unbond your UARTs
      in order to withdraw them into your wallet. Bonded UARTs can be used to vote for NFTs to earn
      more reward. Unbonding UARTs can NOT be used to vote.
    </p>
    <p>
      11. Unbonding UARTs take 60 days to complete, and releasing 1/60 of the total amount each day
      during the process.
    </p>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "rule",
  setup() {
    // TODO

    return {};
  },
});
</script>

<style lang="scss" scoped>
.rule {
  padding: 40px 40px 80px 40px;
}
.title {
  font-size: 32px;
  font-family: Montserrat-Medium;
  font-weight: 500;
  text-align: left;
  color: #000000;
  line-height: 56px;
  margin-bottom: 20px;
}
p {
  font-size: 15px;
  font-family: Montserrat-Regular;
  font-weight: 300;
  text-align: left;
  color: #595757;
  line-height: 31px;
}

@media screen and (max-width: 750px) {
  .rule {
    padding: 20px 20px 70px 20px;
  }
}
</style>
