const stepTitle =
  document.getElementById("stepTitle");

const stepCounter =
  document.getElementById("stepCounter");

const progressFill =
  document.getElementById("progressFill");

const contentArea =
  document.getElementById("contentArea");

const backButton =
  document.getElementById("backButton");

const nextButton =
  document.getElementById("nextButton");

const toast =
  document.getElementById("toast");

let currentStep = 0;

const answers = {};

const steps = [

  {
    title: "Welcome",
    render() {
      return `
        <div class="bigStatus">👋</div>

        <p class="description">
          Welcome to your new device.
          We only need to complete a few setup steps before you're ready to go.
        </p>

        <p class="description">
          This should be quick.
        </p>
      `;
    }
  },

  {
    title: "Choose your language",
    render() {
      return optionStep(
        "language",
        [
          "English",
          "French",
          "Spanish",
          "German"
        ]
      );
    }
  },

  {
    title: "Choose your region",
    render() {
      return optionStep(
        "region",
        [
          "United Kingdom",
          "United States",
          "Europe",
          "Other"
        ]
      );
    }
  },

  {
    title: "Choose your time zone",
    render() {
      return `
        <p class="description">
          Select your local time zone.
        </p>

        <div class="formGroup">
          <select class="selectInput" id="timezoneInput">
            <option>GMT / BST</option>
            <option>Central European Time</option>
            <option>Eastern Time</option>
            <option>Pacific Time</option>
          </select>
        </div>
      `;
    }
  },

  {
    title: "Connect to Wi-Fi",
    render() {
      return optionStep(
        "wifi",
        [
          "Home_WiFi",
          "PrettyFastInternet",
          "Router_5G",
          "Definitely_Not_A_Van"
        ]
      );
    }
  },

  {
    title: "Name your device",
    render() {
      return `
        <p class="description">
          Give this device a name.
        </p>

        <div class="formGroup">
          <label>Device name</label>

          <input
            id="deviceNameInput"
            class="textInput"
            placeholder="My Device"
            maxlength="24"
          />
        </div>
      `;
    }
  },

  {
    title: "Display brightness",
    render() {
      return sliderStep(
        "brightness",
        "Brightness",
        70
      );
    }
  },

  {
    title: "Choose a theme",
    render() {
      return optionStep(
        "theme",
        [
          "Dark",
          "Light",
          "Automatic",
          "Suspiciously Purple"
        ]
      );
    }
  },

  {
    title: "Choose your accent colour",
    render() {
      return optionStep(
        "accent",
        [
          "Blue",
          "Green",
          "Purple",
          "Orange"
        ]
      );
    }
  },

  {
    title: "Text size",
    render() {
      return sliderStep(
        "textSize",
        "Text size",
        50
      );
    }
  },

  {
    title: "Animation speed",
    render() {
      return sliderStep(
        "animationSpeed",
        "Animation speed",
        65
      );
    }
  },

  {
    title: "Sound volume",
    render() {
      return sliderStep(
        "volume",
        "Volume",
        45
      );
    }
  },

  {
    title: "Notification sound",
    render() {
      return optionStep(
        "notificationSound",
        [
          "Ping",
          "Pop",
          "Chime",
          "Aggressive Honk"
        ]
      );
    }
  },

  {
    title: "Speaker balance",
    render() {
      return sliderStep(
        "speakerBalance",
        "Left ↔ Right",
        50
      );
    }
  },

  {
    title: "Permissions",
    render() {
      return toggleStep([
        "Camera access",
        "Microphone access",
        "Notifications",
        "Diagnostics"
      ]);
    }
  },

  {
    title: "More permissions",
    render() {
      return toggleStep([
        "Crash reports",
        "Usage data",
        "Personalisation",
        "Allow device to silently judge your typing"
      ]);
    }
  },

  {
    title: "Checking storage",
    render() {
      return scanStep(
        "Scanning storage..."
      );
    }
  },

  {
    title: "Checking battery",
    render() {
      return scanStep(
        "Checking battery health..."
      );
    }
  },

  {
    title: "Checking processor",
    render() {
      return scanStep(
        "Running CPU diagnostics..."
      );
    }
  },

  {
    title: "Thermal check",
    render() {
      return scanStep(
        "Checking temperature sensors..."
      );
    }
  },

  {
    title: "Touch calibration",
    render() {
      return targetStep();
    }
  },

  {
    title: "Device confidence",
    render() {
      return `
        <div class="bigStatus">43%</div>

        <p class="statusText">
          Device confidence appears lower than expected.
        </p>

        <div class="weirdQuote">
          "I think I'm doing okay."
        </div>
      `;
    }
  },

  {
    title: "Reassure your device",
    render() {
      return optionStep(
        "reassurance",
        [
          "You're doing great",
          "Nearly there",
          "You've got this",
          "Please stop worrying"
        ]
      );
    }
  },

  {
    title: "Device personality",
    render() {
      return optionStep(
        "personality",
        [
          "Professional",
          "Friendly",
          "Quiet",
          "Overly enthusiastic"
        ]
      );
    }
  },

  {
    title: "Choose a startup greeting",
    render() {
      return optionStep(
        "greeting",
        [
          "Hello.",
          "Welcome back.",
          "Oh, it's you.",
          "MWEEPY."
        ]
      );
    }
  },

  {
    title: "Favourite shape",
    render() {
      return optionStep(
        "shape",
        [
          "Circle",
          "Square",
          "Triangle",
          "Whatever this is ◇"
        ]
      );
    }
  },

  {
    title: "Preferred resting position",
    render() {
      return optionStep(
        "restingPosition",
        [
          "Flat",
          "Upright",
          "Slightly tilted",
          "Facing the wall"
        ]
      );
    }
  },

  {
    title: "Does your device have permission to dream?",
    render() {
      return optionStep(
        "dreamPermission",
        [
          "Yes",
          "No",
          "Only on weekends",
          "What?"
        ]
      );
    }
  },

  {
    title: "Nearby device detected",
    render() {
      return `
        <div class="bigStatus">📱</div>

        <p class="description">
          Another device has been detected nearby.
        </p>

        <p class="description">
          Jealousy mode is available.
        </p>

        ${toggleStep([
          "Enable jealousy mode"
        ])}
      `;
    }
  },

  {
    title: "Your device would like a surname",
    render() {
      return `
        <p class="description">
          Apparently just one name is no longer sufficient.
        </p>

        <div class="formGroup">
          <input
            id="surnameInput"
            class="textInput"
            placeholder="Device surname"
            maxlength="24"
          />
        </div>
      `;
    }
  },

  {
    title: "Choose your device's favourite snack",
    render() {
      return optionStep(
        "snack",
        [
          "Microchips",
          "USB cables",
          "Dust",
          "Toast"
        ]
      );
    }
  },

  {
    title: "Update anxiety",
    render() {
      return `
        <div class="bigStatus">😰</div>

        <p class="description">
          Your device appears nervous about future software updates.
        </p>

        ${optionStep(
          "updateComfort",
          [
            "Updates are good",
            "I'll be here",
            "You can do it",
            "Ignore updates forever"
          ]
        )}
      `;
    }
  },

  {
    title: "Preparing your device",
    render() {
      return scanStep(
        "Applying your settings..."
      );
    }
  },

  {
    title: "Finishing things up",
    render() {
      return `
        <div class="bigStatus">99%</div>

        <p class="statusText">
          Almost done.
        </p>
      `;
    }
  },

  {
    title: "Still finishing things up",
    render() {
      return `
        <div class="bigStatus">99%</div>

        <p class="statusText">
          Still almost done.
        </p>
      `;
    }
  },

  {
    title: "One tiny thing",
    render() {
      return optionStep(
        "tinyThing",
        [
          "Continue",
          "Continue but suspiciously",
          "Continue carefully",
          "Fine"
        ]
      );
    }
  },

  {
    title: "Final device mood",
    render() {
      return optionStep(
        "mood",
        [
          "Ready",
          "Excited",
          "Confused",
          "Concerned"
        ]
      );
    }
  },

  {
    title: "Setup complete",
    render() {
      return `
        <div class="bigStatus">✅</div>

        <h2>You're ready to go.</h2>

        <p class="description">
          Your device has been fully configured.
        </p>

        <div class="weirdQuote">
          "Thank you for believing in me."
        </div>
      `;
    }
  },

  {
    title: "Software update available",
    render() {
      return `
        <div class="bigStatus">⬇️</div>

        <p class="description">
          A software update is available.
        </p>

        <p class="description">
          Restart setup to install?
        </p>

        <div class="optionGrid">
          <button class="optionButton" onclick="restartSetup()">
            Restart setup
          </button>

          <button class="optionButton" onclick="finishForReal()">
            Absolutely not
          </button>
        </div>
      `;
    }
  }

];

