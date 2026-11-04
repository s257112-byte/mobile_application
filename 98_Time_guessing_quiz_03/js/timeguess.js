"use strict";

const timer = document.getElementById("timer");
const btn_start = document.getElementById("btn_start");
const btn_stop = document.getElementById("btn_stop");
const btn_reset = document.getElementById("btn_reset");

const sound_start = new Audio("./sound/start.mp3");
const sound_stop1 = new Audio("./sound/stop1.mp3");
const sound_stop2 = new Audio("./sound/stop2.mp3");
const sound_reset = new Audio("./sound/reset.mp3");

function playSound(audio) {
  audio.currentTime = 0;
  audio.play();
}

let startTime;
let timeoutid;
let stopTime = 0;

function setState(startOn, stopOn, resetOn) {
  const list = [
    [btn_start, startOn],
    [btn_stop, stopOn],
    [btn_reset, resetOn],
  ];
  for (const [btn, on] of list) {
    btn.classList.toggle("js-inactive", !on);
    btn.classList.toggle("js-unclickable", !on);
  }
}

function setButtonStateInitial() {
  setState(true, false, false);
}

function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden");
  timer.classList.remove("timer_appear");
  setState(false, true, false);
}

function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden");
  timer.classList.add("timer_appear");
  setState(false, false, true);
}

function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(countUp, 10);
}

setButtonStateInitial();

btn_start.addEventListener("click", function () {
  playSound(sound_start);
  setButtonStateRunning();
  startTime = Date.now();
  countUp();
});

btn_stop.addEventListener("click", function () {
  setButtonStateStopped();
  clearTimeout(timeoutid);
  stopTime += Date.now() - startTime;

  if (stopTime >= 10000 && stopTime < 11000) {
    document.body.style.backgroundColor = "transparent";
    document.body.style.backgroundImage = "url(./img/fireworks.gif)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    playSound(sound_stop2);
  } else {
    playSound(sound_stop1);
  }
});

btn_reset.addEventListener("click", function () {
  playSound(sound_reset);
  setButtonStateInitial();
  timer.textContent = "00:00.000";
  timer.classList.remove("timer_appear");
  document.body.style.backgroundColor = "";
  document.body.style.backgroundImage = "none";
  stopTime = 0;
});
