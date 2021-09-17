import UAParser from "ua-parser-js";
const uaParser = new UAParser(window.navigator.userAgent);

export function getInstance() {
  return new UAParser(window.navigator.userAgent);
}

export default {
  browser: uaParser.getBrowser(),
  device: uaParser.getDevice(),
  getInstance,
};
