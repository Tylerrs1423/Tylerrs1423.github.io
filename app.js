const CIRCLE_ANIMATION_DURATION = 2600;
const HOLD_BREATH_DURATION = 60000; // 60 seconds 
const INHALE_HOLD_DURATION = 15000; // 15 seconds 
const TOTAL_CYCLE_TIME = 5200;

const circleProgress = document.querySelector(".circle-progress");
const numberOfBreaths = document.querySelector(".breath-input");
const startButton = document.querySelector(".start");
const instructions = document.querySelector(".instructions");
const breathsText = document.querySelector(".breaths-text");

let breathsLeft = 30;
let animationPaused = false;

const updateBreathCount = () => {
  breathsLeft = numberOfBreaths.value;
  breathsText.innerText = breathsLeft;
};

const circleGrow = () => {
  if (!animationPaused) {
    circleProgress.classList.add("circle-grow");
    setTimeout(() => {
      circleProgress.classList.remove("circle-grow");
    }, CIRCLE_ANIMATION_DURATION);
  }
};

const circleShrink = () => {
  if (!animationPaused) {
    circleProgress.classList.add("circle-shrink");
    setTimeout(() => {
      circleProgress.classList.remove("circle-shrink");
    }, CIRCLE_ANIMATION_DURATION);
  }
};

const pauseCircleAnimation = () => {
  animationPaused = true;
};

const resumeCircleAnimation = () => {
  animationPaused = false;
};

const startBreathingAnimation = () => {
  if (instructions.innerText === "Hold your breath for 60 seconds") {
    resumeCircleAnimation(); // Unpause the animation
    setTimeout(() => {
      pauseCircleAnimation(); // Pause all animation after 2.6 seconds
      instructions.innerText = "Breathe In";
    }, 2600); // Pause after 2.6 seconds
    return;
  }

  circleGrow();

  breathsLeft--;
  breathsText.innerText = breathsLeft;
  instructions.innerText = "Breathe In";

  setTimeout(() => {
    instructions.innerText = "Breathe Out";

    if (breathsLeft === 0) {
      instructions.innerText = "Hold your breath for 60 seconds"; // Prompt the user to hold their breath
      circleShrink(); // Initiate circle shrink animation
      clearInterval(breathingAnimation); // Stop the animation

      setTimeout(() => {
        instructions.innerText = "Breathe In and hold for 15 seconds"; // Prompt the user to breathe in and hold for 15 seconds

        // Pause the circle grow animation
        pauseCircleAnimation();

        setTimeout(() => {
          instructions.innerText = "Cycle completed! Press 'Begin' to start another";
          startButton.classList.remove("button-inactive");
          updateBreathCount();
        }, INHALE_HOLD_DURATION);
      }, HOLD_BREATH_DURATION);
    }
  }, CIRCLE_ANIMATION_DURATION);
};

let breathingAnimation;

const breathingApp = () => {
  breathingAnimation = setInterval(() => {
    if (breathsLeft === 0) {
      return;
    }
    startBreathingAnimation();
  }, TOTAL_CYCLE_TIME);
};

const initializeApp = () => {
  numberOfBreaths.addEventListener("change", updateBreathCount);

  startButton.addEventListener("click", () => {
    if (breathsLeft === 0) {
      breathsLeft = numberOfBreaths.value;
      breathsText.innerText = breathsLeft;
    }
    startButton.classList.add("button-inactive");
    instructions.innerText = "Stay calm";

    setTimeout(() => {
      instructions.innerText = "Ready";
      breathingApp();
    }, CIRCLE_ANIMATION_DURATION);
  });
};

initializeApp();
