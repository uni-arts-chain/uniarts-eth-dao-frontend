import axios from "axios";
import {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc,
} from "@/interceptors/axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc);

axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc);

export default axiosInstance;
