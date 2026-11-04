"use strict";

let currentAudio = null;
let omikuji_sound1 = new Audio("./sound/omikuji_sound1.mp3");
let omikuji_sound2 = new Audio("./sound/omikuji_sound2.mp3");
let omikuji_sound3 = new Audio("./sound/omikuji_sound3.mp3");
let omikuji_sound4 = new Audio("./sound/omikuji_sound4.mp3");
let omikuji_sound5 = new Audio("./sound/omikuji_sound5.mp3");
let omikuji_sound6 = new Audio("./sound/omikuji_sound6.mp3");
let resultSound = [
  omikuji_sound1,
  omikuji_sound2,
  omikuji_sound3,
  omikuji_sound4,
  omikuji_sound5,
  omikuji_sound6,
];

window.addEventListener(
  "DOMContentLoaded",
  function () {
    // ページ本体が読み込まれたタイミングで実行するコード
    // 01-08 add headerのテキスト1文字ずつランダム表示
    $("header").textillate({
      loop: false, // ループのオンオフ
      minDisplayTime: 9000, // テキストが置き換えられるまでの表示時間
      initialDelay: 1000, //遅延時間
      autoStart: true, // アニメーションを自動的にスタート
      in: {
        // フェードインのエフェクトの詳細設定
        effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
        delayScale: 1.5, // 遅延時間の指数
        sync: false, // trueはアニメーションをすべての文字に同時に適用
        delay: 50, // 文字ごとの遅延時間
        shuffle: true, // trueは文字を順番にではなく、ランダムに
      },
    });

    // 01-08 add omikuji.png(id="btn1") ボヤァと表示
    $(function () {
      ScrollReveal().reveal("#btn1", { duration: 9000 });
    });
    this.setTimeout(function () {
      let popMessage = "いらっしゃい! おみくじ引いてって!";
      this.window.alert(popMessage);
    }, "3000");
  },
  false
);

const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");

btn1.addEventListener(
  "click",
  function () {
    // 01-09 add Array

    let resultText = [
      "大吉!!!!!",
      "吉!!!!",
      "中吉!!!",
      "小吉!!",
      "末吉!",
      "凶。。",
    ];

    let resultColor = [
      "#ff0000",
      "#c71585",
      "#ff1493",
      "#ff69b4",
      "#ff8c00",
      "#1e90ff",
    ];

    let resultFontSize = ["80px", "70px", "60px", "50px", "40px", "30px"];
    let resultMaxSpeed = [20, 15, 10, 5, 5, 5];
    let resultMaxSize = [35, 30, 20, 10, 20, 30];
    let resultMinSize = [20, 15, 10, 8, 10, 15];
    let resultImage = [
      "img/star.png",
      "img/sakura_hanabira.png",
      "img/sakura_hanabira.png",
      "img/sakura_hanabira.png",
      "img/leaf.png",
      "img/snowflakes.png",
    ];
    let n = Math.floor(Math.random() * resultText.length); // 01-09 chg
    omikujiText.textContent = resultText[n];
    omikujiText.style.color = resultColor[n];
    omikujiText.style.fontSize = resultFontSize[n];

    soundControl(resultSound[n]);
    //switch (n) {
    //case 0:
    //omikujiText.textContent = "Very Happy!!!";
    //omikujiText.style.color = "red";
    //omikujiText.style.fontSize = "38px";
    //break;
    //case 1:
    //omikujiText.textContent = "Happy!!!";
    //omikujiText.style.color = "yellow";
    //omikujiText.style.fontSize = "30px";
    //break;
    //case 2:
    // omikujiText.textContent = "Unhappy!!!";
    //omikujiText.style.color = "black";
    //omikujiText.style.fontSize = "20px";
    //break;
    //}

    // 01-08 add sowfall stop
    $(document).snowfall("clear");

    // 01-08 add sowfall start
    $(document).ready(function () {
      $(document).snowfall({
        maxSpeed: resultMaxSpeed[n],
        minSpeed: 1,
        maxSize: resultMaxSize[n],
        minSize: resultMinSize[n],
        image: resultImage[n],
      });
    });
  },
  false
);

//-01-10 add sound control
function soundControl(w_sound) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  w_sound.play();
  currentAudio = w_sound;
}
