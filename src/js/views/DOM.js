//  QUERY ALL NEEDED DOM ELEMENTS
const DOM = {
  mainSectionEl: document.querySelector(".main"),
  gameSectionEl: document.querySelector(".section-game"),
  tilesArry: Array.from(document.querySelectorAll(".tile")),
  middleTile: document.querySelector(".middle"),
  yellowMeteor: document.querySelector(".yellow"),
  innerYellowMeteor: document.querySelector(".yellow-inner"),
  blueMeteor: document.querySelector(".blue"),
  meteorsCounter: document.querySelector(".meteors-num"),
  turnsCounter: document.querySelector(".turn"),
  popUp: document.querySelector(".pop-up"),
  restartBtn: document.querySelector(".restart-btn"),
  copyRight: document.querySelector(".year"),
  startPlayingBtn: document.querySelector(".play-btn"),
  topBtn: document.querySelector(".top-btn"),
  resetBtn: document.querySelector(".reset-btn"),
};

export default DOM;
