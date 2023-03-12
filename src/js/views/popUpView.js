//  GLOBAL IMPORTS
import dom from "./DOM";
import * as turn from "./turnsView";
import * as container from "./meteorsContainerView";
import * as helpers from "./../helpers";
//  STYLING POPUP WINDOW ACCORDING TO WIN OR LOSE CONDITIONS
export const popUpStyling = function (loseCondition, turnsCount) {
  if (loseCondition) {
    dom.popUp.firstChild.textContent = "YOU LOST 😞😔";
    dom.restartBtn.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
    dom.restartBtn.style.borderColor = "rgba(255, 0, 0, 0)";
    dom.popUp.showModal();
    helpers.LOSE_AUDIO.play();
    return true;
  }
  if (turnsCount <= 0 && !loseCondition) {
    dom.popUp.firstChild.textContent = "YOU WON 🎉🎉";
    dom.restartBtn.style.backgroundColor = "rgba(0, 145, 0, 0.8)";
    dom.restartBtn.style.borderColor = "rgba(255, 0, 0, 0)";
    dom.popUp.showModal();
    helpers.WIN_AUDIO.play();
    return true;
  }
};

// THE RESET BUTTON IN THE POPUP WINDOW
export const restart = function (handler) {
  const restartHandler = (e) => {
    if (
      (e.type === "keydown" && e.key !== "Escape") ||
      (e.type === "click" && e.button !== 0)
    )
      return;
    e.preventDefault();
    dom.resetBtn.style.visibility = "hidden";
    dom.resetBtn.style.pointerEvents = "none";
    dom.popUp.close();
    const { turnsCount, meteorsHTML } = handler(dom.tilesArry);
    dom.meteorsContainerEl.querySelectorAll(".meteor").forEach((m) => {
      m.remove();
    });
    turn.TurnsCount(turnsCount);
    container.renderMeteors(meteorsHTML);
    helpers.START_AUDIO.play();
  };
  dom.restartBtn.addEventListener("click", restartHandler);
  dom.popUp.addEventListener("keydown", restartHandler);
};
