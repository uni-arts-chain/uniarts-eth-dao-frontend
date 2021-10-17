/** * Created by Lay Hunt on 2021-09-07 17:12:51. */
<template>
  <div class="history">
    <el-row class="head">
      <el-col :span="4" class="item">Token</el-col>
      <el-col :span="5" class="item">Type</el-col>
      <el-col :span="8" class="item">Amount</el-col>
      <el-col :span="7" class="item">Date</el-col>
    </el-row>
    <el-row class="body">
      <div class="no-data" v-if="list.length == 0">No data</div>
      <el-row class="row" v-for="(v, i) in list" :key="i">
        <el-col :span="4" class="item">
          <span>{{ v.token }}</span></el-col
        >
        <el-col :span="5" class="item"
          ><span>{{ v.stake }}</span></el-col
        >
        <el-col :span="8" class="item">
          <span style="text-align: center">{{ v.amount }}</span>
        </el-col>
        <el-col :span="7" class="item"
          ><span>{{ format(v.date) }}</span></el-col
        >
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import http from "@/plugins/http";
import { notification } from "@/components/Notification";
import { DateFormat } from "@/utils";
export default defineComponent({
  name: "history",
  components: {},
  setup() {
    // TODO

    const list = ref([]);
    const isLoading = ref(false);
    const onRequestData = () => {
      isLoading.value = true;
      http
        .userGetMyRewards({})
        .then((res) => {
          isLoading.value = false;
          list.value = res.list;
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };

    onMounted(() => {
      onRequestData();
    });

    const format = (time) => {
      return DateFormat(time, true, true);
    };

    return {
      format,
      list,
    };
  },
});
</script>

<style lang="scss" scoped>
.history {
  width: 720px;
}
.head {
  width: 100%;
  display: flex;
  .item {
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: center;
    color: #000000;
    margin-bottom: 30px;
  }
}
.body {
  .row {
    width: 100%;
    border-radius: 23px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
    .item {
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: center;
      color: #000000;
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        width: 100%;
      }
      button.operate {
        color: #a43129;
        cursor: pointer;
        margin-left: 10px;
        background-color: transparent;
      }
    }
  }
}

.dialog-content {
  .input-body {
    margin-top: 20px;
    display: flex;
    align-items: center;
    height: 50px;
    border: 1px solid #e3e4e5;
    input {
      height: 100%;
      width: calc(100% - 50px);
      outline: none;
      background-color: white;
      font-size: 17px;
      border: none;
      padding: 0 15px;
    }
    .unit {
      width: 70px;
      font-size: 16px;
      background-color: white;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #000000;
      line-height: 48px;
      padding: 0 10px;
      border-left: 1px solid #e3e4e5;
    }
  }
  .balance {
    font-size: 18px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: center;
    color: #000000;
    line-height: 50px;
    padding-left: 20px;
  }
  button {
    width: 343px;
    height: 48px;
    background-color: black;
    border-radius: 6px;
    color: white;
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    line-height: 32px;
    margin: 0 auto;
    margin-top: 33px;
    display: block;
    cursor: pointer;
  }
  .notice {
    font-size: 12px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #898989;
    line-height: 18px;
    width: 343px;
    margin: 0 auto;
    margin-top: 21px;
  }
}

.confirm-content {
  padding: 30px 15px 60px 15px;
  .input-body {
    margin-top: 20px;
    display: flex;
    align-items: center;
    height: 50px;
    border: 1px solid #e3e4e5;
    input {
      height: 100%;
      width: calc(100% - 50px);
      outline: none;
      background-color: white;
      font-size: 17px;
      border: none;
      padding: 0 15px;
    }
    .unit {
      width: 70px;
      font-size: 16px;
      background-color: white;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #000000;
      line-height: 48px;
      padding: 0 10px;
      border-left: 1px solid #e3e4e5;
    }
  }
  .balance {
    font-size: 18px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: center;
    color: #000000;
    line-height: 50px;
    padding-left: 20px;
  }
  button {
    width: 100%;
    height: 48px;
    background-color: black;
    border-radius: 6px;
    color: white;
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    line-height: 32px;
    margin: 0 auto;
    margin-top: 33px;
    display: block;
    cursor: pointer;
  }
  .notice {
    font-size: 12px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #898989;
    line-height: 18px;
    width: 343px;
    margin: 0 auto;
    margin-top: 21px;
  }
}

.no-data {
  color: #aaa;
  font-size: 13px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

@media screen and (max-width: 750px) {
  .history {
    width: 100%;
  }
  .head {
    margin-top: 20px;
  }
  .head .item {
    margin-bottom: 13px;
    font-size: 15px;
    font-family: Montserrat-Medium;
  }
  .body .row {
    border-radius: 6px;
  }

  .body .row .item {
    padding: 15px 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    button.operate {
      color: #a43129;
      cursor: pointer;
    }
  }
}
</style>
