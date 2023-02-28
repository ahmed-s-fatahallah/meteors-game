//  GLOBAL IMPORTS
import dom from "./DOM";
import { tilesStyling } from "./tilesView";
import * as turn from "./turnsView";
import * as popUp from "./popUpView";

// GLOBAL VARIABLES
export let isHolding;

// MOUSEDOWN AND TOUCHDOWN HANDLER
export const mouseDown = function (handler) {
  const mouseDownHandler = (e) => {
    if (
      (e.type === "touchmove" && e.targetTouches.length > 1) ||
      (e.type === "mousedown" && e.button !== 0)
    )
      return;
    if (e.type === "mousedown") {
      e.preventDefault();
      handler(e, e.target);
    }
    if (e.type === "touchstart") handler(e.touches[0], e.target);
    isHolding = true;
  };
  ["mousedown", "touchstart"].forEach((event) => {
    document.addEventListener(event, mouseDownHandler);
  });
};

// MOUSEMOVE AND TOUCHMOVE HANDLER
export const mouseMove = function (handler) {
  const mouseMoveHandler = (e) => {
    if (
      (e.type === "touchmove" && e.targetTouches.length > 1) ||
      (e.type === "mousemove" && e.button !== 0)
    )
      return;
    if (e.type === "mousemove") e.preventDefault();
    if (!isHolding) return;
    const meteor = e.target.closest(".meteor");
    if (!meteor) return;
    handler(e, meteor);
  };
  ["mousemove", "touchmove"].forEach((event) => {
    document.addEventListener(event, mouseMoveHandler);
  });
};

//  MOUSEUP AND TOUCHUP HANDLER 
export const mouseUp = function (
  restorePos,
  detectTile,
  turnManager,
  loseConditon
) {
  const mouseUpHandler = (e) => {
    if (
      (e.type === "touchend" && e.targetTouches.length > 1) ||
      (e.type === "mouseup" && e.button !== 0)
    )
      return;
    if (e.type === "mouseup") e.preventDefault();
    isHolding = false;
    if (e.target !== dom.blueMeteor && e.target !== dom.yellowMeteor) return;
    restorePos(dom.blueMeteor, dom.yellowMeteor);
    const tiles = detectTile(e.target, dom.innerYellowMeteor);
    if (!tiles) return;
    tilesStyling(tiles, e.target);

    let manager = turnManager();
    const lost = loseConditon(dom.tilesArry, dom.middleTile);
    if (!manager) return;
    let { meteorsCounter, turnsCount, meteorsNum } = manager;
    dom.yellowMeteor.style.display = "none";
    dom.blueMeteor.style.display = "block";
    if (turnsCount === 3) {
      dom.yellowMeteor.style.display = "flex";
      dom.blueMeteor.style.display = "none";
    }
    turn.TurnsCount(turnsCount, meteorsNum, meteorsCounter);
    popUp.popUpStyling(lost, turnsCount);
    if (meteorsCounter === 2 && turnsCount === 5) {
      dom.resetBtn.style.visibility = "visible";
      dom.resetBtn.style.pointerEvents = "all";
    }
  };
  ["mouseup", "touchend"].forEach((event) => {
    document.addEventListener(event, mouseUpHandler);
  });
};


//  BACK TO TOP BUTTON HANDLER
export const backToTop = function () {
  dom.topBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  });
};

//  RESET GAME BUTTON HANDLER
export const resetGame = function (handler) {
  dom.resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const { turnsCount, meteorsNum, meteorsCounter } = handler(dom.tilesArry);
    dom.blueMeteor.style.display = "block";
    dom.yellowMeteor.style.display = "none";
    dom.resetBtn.style.visibility = "hidden";
    dom.resetBtn.style.pointerEvents = "none";
    turn.requiredMeteors(meteorsNum, turnsCount, meteorsCounter);
    turn.TurnsCount(turnsCount, meteorsNum, meteorsCounter);
  });
};