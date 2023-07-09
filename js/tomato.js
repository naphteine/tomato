(function () {
  "use strict";

  let elTomato = document.getElementById("tomato");
  let elStatus = document.getElementById("status");
  let elButton = document.getElementById("button");
  let elTime = document.getElementById("time");

  let status = "Stopped";
  let lastStatus = "Working";
  let tomatoCounter = 0;
  let tomatoMinute = 25;
  let breakCounter = 0;
  let breakMinute = 5;

  let timer = 0;
  let timerMinute = 0;
  let color = "red";

  let interval = 1000;
  let expected = Date.now() + interval;

  elButton.addEventListener("click", (event) => {
    if (status == "Stopped") {
      changeStatus(lastStatus);
    } else {
      lastStatus = status;
      changeStatus("Stopped");
    }

    elStatus.innerText = status;
    elButton.innerText = elButton.innerText == "Start" ? "Stop" : "Start";
  });

  const changeStatus = function (newStatus) {
    status = newStatus;

    switch (newStatus) {
      case "Working":
        color = "#c0c0ff99";
        break;
      case "break":
        color = "#c0ffc099";
        break;
      default:
        color = "#ffc0c099";
        break;
    }

    elTomato.style.backgroundColor = color;
  };

  setInterval(function () {
    let statusText, timerText;

    if (status == "break") {
      statusText = status;
      timerText =
        timerMinute.toString().padStart(2, 0) +
        ":" +
        timer.toString().padStart(2, 0) +
        "/" +
        breakMinute +
        ":00";
    } else if (status == "Working") {
      statusText = status;
      timerText =
        timerMinute.toString().padStart(2, 0) +
        ":" +
        timer.toString().padStart(2, 0) +
        "/" +
        tomatoMinute +
        ":00";
    } else {
      statusText = lastStatus + " " + status;

      if (lastStatus == "break") {
        timerText =
          timerMinute.toString().padStart(2, 0) +
          ":" +
          timer.toString().padStart(2, 0) +
          "/" +
          breakMinute +
          ":00";
      } else {
        timerText =
          timerMinute.toString().padStart(2, 0) +
          ":" +
          timer.toString().padStart(2, 0) +
          "/" +
          tomatoMinute +
          ":00";
      }
    }

    document.title = timerText + " - " + statusText;
    elTime.innerText =
      timerMinute.toString().padStart(2, 0) +
      ":" +
      timer.toString().padStart(2, 0);
  }, 10);

  const step = function () {
    let dt = Date.now() - expected;
    if (dt > interval) {
      // SNAFU
    }

    if (status != "Stopped") {
      timer++;

      if (timer > 59) {
        if (status == "Working" && timerMinute + 1 >= tomatoMinute) {
          tomatoCounter++;
          timerMinute = 0;
          changeStatus("break");
        } else if (status == "break" && timerMinute + 1 >= breakMinute) {
          breakCounter++;
          timerMinute = 0;
          changeStatus("Working");
        } else {
          timerMinute++;
        }

        timer = 0;
      }
    }

    expected += interval;
    setTimeout(step, Math.max(0, interval - dt));
  };

  setTimeout(step, interval);
})();