function renderStep() {

  const step =
    steps[currentStep];

  stepTitle.textContent =
    step.title;

  stepCounter.textContent =
    `Step ${currentStep + 1} of ${steps.length}`;

  progressFill.style.width =
    `${((currentStep + 1) / steps.length) * 100}%`;

  contentArea.innerHTML =
    step.render();

  backButton.disabled =
    currentStep === 0;

  nextButton.textContent =
    currentStep === steps.length - 1
      ? "Done"
      : "Continue";

  setupInteractiveBits();
}

function optionStep(key, options) {

  return `
    <div class="optionGrid">
      ${options.map(option => `
        <button
          class="optionButton"
          data-key="${key}"
          data-value="${option}"
        >
          ${option}
        </button>
      `).join("")}
    </div>
  `;
}

function sliderStep(key, label, value) {

  answers[key] =
    answers[key] ?? value;

  return `
    <div class="sliderRow">

      <label>
        <span>${label}</span>
        <span id="${key}Value">
          ${answers[key]}%
        </span>
      </label>

      <input
        type="range"
        min="0"
        max="100"
        value="${answers[key]}"
        data-slider-key="${key}"
      />

    </div>
  `;
}

function toggleStep(labels) {

  return `
    <div class="toggleList">

      ${labels.map(label => `
        <div class="toggleItem">

          <span>${label}</span>

          <label class="switch">
            <input type="checkbox" />
            <span class="switchSlider"></span>
          </label>

        </div>
      `).join("")}

    </div>
  `;
}

