/** * Created by Lay Hunt on 2021-09-08 15:36:36. */
<template>
  <div class="withdraw">
    <h4>Uink Withdraw</h4>
    <div class="input-body">
      <input placeholder="Please enter quantity" type="number" />
      <span class="unit" style="margin-left: 22px">USDT</span>
    </div>
    <div class="label">Avalible: 99 Uink</div>
    <button>Withdraw</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "withdraw",
  setup() {
    // TODO

    return {};
  },
});
</script>

<style lang="scss" scoped>
.withdraw {
  margin: 0 auto;
  width: 700px;
}
h4 {
  margin: 0 auto;
  margin-top: 141px;
  font-size: 18px;
  font-family: Montserrat-Regular;
  font-weight: 600;
  text-align: left;
  color: #000000;
  line-height: 56px;
  margin-bottom: 57px;
}
.input-body {
  font-size: 18px;
  font-family: Montserrat-Regular;
  font-weight: 300;
  text-align: left;
  color: #000000;
  line-height: 56px;
  width: 500px;
  margin: 0 auto;
  position: relative;
  input {
    border: 2px solid #cacbcc;
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #898989;
    line-height: 56px;
    width: 500px;
    height: 56px;
    padding: 0px 20px;
  }
  .unit {
    position: absolute;
    left: 100%;
  }
}
.label {
  font-size: 14px;
  font-family: Montserrat-Regular;
  font-weight: 300;
  text-align: left;
  color: #000000;
  line-height: 56px;
  width: 500px;
  margin: 0 auto;
  padding-left: 15px;
}
button {
  width: 407px;
  height: 58px;
  opacity: 1;
  background: #000000;
  border-radius: 11px;
  font-size: 14px;
  font-family: Montserrat-Medium;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  line-height: 31px;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 84px;
  display: block;
}
</style>
