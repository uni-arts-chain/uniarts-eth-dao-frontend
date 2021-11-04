/** * Created by Lay Hunt on 2021-11-04 19:21:14. */
<template>
  <div class="migrate">
    <div class="item">
      <div class="title">Migrate the Bonded balance in contract V1 to V2</div>
      <button @click="onMigrate">Migrate</button>
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
          >Because your account still has a bonded balance in contract V1, please retrieve it to
          bonded before migrating.</span
        >
      </div>
      <button @click="onRetrieve">Retrieve</button>
    </div>
  </Dialog>
  <MobileConfirm v-else v-model="dialogInfoVisible" customClass="retrieve-confirm">
    <div class="confirm-content">
      <div class="title">
        <span
          >Because your account still has a bonded balance in contract V1, please retrieve it to
          bonded before migrating.</span
        >
      </div>
      <button @click="onRetrieve">Retrieve</button>
    </div>
  </MobileConfirm>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Dialog from "@/components/Dialog";
import MobileConfirm from "@/components/MobileConfirm";

export default defineComponent({
  name: "migrate",
  components: { Dialog, MobileConfirm },
  setup() {
    // TODO
    const router = useRouter();

    const dialogInfoVisible = ref(false);

    const migrateList = [
      { vote_contract: "address", can_migrate: true | false, can_retrieve: true | false },
    ];

    const canMigrate = ref(false);
    canMigrate.value = migrateList.find((v) => v.can_migrate);
    const canRetrieve = ref(false);
    canRetrieve.value = migrateList.find((v) => v.can_retrieve);

    const onMigrate = () => {
      if (canRetrieve.value) {
        dialogInfoVisible.value = true;
        return;
      }
    };

    const onRetrieve = () => {
      dialogInfoVisible.value = false;
      router.push("/profile/votes");
    };

    return {
      onMigrate,
      dialogInfoVisible,
      canMigrate,
      canRetrieve,
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
