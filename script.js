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
  let currentDay = getDayOfWeek(dt);
  if (currentDay < 6) {
    if (before1715(dt)) {
      return dt.startOf("day");
    } else {
      // after 1715
      if (currentDay >= 1 && currentDay < 5) {
        return dt.startOf("day").plus({ days: 1 });
      } else {
        // if currentDay == 5
        return dt.startOf("day").plus({ days: 3 });
      }
    }
  } else {
    switch (currentDay) {
      case 6:
        return dt.startOf("day").plus({ days: 2 });
        break;
      case 7:
        return dt.startOf("day").plus({ days: 1 });
        break;
      default:
        throw `Invalid currentDay: ${currentDay}`;
    }
  }
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