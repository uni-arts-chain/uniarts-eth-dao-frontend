import Notification from "./Notification";
import { createToastInterface } from "vue-toastification";
import store from "@/store";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

let toast = "";

function getComponent() {
  return {
    component: Notification,

    // Props are just regular props, but these won't be reactive
    props: {
      noticeType: "",
      noticeText: "",
    },

    // Listeners will listen to and execute on event emission
    listeners: {
      // click: () => console.log("Clicked!"),
      // myEvent: myEventHandler
    },
  };
}

export const notification = {
  success,
  error,
  info,
  loading,
  clear: toast.clear,
  notice,
  dismiss,
};

function install(vue) {
  toast = createToastInterface({
    icon: false,
    toastClassName: store.state.global.isMobile ? "vote-toast vote-toast-mobile" : "vote-toast",
    timeout: 3000,
    hideProgressBar: true,
    closeOnClick: false,
  });
  vue.config.globalProperties.$notify = notification;
}

function dismiss(id) {
  return toast.dismiss(id);
}

function notice(data, options = {}) {
  let Component = getComponent();
  Component.props.noticeType = data.type;
  Component.props.noticeTitle = data.title;
  Component.props.noticeMessage = data.message;
  let object = Object.assign(
    {
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    },
    options
  );
  return toast(Component, object);
}

function info(string) {
  let Component = getComponent();
  Component.props.noticeType = "info";
  Component.props.noticeMessage = string;
  return toast(Component);
}

function success(string) {
  let Component = getComponent();
  Component.props.noticeType = "success";
  Component.props.noticeMessage = string;
  return toast(Component);
}

function error(string) {
  let Component = getComponent();
  Component.props.noticeType = "error";
  Component.props.noticeMessage = string;
  return toast(Component);
}

function loading(string) {
  let Component = getComponent();
  Component.props.noticeType = "loading";
  Component.props.noticeMessage = string;
  return toast(Component, {
    timeout: 0,
    closeOnClick: false,
    closeButton: false,
    draggable: false,
  });
}

export default {
  install,
  notification,
};
