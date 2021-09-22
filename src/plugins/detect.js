import UAParser from "ua-parser-js";
const uaParser = new UAParser(window.navigator.userAgent);

export function getInstance() {
  uaParser.setUA(window.navigator.userAgent);
  return uaParser;
}

export default {
  browser: uaParser.getBrowser(),
  device: uaParser.getDevice(),
  getInstance,
};