function scanStep(text) {

  return `
    <div class="scanBox">

      <div class="scanLabel">
        <span>${text}</span>
        <span id="scanPercent">0%</span>
      </div>

      <div class="scanTrack">
        <div class="scanFill" id="scanFill"></div>
      </div>

    </div>
  `;
}

function targetStep() {

  return `
    <p class="description">
      Tap the target 5 times to calibrate touch input.
    </p>

    <div class="targetArea" id="targetArea">
      <button class="target" id="targetButton"></button>
    </div>

    <p class="description" id="targetText">
      Hits: 0 / 5
    </p>
  `;
}

function setupInteractiveBits() {

  document
    .querySelectorAll(".optionButton")
    .forEach(button => {

      button.addEventListener("click", () => {

        const key =
          button.dataset.key;

        const value =
          button.dataset.value;

        if (!key) {
          return;
        }

        answers[key] =
          value;

        document
          .querySelectorAll(`[data-key="${key}"]`)
          .forEach(other => {
            other.classList.remove("selected");
          });

        button.classList.add("selected");
      });
    });

  document
    .querySelectorAll("[data-slider-key]")
    .forEach(slider => {

      slider.addEventListener("input", () => {

        const key =
          slider.dataset.sliderKey;

        answers[key] =
          slider.value;

        const valueDisplay =
          document.getElementById(`${key}Value`);

        if (valueDisplay) {
          valueDisplay.textContent =
            `${slider.value}%`;
        }
      });
    });

  const scanFill =
    document.getElementById("scanFill");

  const scanPercent =
    document.getElementById("scanPercent");

  if (scanFill && scanPercent) {

    let scan =
      0;

    const timer =
      setInterval(() => {

        scan +=
          Math.floor(
            Math.random() * 9
          ) + 4;

        if (scan > 100) {
          scan = 100;
        }

        scanFill.style.width =
          `${scan}%`;

        scanPercent.textContent =
          `${scan}%`;

        if (scan >= 100) {
          clearInterval(timer);
        }

      }, 180);
  }

  const targetButton =
    document.getElementById("targetButton");

  const targetArea =
    document.getElementById("targetArea");

  const targetText =
    document.getElementById("targetText");

  if (
    targetButton &&
    targetArea &&
    targetText
  ) {

    let hits = 0;

    moveTarget();

    targetButton.addEventListener(
      "click",
      () => {

        hits++;

        targetText.textContent =
          `Hits: ${hits} / 5`;

        if (hits >= 5) {

          targetButton.style.display =
            "none";

          targetText.textContent =
            "Calibration complete.";

          return;
        }

        moveTarget();
      }
    );

    function moveTarget() {

      const maxX =
        targetArea.clientWidth - 60;

      const maxY =
        targetArea.clientHeight - 60;

      targetButton.style.left =
        `${Math.random() * maxX}px`;

      targetButton.style.top =
        `${Math.random() * maxY}px`;
    }
  }
}

function saveTextInputs() {

  const deviceNameInput =
    document.getElementById("deviceNameInput");

  if (deviceNameInput) {
    answers.deviceName =
      deviceNameInput.value;
  }

  const surnameInput =
    document.getElementById("surnameInput");

  if (surnameInput) {
    answers.surname =
      surnameInput.value;
  }

  const timezoneInput =
    document.getElementById("timezoneInput");

  if (timezoneInput) {
    answers.timezone =
      timezoneInput.value;
  }
}

nextButton.addEventListener(
  "click",
  () => {

    saveTextInputs();

    if (
      currentStep <
      steps.length - 1
    ) {

      currentStep++;

      renderStep();

    } else {

      showToast(
        "Setup genuinely complete."
      );
    }
  }
);

backButton.addEventListener(
  "click",
  () => {

    saveTextInputs();

    if (
      currentStep > 0
    ) {

      currentStep--;

      renderStep();
    }
  }
);

function restartSetup() {

  currentStep = 0;

  renderStep();

  showToast(
    "Restarting setup..."
  );
}

function finishForReal() {

  contentArea.innerHTML = `
    <div class="bigStatus">🎉</div>

    <h2>Actually finished.</h2>

    <p class="description">
      You survived device setup.
    </p>

    <div class="weirdQuote">
      Your device is now emotionally prepared.
    </div>
  `;

  stepTitle.textContent =
    "Done";

  nextButton.style.display =
    "none";

  backButton.style.display =
    "none";

  progressFill.style.width =
    "100%";
}

function showToast(message) {

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 1600);
}

renderStep();
