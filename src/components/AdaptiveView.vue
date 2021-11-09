/** * Created by Lay Hunt on 2021-04-15 15:30:17. */
<template>
  <div ref="adaptiveView" :style="`width: ${width};height: ${height}`" class="adaptive-view">
    <div v-if="nft.aasm_state === 'sold'" class="status">SOLD</div>
    <div :class="{ preview: isPreview }" class="img-container">
      <AdaptiveImage
        v-if="viewType == 'img'"
        :cover="nft.img_main_file1?.url || nft.img_main_file1"
        :height="height"
        :isOrigin="!isResponsive"
        :isPreview="isPreview"
        :isResponsive="isResponsive"
        :url="nft.property_url"
        :width="width"
        @ImgLoaded="imgLoaded"
        @click="showPreview"
      />
      <AdaptiveVideo
        v-else-if="viewType == 'video'"
        :cover="nft.img_main_file1?.url || nft.img_main_file1"
        :height="height"
        :isPlay="!isPreview"
        :isPreview="isPreview"
        :isResponsive="isResponsive"
        :preload="preload"
        :source="nft.property_url"
        :width="width"
        @ImgLoaded="imgLoaded"
        @click="showPreview"
      />
      <div
        v-if="!isPreview && isAuction"
        :style="`left: ${auctionLabelPosition.left}px;top: ${auctionLabelPosition.top}px`"
        class="auction-label"
      >
        IN AUCTION
      </div>
      <div v-if="!isPreview && (isAuction || isWaiting)" class="auction-date">
        <div class="auction-data-pick">
          {{ isWaiting ? "Start after" : "End after" }}
          <span>{{ countdown }}</span>
        </div>
        <span>Bidding notice </span>
      </div>
      <div v-if="!isPreview && nft.has_royalty" class="copyright-icon">
        <div class="icon-sub">
          <div class="sub"></div>
          <icon-svg icon-class="copyright" />
        </div>
      </div>
      <icon-svg
        v-if="isPreview && viewType == 'video'"
        :style="`top: ${typeLabelPosition.top}px;right: ${typeLabelPosition.right}px`"
        class="video-label"
        icon-class="video"
      />
      <icon-svg
        v-if="isPreview && viewType == 'audio'"
        :style="`top: ${typeLabelPosition.top}px;right: ${typeLabelPosition.right}px;font-size: 23px`"
        class="video-label"
        icon-class="music"
      />
    </div>
    <Dialog :close="handlePreviewClose" :visible="isDialogPreview" type="fullscreen">
      <div class="dialog-content">
        <AdaptiveImage
          v-if="viewType == 'img'"
          :isOrigin="true"
          :isPreview="false"
          :isResponsive="false"
          :url="dialogPreviewUrl"
          height="100%"
          width="100%"
        />
        <AdaptiveVideo
          v-else-if="viewType == 'video'"
          :isPlay="true"
          :isPreview="false"
          :isResponsive="false"
          :source="dialogPreviewUrl"
        />
      </div>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "@/components/Dialog/Dialog";
import AdaptiveImage from "@/components/AdaptiveImage";
import AdaptiveVideo from "@/components/AdaptiveVideo";

