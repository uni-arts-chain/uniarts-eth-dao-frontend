/** * Created by Lay Hunt on 2021-11-04 19:21:14. */
<template>
  <div class="migrate">
    <div class="item">
      <div class="title">Migrate the Bonded balance in contract V1 to V2</div>
      <button @click="onMigrate" v-loading="migrateLoading">Migrate</button>
    </div>
  </div>
  <Dialog
    v-if="!$store.state.global.isMobile"
    v-model="dialogInfoVisible"
    customClass="migrate-info-dialog"
    type="small"
  >
    <div class="dialog-content dialog-body">
      <div class="title">
        <span
          >Please retrieve your voted wETH before migrating. Voted UARTs will be migrated into new
          contract automatically</span
        >
      </div>
      <button @click="onRetrieve">Retrieve</button>
    </div>
  </Dialog>
  <MobileConfirm v-else v-model="dialogInfoVisible" customClass="retrieve-confirm">
    <div class="confirm-content">
      <div class="title">
        <span
          >Please retrieve your voted wETH before migrating. Voted UARTs will be migrated into new
          contract automatically</span
        >
      </div>
      <button @click="onRetrieve">Retrieve</button>
    </div>
  </MobileConfirm>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
import { DAPP_CONTRACTS } from "@/config";
import { notification } from "@/components/Notification";
import Dialog from "@/components/Dialog";
import MobileConfirm from "@/components/MobileConfirm";

export default defineComponent({
  name: "migrate",
  components: { Dialog, MobileConfirm },
  setup() {
    // TODO
    const router = useRouter();

    const dialogInfoVisible = ref(false);
    const migrateLoading = ref(false);

    const onMigrate = () => {
      if (store.getters["user/canRetrieve"]) {
        dialogInfoVisible.value = true;
        return;
      }
      migrateLoading.value = true;
      let info = store.state.user.migrateInfo;
      let migrateItem = info.find((v) => v.can_migrate);
      if (!migrateItem) {
        migrateLoading.value = false;
        return;
      }
      let contractModule = DAPP_CONTRACTS[migrateItem?.vote_contract?.toLowerCase()];
      const notifyId = notification.loading("Please wait for the wallet's response");
      console.log(migrateItem?.vote_contract?.toLowerCase());
      console.log(DAPP_CONTRACTS);
      contractModule?.contract
        ?.migrate((err, txHash) => {
          migrateLoading.value = false;
          if (err) {
            console.log(err);
          }
          if (txHash) {
            console.log(txHash);
            notification.dismiss(notifyId);
            notification.success(txHash);
          }
        })
        .then(async (receipt) => {
          console.log("receipt: ", receipt);
        })
        .catch((err) => {
          migrateLoading.value = false;
          notification.dismiss(notifyId);
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };

    const onRetrieve = () => {
      dialogInfoVisible.value = false;
      router.push("/profile/votes");
    };

    onMounted(() => {
      if (!store.getters["user/canMigrate"]) {
        router.push("/profile");
      }
    });

    return {
      onMigrate,
      dialogInfoVisible,
      migrateLoading,
      onRetrieve,
    };
  },
});
</script>

<style lang="scss" scoped>
.migrate {
  .item {
    border: 2px solid black;
    /* border-radius: 12px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 40px;
  }
  .title {
    font-size: 15px;
    text-align: left;
    width: calc(100% - 180px);
  }
  button {
    background: #000000;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    line-height: 18px;
    cursor: pointer;
    padding: 10px 30px;
  }
}

.dialog-body {
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    word-break: break-word;
    font-size: 15px;
  }
  button {
    margin-top: 30px;
    background: #000000;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    line-height: 18px;
    cursor: pointer;
    padding: 10px 20px;
  }
}

@media screen and (max-width: 750px) {
  .migrate {
    .item {
      margin: 0 auto;
      width: calc(100% - 30px);
      border: 2px solid black;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 24px 15px;
    }
    .title {
      width: 100%;
      font-size: 15px;
      text-align: left;
    }
    button {
      margin-top: 30px;
      background: #000000;
      border-radius: 6px;
      font-size: 15px;
      font-weight: 700;
      text-align: center;
      color: #ffffff;
      line-height: 18px;
      cursor: pointer;
      width: 100%;
      padding: 14px 30px;
    }
  }
  .confirm-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      margin-top: 30px;
      padding: 30px 15px;
    }
    button {
      margin: 0 auto;
      margin-top: 20px;
      margin-bottom: 70px;
      background: #000000;
      border-radius: 6px;
      font-size: 15px;
      font-weight: 700;
      text-align: center;
      color: #ffffff;
      line-height: 18px;
      cursor: pointer;
      width: 230px;
      padding: 15px 30px;
    }
  }
}
</style>
