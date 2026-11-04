"use strict";
let prev_value = null;
let w_result = "";
let w_total = "";
let currentAudio = null;
let click_sound = new Audio("sound/click.mp3");

const calcLog = document.getElementById("calcLog");
const result = document.getElementById("result");
const buttons = document.getElementById("buttons");

buttons.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;

  soundControl(click_sound);
  console.log(`prev_value: ${prev_value} w_result: ${w_result} w_total: ${w_total} calcLog: ${calcLog.textContent} result: ${result.textContent}`);

  const btn_value = event.target.value;

  if (btn_value === "C") {
    calcLog.textContent = "";
    result.textContent = "";
    w_result = "";
    w_total = "";
  } else if (btn_value === "=") {
    calcLog.textContent = w_result;
    try {
      calcLog.textContent = w_result;
      w_total = eval(w_result);
      result.textContent = w_total.toLocaleString('ja-JP');
    } catch {
      result.textContent = "Error";
    }
  } else {
    if (prev_value === "=") {
      calcLog.textContent = w_total;
      w_result = w_total;
    }
    w_result += btn_value;
    result.textContent = w_result.toLocaleString('ja-JP');
    calcLog.textContent += btn_value;
  }

  prev_value = btn_value;
  console.log(`prev_value: ${prev_value} w_result: ${w_result} w_total: ${w_total} calcLog: ${calcLog.textContent} result: ${result.textContent}`);
});

function soundControl(w_sound) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  w_sound.play().catch(error => {
    if (error.name !== 'AbortError') {
      console.error("再生エラー:", error);
    }
  });
  currentAudio = w_sound;
}