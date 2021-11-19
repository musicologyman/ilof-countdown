const EASTERN_TIME = "America/New_York";

let DateTime = luxon.DateTime;

function getNow() {
  return DateTime.now().setZone(EASTERN_TIME);
}

function getDayOfWeek(dt) {
  return Number(dt.toFormat("c"));
}

function before1715(dt) {
  let hour = dt.hour;
  let minute = dt.minute;
  if (hour < 17) {
    return true;
  } else if (hour > 17) {
    return false;
  } else {
    if (minute < 15) {
      return true;
    } else {
      return false;
    }
  }
}

function getNextShowDate(dt) {
   return DateTime.fromObject({year:2021,month:11,day:29,hour:17}, {zone: 'America/New_York'});
}

function getNextShowDateTime(currentDate) {
  let nextShowDate = getNextShowDate(currentDate);
  return nextShowDate.plus({ hours: 17 });
}

function timeToNextShow(currentDateTime) {
  let nextShowDateTime = getNextShowDateTime(currentDateTime);
  let values = nextShowDateTime.diff(currentDateTime, ["hours", "minutes"])[
    "values"
  ];
  return { hours: values.hours, minutes: Math.round(values.minutes) };
}

function updateCountdown() {
  let now = DateTime.now().setZone(EASTERN_TIME);
  let nextShowIn = timeToNextShow(now);
  document.querySelector("#hours").innerHTML = nextShowIn.hours;
  document.querySelector("#minutes").innerHTML = nextShowIn.minutes;
  document.querySelector(
    "#timeRightNow"
  ).innerHTML = DateTime.utc().toLocaleString(DateTime.TIME_24_WITH_SECONDS);
}

function startCountdown() {
  window.setInterval(updateCountdown, 1000);
}

document.addEventListener("load", startCountdown());