export default {
  name: "adaptiveview",
  components: {
    Dialog,
    AdaptiveImage,
    AdaptiveVideo,
  },
  props: {
    nft: {
      type: Object,
      default: () => {},
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
    isAuction: {
      type: Boolean,
      default: false,
    },
    isWaiting: {
      type: Boolean,
      default: false,
    },
    countdown: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    isResponsive: {
      type: Boolean,
      default: false,
    },
    preload: {
      type: String,
      default: "metadata",
    },
  },
  data() {
    return {
      isDialogPreview: false,
      dialogPreviewUrl: "",
      auctionLabelPosition: {
        left: 0,
        top: 0,
      },
      typeLabelPosition: {
        left: 0,
        top: 0,
      },
      videoType: ["mp4", "wmv", "rm", "rmvb", "mov", "m4v", "mkv", "flv", "avi"],
      imgType: ["jpg", "jpeg", "gif", "png"],
      audioType: ["mp3", "aac", "wav", "flac"],
    };
  },
  computed: {
    viewType() {
      let source = (this.nft.property_url ? this.nft.property_url : "").split("?");
      source = source.length > 0 ? source[0] : "";
      let isVideo = new RegExp(`${this.videoType.map((v) => "\\." + v).join("|")}$`).test(source);
      let isImg = new RegExp(`${this.imgType.map((v) => "\\." + v).join("|")}$`).test(source);
      let isAudio = new RegExp(`${this.audioType.map((v) => "\\." + v).join("|")}$`).test(source);
      console.log(isVideo, isImg, isAudio);
      if (isVideo) {
        return "video";
      } else if (isImg) {
        return "img";
      } else if (isAudio) {
        return "audio";
      } else {
        return "";
      }
    },
  },
  methods: {
    handlePreviewClose() {
      this.isDialogPreview = false;
      this.dialogPreviewUrl = "";
    },
    showPreview() {
      if (this.isPreview) return;
      switch (this.viewType) {
        case "img":
          this.dialogPreviewUrl = this.nft.property_url;
          break;
        case "video":
          this.dialogPreviewUrl = this.nft.property_url;
          break;
      }
      this.isDialogPreview = true;
    },
    imgLoaded(info) {
      let imgWidth = info.width;
      let imgHeight = info.height;
      let boxWidth = this.$refs.adaptiveView.offsetWidth;
      let boxHeight = this.$refs.adaptiveView.offsetHeight;
      this.auctionLabelPosition.left = (boxWidth - imgWidth) / 2;
      this.auctionLabelPosition.top = (boxHeight - imgHeight) / 2 + 15;
      if (this.viewType === "video" || this.viewType === "audio") {
        console.log(this.viewType, info);
        this.typeLabelPosition.right = (boxWidth - imgWidth) / 2 + 5;
        this.typeLabelPosition.top = (boxHeight - imgHeight) / 2 + 5;
      }

      this.$emit("imgLoaded", this.auctionLabelPosition);
      this.$emit("imgLoadedSize", {
        width: imgWidth,
        height: imgHeight,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.adaptive-view {
  overflow: hidden;
  width: 100%;

  .status {
    position: absolute;
    z-index: 100;
    font-size: 16px;
    margin: 10px;
    color: #fff;
  }

  .img-container.preview {
    /* cursor: default; */
  }

  .img-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    .auction-label {
      position: absolute;
      top: 34px;
      left: 0;
      padding: 5px 16px;
      background-color: #f9b43b;
      font-size: 20px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      font-weight: 600;
      text-align: left;
      color: #ffffff;
      letter-spacing: 0px;
    }

    .auction-date {
      width: 100%;
      height: 50px;
      position: absolute;
      background-color: rgba(134, 29, 57, 0.8);
      bottom: 0;
      left: 0;
      font-size: 18px;
      font-weight: 400;
      text-align: left;
      color: #ffffff;
      padding: 5px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      letter-spacing: 0px;

      span {
        display: flex;
        align-items: center;
      }

      img {
        width: 17px;
        margin-left: 5px;
      }

      .auction-data-pick {
        display: flex;
        align-items: center;

        span {
          margin-left: 10px;
          font-weight: 600;
        }
      }
    }

    .copyright-icon {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 100px;
      height: 100px;
      color: white;
      font-size: 20px;

      .icon-sub {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .sub {
        position: absolute;
        border-left: 100px solid transparent;
        border-bottom: 100px solid rgba(0, 0, 0, 0.3);
        width: 0;
        height: 0;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
      }

      .svg-icon {
        position: absolute;
        left: 55px;
        top: 55px;
        font-size: 30px;
        /* color: #c61e1e; */
        color: white;
      }
    }

    .video-label {
      font-size: 28px;
      position: absolute;
      top: 3px;
      right: 7px;
      color: white;
    }
  }
}
</style>
