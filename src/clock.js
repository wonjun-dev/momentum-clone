const clockDiv = document.querySelector(".js-clock"),
  time = clockDiv.querySelector("h1");

function getTime() {
  const currentDate = new Date();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  time.innerText = `${hour < 10 ? `0{hour}` : hour} : ${
    minute < 10 ? `0${minute}` : minute
  }`;
}

function init() {
  getTime();
}

init();
