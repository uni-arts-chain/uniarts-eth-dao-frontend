export function DateFormatCountdown(startTime, endTime) {
  if (!startTime || !endTime || isNaN(startTime) || isNaN(endTime)) {
    return "";
  }
  startTime *= 100;
  endTime *= 100;
  var now = new Date().getTime();
  var inputTime = 0,
    targetTime = 0;
  if (now < startTime) {
    targetTime = now;
    inputTime = startTime;
  } else if (now > startTime && now < endTime) {
    targetTime = now;
    inputTime = endTime;
  } else {
    return "";
  }
  var date = inputTime - targetTime;
  var d = parseInt(date / (3600000 * 24));
  d = d < 10 ? "0" + d : d;
  var h = parseInt((date % (3600000 * 24)) / 3600000);
  h = h < 10 ? "0" + h : h;
  var m = parseInt((date % 3600000) / 60000);
  m = m < 10 ? "0" + m : m;
  var s = parseInt((date % 60000) / 1000);
  s = s < 10 ? "0" + s : s;
  return {
    day: d,
    hour: h,
    minute: m,
    second: s,
  };
}
