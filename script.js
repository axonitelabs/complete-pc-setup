const TOTAL_STEPS = 72;
const SAVE_KEY = "maxy_complete_device_setup_v2";

const state = {
  currentStep: 0,
  answers: {},
  settings: {
    brightness: 70,
    volume: 55,
    sensitivity: 50,
    batteryMode: "Balanced",
    theme: "Midnight",
    haptics: true,
    sounds: true,
    safeMode: false
  },
  calibrationClicks: 0,
  scanRunning: false
};

const elements = {
  progressLabel: document.getElementById("progressLabel"),
  progressPercent: document.getElementById("progressPercent"),
  progressBar: document.getElementById("progressBar"),
  stepTag: document.getElementById("stepTag"),
  stepTitle: document.getElementById("stepTitle"),
  stepDescription: document.getElementById("stepDescription"),
  stepContent: document.getElementById("stepContent"),
  messageBox: document.getElementById("messageBox"),
  nextBtn: document.getElementById("nextBtn"),
  backBtn: document.getElementById("backBtn"),
  stepHint: document.getElementById("stepHint"),
  statusText: document.getElementById("statusText"),
  stepCounter: document.getElementById("stepCounter"),
  saveBtn: document.getElementById("saveBtn"),
  resetBtn: document.getElementById("resetBtn"),
  toast: document.getElementById("toast"),
  setupCard: document.getElementById("setupCard")
};

const steps = [
  {
    tag: "WELCOME",
    title: "Welcome to Complete Device Setup",
    description:
      "Your device is almost ready. We just need to teach it how to behave.",
    type: "info",
    button: "Start setup",
    hint: "This is going to take a while."
  },

  {
    tag: "IDENTITY",
    title: "What should we call your device?",
    description:
      "Give your device a name. It will appear in diagnostics and system messages.",
    type: "text",
    placeholder: "e.g. MAX-01"
  },

  {
    tag: "REGION",
    title: "Choose your region",
    description:
      "This controls date, time and a few regional system settings.",
    type: "options",
    options: [
      ["United Kingdom", "£ • DD/MM/YYYY"],
      ["United States", "$ • MM/DD/YYYY"],
      ["Europe", "€ • DD/MM/YYYY"],
      ["Other", "We'll improvise."]
    ]
  },

  {
    tag: "CLOCK",
    title: "Set your clock style",
    description:
      "Pick how the device displays time.",
    type: "options",
    options: [
      ["12-hour", "6:39 PM"],
      ["24-hour", "18:39"]
    ]
  },

  {
    tag: "DISPLAY",
    title: "Adjust display brightness",
    description:
      "Find a comfortable brightness level.",
    type: "slider",
    key: "brightness",
    min: 10,
    max: 100,
    unit: "%"
  },

  {
    tag: "DISPLAY",
    title: "Enable automatic brightness?",
    description:
      "The device can adjust brightness based on its surroundings.",
    type: "toggle",
    key: "autoBrightness",
    onText: "Automatic brightness",
    offText: "Manual brightness"
  },

  {
    tag: "AUDIO",
    title: "Set your preferred volume",
    description:
      "Pick a level. You can change it later.",
    type: "slider",
    key: "volume",
    min: 0,
    max: 100,
    unit: "%"
  },

  {
    tag: "AUDIO",
    title: "Enable system sounds?",
    description:
      "Button clicks, alerts and tiny confirmation noises.",
    type: "toggle",
    key: "sounds",
    onText: "System sounds ON",
    offText: "System sounds OFF"
  },

  {
    tag: "HAPTICS",
    title: "Enable haptic feedback?",
    description:
      "The device will vibrate slightly when certain actions happen.",
    type: "toggle",
    key: "haptics",
    onText: "Haptics ON",
    offText: "Haptics OFF"
  },

  {
    tag: "POWER",
    title: "Choose a battery mode",
    description:
      "This changes how aggressively the device saves power.",
    type: "options",
    options: [
      ["Performance", "Faster. Hungrier."],
      ["Balanced", "A sensible choice."],
      ["Battery saver", "Make battery go brrrr."],
      ["Chaos mode", "We don't recommend this."]
    ]
  },

  {
    tag: "NETWORK",
    title: "Choose network preference",
    description:
      "Which connection should the device prefer?",
    type: "options",
    options: [
      ["Wi-Fi", "Fast and stable"],
      ["Mobile", "When Wi-Fi is unavailable"],
      ["Ask me", "Decision anxiety included."]
    ]
  },

  {
    tag: "NETWORK",
    title: "Enable offline mode?",
    description:
      "Offline mode can prevent some apps from using the network.",
    type: "toggle",
    key: "offlineMode",
    onText: "Offline mode",
    offText: "Online mode"
  },

  {
    tag: "SECURITY",
    title: "Choose your lock style",
    description:
      "Pick how you would like to unlock the device.",
    type: "options",
    options: [
      ["PIN", "Classic. Reliable."],
      ["Pattern", "Draw a shape."],
      ["Password", "Longer. Stronger."],
      ["No lock", "Bold choice."]
    ]
  },

  {
    tag: "SECURITY",
    title: "Turn on Safe Mode?",
    description:
      "Safe Mode limits unknown features while the device starts.",
    type: "toggle",
    key: "safeMode",
    onText: "Safe Mode ON",
    offText: "Safe Mode OFF"
  },

  {
    tag: "PERSONALITY",
    title: "How dramatic should system alerts be?",
    description:
      "This absolutely has no reason to exist. Yet here it is.",
    type: "options",
    options: [
      ["Calm", "Everything is probably fine."],
      ["Normal", "Standard system behaviour."],
      ["Dramatic", "WARNING: YOU CLICKED A BUTTON."],
      ["Extremely dramatic", "THE DEVICE REMEMBERS."]
    ]
  },

  {
    tag: "THEME",
    title: "Choose the system theme",
    description:
      "This changes the colour personality of the setup.",
    type: "options",
    options: [
      ["Midnight", "Dark and clean"],
      ["Aurora", "Cool glow"],
      ["Cloud", "Light and soft"],
      ["Arcade", "Bright and chaotic"]
    ]
  },

  {
    tag: "TOUCH",
    title: "Touch sensitivity",
    description:
      "Adjust how quickly the device responds to taps.",
    type: "slider",
    key: "sensitivity",
    min: 1,
    max: 100,
    unit: "%"
  },

  {
    tag: "TOUCH",
    title: "Touchscreen diagnostic",
    description:
      "Tap the targets that appear. We need to make sure your screen is awake.",
    type: "calibration",
    points: [
      [16, 22],
      [82, 20],
      [48, 50],
      [20, 78],
      [82, 78]
    ]
  },

  {
    tag: "STORAGE",
    title: "Storage access",
    description:
      "Choose whether the setup wizard may inspect storage information.",
    type: "toggle",
    key: "storageAccess",
    onText: "Allow storage diagnostics",
    offText: "Deny storage diagnostics"
  },

  {
    tag: "STORAGE",
    title: "Storage scan",
    description:
      "We're checking the device for available space.",
    type: "scan",
    scanLabel: "Scanning storage"
  },

  {
    tag: "HARDWARE",
    title: "Hardware scan",
    description:
      "Checking sensors, speakers, buttons and other extremely important rectangles.",
    type: "scan",
    scanLabel: "Scanning hardware"
  },

  {
    tag: "HARDWARE",
    title: "Camera check",
    description:
      "We're going to pretend to check the camera.",
    type: "options",
    options: [
      ["Camera works", "Excellent."],
      ["Camera is covered", "Please remove the sticker."],
      ["Camera is a potato", "We respect it."]
    ]
  },

  {
    tag: "HARDWARE",
    title: "Microphone check",
    description:
      "Select the result of the test.",
    type: "options",
    options: [
      ["Clear", "Audio detected"],
      ["Quiet", "Barely detected"],
      ["Interesting", "The waveform did something."]
    ]
  },

  {
    tag: "HARDWARE",
    title: "Speaker test",
    description:
      "Was that sound loud enough?",
    type: "options",
    options: [
      ["Yes", "Perfect."],
      ["A little louder", "Increasing virtual loudness."],
      ["WAY too loud", "Turning it down."],
      ["I heard nothing", "That is concerning."]
    ]
  },

  {
    tag: "MOTION",
    title: "Gyroscope calibration",
    description:
      "Hold the device steady while we calibrate movement sensors.",
    type: "slider",
    key: "gyro",
    min: 0,
    max: 100,
    unit: "%"
  },

  {
    tag: "MOTION",
    title: "Preferred animation speed",
    description:
      "Set how quickly menus and transitions should feel.",
    type: "slider",
    key: "animationSpeed",
    min: 50,
    max: 150,
    unit: "%"
  },

  {
    tag: "ACCESSIBILITY",
    title: "Text size",
    description:
      "Choose your preferred text scale.",
    type: "options",
    options: [
      ["Small", "More information on screen"],
      ["Medium", "Balanced"],
      ["Large", "Easy to read"],
      ["Huge", "MAXIMUM LETTERS"]
    ]
  },

  {
    tag: "ACCESSIBILITY",
    title: "Reduce motion?",
    description:
      "This makes interface movement less intense.",
    type: "toggle",
    key: "reduceMotion",
    onText: "Reduce motion",
    offText: "Full motion"
  },

  {
    tag: "ACCESSIBILITY",
    title: "High contrast",
    description:
      "Increase contrast between interface elements.",
    type: "toggle",
    key: "contrast",
    onText: "High contrast ON",
    offText: "High contrast OFF"
  },

  {
    tag: "PROFILE",
    title: "Pick a startup greeting",
    description:
      "Your device would like to have a personality.",
    type: "options",
    options: [
      ["Hello!", "Friendly."],
      ["Welcome back.", "Calm."],
      ["System online.", "Professional."],
      ["OH. YOU'RE BACK.", "Questionable."]
    ]
  },

  {
    tag: "PROFILE",
    title: "Choose the system mascot",
    description:
      "This has no technical benefit whatsoever.",
    type: "options",
    options: [
      ["Axolotl", "Tiny water creature"],
      ["Robot", "Efficient little machine"],
      ["Cat", "Will ignore instructions"],
      ["Duck", "Unclear why."]
    ]
  },

  {
    tag: "PROFILE",
    title: "Would you like a setup tip every day?",
    description:
      "Small tips. Small surprises. Potentially one duck.",
    type: "toggle",
    key: "dailyTip",
    onText: "Daily tips ON",
    offText: "Daily tips OFF"
  },

  {
    tag: "SYSTEM",
    title: "Language check",
    description:
      "Select your preferred system language.",
    type: "options",
    options: [
      ["English", "Selected"],
      ["English (extra dramatic)", "Selected but louder"],
      ["Mystery language", "Good luck"]
    ]
  },

  {
    tag: "SYSTEM",
    title: "Keyboard layout",
    description:
      "Which keyboard should the device expect?",
    type: "options",
    options: [
      ["QWERTY", "Normal"],
      ["AZERTY", "French layout"],
      ["QWERTZ", "Central European"],
      ["I don't know", "Fair."]
    ]
  },

  {
    tag: "SYSTEM",
    title: "Default browser",
    description:
      "Choose the browser opening links by default.",
    type: "options",
    options: [
      ["MaxBrowse", "Made-up but confident"],
      ["Whatever opens first", "Efficient"],
      ["Ask me every time", "Decision mode"]
    ]
  },

  {
    tag: "PRIVACY",
    title: "Diagnostics sharing",
    description:
      "Can anonymous diagnostics be used to improve the setup experience?",
    type: "toggle",
    key: "diagnostics",
    onText: "Share anonymous diagnostics",
    offText: "Keep diagnostics local"
  },

  {
    tag: "PRIVACY",
    title: "Location access",
    description:
      "Some apps may use your approximate location.",
    type: "options",
    options: [
      ["Allow", "Location available"],
      ["Ask every time", "More control"],
      ["Deny", "Maximum privacy"]
    ]
  },

  {
    tag: "PRIVACY",
    title: "Tracking preference",
    description:
      "Choose how the fake device should behave.",
    type: "options",
    options: [
      ["Minimal", "No nonsense"],
      ["Balanced", "Standard"],
      ["Maximum privacy", "Very private"]
    ]
  },

  {
    tag: "UPDATE",
    title: "Check for system updates",
    description:
      "Let's see if your imaginary device is running the latest imaginary software.",
    type: "scan",
    scanLabel: "Checking updates"
  },

  {
    tag: "UPDATE",
    title: "Automatic updates",
    description:
      "Allow the device to install future updates automatically.",
    type: "toggle",
    key: "autoUpdates",
    onText: "Automatic updates ON",
    offText: "Automatic updates OFF"
  },

  {
    tag: "BACKUP",
    title: "Backup reminder",
    description:
      "Would you like reminders to back up your files?",
    type: "toggle",
    key: "backupReminder",
    onText: "Backup reminders ON",
    offText: "Backup reminders OFF"
  },

  {
    tag: "BACKUP",
    title: "Choose backup frequency",
    description:
      "How often should reminders appear?",
    type: "options",
    options: [
      ["Daily", "Very cautious"],
      ["Weekly", "Sensible"],
      ["Monthly", "Relaxed"],
      ["Never", "Living dangerously"]
    ]
  },

  {
    tag: "PERFORMANCE",
    title: "CPU mode",
    description:
      "Select how aggressively the device should run its processor.",
    type: "options",
    options: [
      ["Quiet", "Cool and calm"],
      ["Balanced", "Normal"],
      ["Turbo", "Faster"],
      ["ABSOLUTE TURBO", "Probably illegal"]
    ]
  },

  {
    tag: "PERFORMANCE",
    title: "Background apps",
    description:
      "How many apps may keep running in the background?",
    type: "slider",
    key: "backgroundApps",
    min: 1,
    max: 30,
    unit: " apps"
  },

  {
    tag: "PERFORMANCE",
    title: "Memory optimisation",
    description:
      "Run a quick optimisation pass.",
    type: "scan",
    scanLabel: "Optimising memory"
  },

  {
    tag: "SECURITY",
    title: "Security scan",
    description:
      "Checking the device for suspicious imaginary software.",
    type: "scan",
    scanLabel: "Running security scan"
  },

  {
    tag: "SECURITY",
    title: "Firewall mode",
    description:
      "Pick your firewall personality.",
    type: "options",
    options: [
      ["Standard", "Balanced protection"],
      ["Strict", "Nothing gets through"],
      ["Relaxed", "Very trusting"]
    ]
  },

  {
    tag: "BATTERY",
    title: "Battery health check",
    description:
      "We're checking the imaginary battery.",
    type: "scan",
    scanLabel: "Checking battery health"
  },

  {
    tag: "BATTERY",
    title: "Low power warning",
    description:
      "When should your device warn you?",
    type: "slider",
    key: "lowPowerWarning",
    min: 5,
    max: 50,
    unit: "%"
  },

  {
    tag: "NETWORK",
    title: "Connection quality",
    description:
      "Choose how sensitive the device should be to weak connections.",
    type: "options",
    options: [
      ["Low sensitivity", "Keep trying"],
      ["Normal", "Standard"],
      ["High sensitivity", "Give up quickly"]
    ]
  },

  {
    tag: "NETWORK",
    title: "Run network diagnostic",
    description:
      "A very serious internet test is about to happen.",
    type: "scan",
    scanLabel: "Testing network"
  },

  {
    tag: "PERSONALITY",
    title: "Should the device apologise when it makes a mistake?",
    description:
      "This is surprisingly important.",
    type: "options",
    options: [
      ["Yes", "Polite machine"],
      ["No", "Machines don't apologise"],
      ["Only when REALLY wrong", "Fair."]
    ]
  },

  {
    tag: "PERSONALITY",
    title: "How suspicious is your device?",
    description:
      "Choose a level.",
    type: "slider",
    key: "suspicion",
    min: 0,
    max: 100,
    unit: "%"
  },

  {
    tag: "PERSONALITY",
    title: "Should it make random tiny noises?",
    description:
      "You know you want to.",
    type: "toggle",
    key: "randomNoises",
    onText: "Tiny noises ON",
    offText: "Tiny noises OFF"
  },

  {
    tag: "WEIRD",
    title: "Would you trust a device named Gerald?",
    description:
      "Please consider this seriously.",
    type: "options",
    options: [
      ["Absolutely", "Gerald seems trustworthy."],
      ["Maybe", "Need more evidence."],
      ["No", "Gerald has been noted."]
    ]
  },

  {
    tag: "WEIRD",
    title: "Your device found a duck.",
    description:
      "What should it do?",
    type: "options",
    options: [
      ["Keep it", "Duck added to system"],
      ["Ask the duck first", "Respectful"],
      ["Run diagnostics on the duck", "Necessary"],
      ["Pretend nothing happened", "Coward."]
    ]
  },

  {
    tag: "WEIRD",
    title: "A mysterious button has appeared.",
    description:
      "Do you press it?",
    type: "options",
    options: [
      ["PRESS IT", "You chose this."],
      ["Definitely not", "Probably wise."],
      ["Press it twice", "Bold."]
    ]
  },

  {
    tag: "WEIRD",
    title: "The device asks for one compliment.",
    description:
      "Make it feel appreciated.",
    type: "text",
    placeholder: "Type something nice..."
  },

  {
    tag: "WEIRD",
    title: "Your screen is feeling slightly blue.",
    description:
      "How should we fix it?",
    type: "options",
    options: [
      ["Restart display", "Classic solution"],
      ["Turn it off and on again", "IT department approved"],
      ["Compliment it", "Unexpectedly effective"]
    ]
  },

  {
    tag: "DIAGNOSTICS",
    title: "Full device diagnostic",
    description:
      "Every major system is about to be checked.",
    type: "scan",
    scanLabel: "Running full diagnostic"
  },

  {
    tag: "DIAGNOSTICS",
    title: "Diagnostic summary",
    description:
      "Review the results before continuing.",
    type: "summary"
  },

  {
    tag: "FINALISE",
    title: "Choose the device startup profile",
    description:
      "This is the final configuration choice.",
    type: "options",
    options: [
      ["Fast startup", "Less waiting"],
      ["Normal startup", "Balanced"],
      ["Detailed startup", "More system information"]
    ]
  },

  {
    tag: "FINALISE",
    title: "Save your configuration",
    description:
      "Your setup is almost finished.",
    type: "save"
  },

  {
    tag: "FINALISE",
    title: "One last system check",
    description:
      "We really mean it this time.",
    type: "scan",
    scanLabel: "Final verification"
  },

  {
    tag: "COMPLETE",
    title: "Device configuration complete",
    description:
      "Everything is configured. Your device has survived the process.",
    type: "complete"
  },

  {
    tag: "LAUNCH",
    title: "Preparing NOVA OS",
    description:
      "The setup wizard is handing control to your operating system.",
    type: "launch"
  }
];

function getProgressPercent() {
  return Math.round(
    ((state.currentStep + 1) / steps.length) * 100
  );
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 1800);
}

function showMessage(message, isError = false) {
  elements.messageBox.textContent = message;
  elements.messageBox.classList.remove("hidden", "error");

  if (isError) {
    elements.messageBox.classList.add("error");
  }
}

function clearMessage() {
  elements.messageBox.textContent = "";
  elements.messageBox.classList.add("hidden");
  elements.messageBox.classList.remove("error");
}

function saveProgress(showNotification = true) {
  const payload = {
    currentStep: state.currentStep,
    answers: state.answers,
    settings: state.settings
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(payload));

  if (showNotification) {
    showToast("Progress saved ✓");
  }
}

function loadProgress() {
  const raw = localStorage.getItem(SAVE_KEY);

  if (!raw) {
    return;
  }

  try {
    const data = JSON.parse(raw);

    if (typeof data.currentStep === "number") {
      state.currentStep = Math.max(
        0,
        Math.min(data.currentStep, steps.length - 1)
      );
    }

    if (data.answers && typeof data.answers === "object") {
      state.answers = data.answers;
    }

    if (data.settings && typeof data.settings === "object") {
      state.settings = {
        ...state.settings,
        ...data.settings
      };
    }
  } catch (error) {
    console.warn("Could not load saved progress.", error);
  }
}

function resetProgress() {
  const confirmed = window.confirm(
    "Reset the entire setup and start from the beginning?"
  );

  if (!confirmed) {
    return;
  }

  localStorage.removeItem(SAVE_KEY);

  state.currentStep = 0;
  state.answers = {};
  state.settings = {
    brightness: 70,
    volume: 55,
    sensitivity: 50,
    batteryMode: "Balanced",
    theme: "Midnight",
    haptics: true,
    sounds: true,
    safeMode: false
  };
  state.calibrationClicks = 0;
  state.scanRunning = false;

  showToast("Setup reset.");
  renderStep();
}

function goToStep(index) {
  state.currentStep = Math.max(
    0,
    Math.min(index, steps.length - 1)
  );

  clearMessage();
  elements.setupCard.classList.remove("transitioning");

  requestAnimationFrame(() => {
    elements.setupCard.classList.add("transitioning");
  });

  renderStep();
}

function setAnswer(value) {
  state.answers[state.currentStep] = value;
}

function getCurrentAnswer() {
  return state.answers[state.currentStep];
}

function requireAnswer() {
  const answer = getCurrentAnswer();

  if (
    answer === undefined ||
    answer === null ||
    answer === ""
  ) {
    showMessage("Pick or enter something before continuing.", true);
    return false;
  }

  return true;
}

function createOptions(step) {
  const wrapper = document.createElement("div");
  wrapper.className = "option-grid";

  step.options.forEach(([title, subtitle]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";

    const titleEl = document.createElement("span");
    titleEl.className = "option-title";
    titleEl.textContent = title;

    const subtitleEl = document.createElement("span");
    subtitleEl.className = "option-subtitle";
    subtitleEl.textContent = subtitle;

    button.append(titleEl, subtitleEl);

    if (getCurrentAnswer() === title) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      document
        .querySelectorAll(".option-btn")
        .forEach((btn) => btn.classList.remove("selected"));

      button.classList.add("selected");
      setAnswer(title);

      if (step.tag === "POWER") {
        state.settings.batteryMode = title;
      }

      if (step.tag === "THEME") {
        state.settings.theme = title;
      }
    });

    wrapper.appendChild(button);
  });

  return wrapper;
}

function createSlider(step) {
  const wrapper = document.createElement("div");
  wrapper.className = "slider-wrap";

  const value = document.createElement("div");
  value.className = "slider-value";

  const input = document.createElement("input");
  input.className = "range";
  input.type = "range";
  input.min = step.min;
  input.max = step.max;

  const stored =
    state.settings[step.key] ??
    getCurrentAnswer() ??
    Math.round((step.min + step.max) / 2);

  input.value = stored;

  function update() {
    value.textContent = `${input.value}${step.unit || ""}`;
    state.settings[step.key] = Number(input.value);
    setAnswer(Number(input.value));
  }

  input.addEventListener("input", update);
  update();

  wrapper.append(value, input);

  return wrapper;
}

function createToggle(step) {
  const wrapper = document.createElement("div");
  wrapper.className = "toggle-row";

  const copy = document.createElement("div");
  copy.className = "toggle-copy";

  const strong = document.createElement("strong");
  const span = document.createElement("span");

  strong.textContent = step.onText;
  span.textContent = step.offText;

  copy.append(strong, span);

  const label = document.createElement("label");
  label.className = "toggle";

  const input = document.createElement("input");
  input.type = "checkbox";

  const key = step.key;
  input.checked =
    typeof state.settings[key] === "boolean"
      ? state.settings[key]
      : false;

  const track = document.createElement("span");
  track.className = "toggle-track";

  input.addEventListener("change", () => {
    state.settings[key] = input.checked;
    setAnswer(input.checked);
  });

  setAnswer(input.checked);

  label.append(input, track);
  wrapper.append(copy, label);

  return wrapper;
}

function createTextInput(step) {
  const input = document.createElement("input");
  input.className = "text-input";
  input.type = "text";
  input.placeholder = step.placeholder || "";
  input.maxLength = 80;
  input.value = getCurrentAnswer() || "";

  input.addEventListener("input", () => {
    setAnswer(input.value.trim());
  });

  return input;
}

function createScan(step) {
  const wrapper = document.createElement("div");
  wrapper.className = "scan-box";

  const header = document.createElement("div");
  header.className = "scan-header";

  const label = document.createElement("span");
  label.textContent = step.scanLabel || "Scanning";

  const percent = document.createElement("span");
  percent.textContent = "0%";

  header.append(label, percent);

  const line = document.createElement("div");
  line.className = "scan-line";

  const progress = document.createElement("div");
  progress.className = "scan-progress";

  line.appendChild(progress);

  const log = document.createElement("div");
  log.className = "scan-log";

  wrapper.append(header, line, log);

  const logs = [
    "Initialising diagnostic engine...",
    "Checking system response...",
    "Reading device values...",
    "Inspecting virtual components...",
    "Cross-checking configuration...",
    "Checking for suspicious ducks...",
    "Optimising imaginary hardware...",
    "Verifying results..."
  ];

  let value = 0;
  state.scanRunning = true;
  elements.nextBtn.disabled = true;

  const timer = setInterval(() => {
    value += Math.floor(Math.random() * 9) + 4;

    if (value > 100) {
      value = 100;
    }

    progress.style.width = `${value}%`;
    percent.textContent = `${value}%`;

    const index = Math.min(
      logs.length - 1,
      Math.floor((value / 100) * logs.length)
    );

    log.textContent = logs
      .slice(0, index + 1)
      .map((entry) => `> ${entry}`)
      .join("\n");

    log.scrollTop = log.scrollHeight;

    if (value >= 100) {
      clearInterval(timer);

      state.scanRunning = false;
      setAnswer("complete");

      log.textContent += "\n> Scan complete. No serious nonsense detected.";
      elements.nextBtn.disabled = false;

      showMessage("Diagnostic complete ✓");
    }
  }, 130);

  return wrapper;
}

function createCalibration() {
  const wrapper = document.createElement("div");
  wrapper.className = "calibration-wrap";

  const info = document.createElement("div");
  info.className = "step-hint";
  info.textContent = "Tap every target. 0 / 5";

  const screen = document.createElement("div");
  screen.className = "calibration-screen";

  const target = document.createElement("button");
  target.type = "button";
  target.className = "calibration-target";
  target.setAttribute("aria-label", "Calibration target");

  screen.appendChild(target);
  wrapper.append(info, screen);

  const points =
    steps[state.currentStep].points || [
      [20, 20],
      [80, 20],
      [50, 50],
      [20, 80],
      [80, 80]
    ];

  state.calibrationClicks = 0;

  function placeTarget() {
    if (state.calibrationClicks >= points.length) {
      target.remove();
      setAnswer("calibrated");
      info.textContent = `Calibration complete ✓ ${points.length} / ${points.length}`;
      showMessage("Touchscreen calibration complete.");
      return;
    }

    const [x, y] = points[state.calibrationClicks];
    target.style.left = `${x}%`;
    target.style.top = `${y}%`;

    info.textContent = `Tap every target. ${state.calibrationClicks} / ${points.length}`;
  }

  target.addEventListener("click", () => {
    state.calibrationClicks += 1;
    placeTarget();
  });

  placeTarget();

  return wrapper;
}

function createSummary() {
  const wrapper = document.createElement("div");
  wrapper.className = "check-list";

  const entries = [
    ["Display brightness", `${state.settings.brightness}%`],
    ["Volume", `${state.settings.volume}%`],
    ["Touch sensitivity", `${state.settings.sensitivity}%`],
    ["Battery mode", state.settings.batteryMode],
    ["Theme", state.settings.theme],
    ["Haptics", state.settings.haptics ? "Enabled" : "Disabled"],
    ["System sounds", state.settings.sounds ? "Enabled" : "Disabled"],
    ["Setup progress", `${getProgressPercent()}%`]
  ];

  entries.forEach(([name, value]) => {
    const row = document.createElement("div");
    row.className = "check-row";

    const label = document.createElement("span");
    label.textContent = name;

    const result = document.createElement("span");
    result.className = "good";
    result.textContent = value;

    row.append(label, result);
    wrapper.appendChild(row);
  });

  return wrapper;
}

function createComplete() {
  const wrapper = document.createElement("div");
  wrapper.className = "device-preview";

  const screen = document.createElement("div");
  screen.className = "device-screen";

  const text = document.createElement("span");
  text.textContent = "DEVICE READY ✓";

  screen.appendChild(text);
  wrapper.appendChild(screen);

  return wrapper;
}

function createLaunch() {
  const wrapper = document.createElement("div");
  wrapper.className = "device-preview";

  const screen = document.createElement("div");
  screen.className = "device-screen";

  const text = document.createElement("span");
  text.textContent = "Launching NOVA OS...";

  screen.appendChild(text);
  wrapper.appendChild(screen);

  return wrapper;
}

function renderStep() {
  const step = steps[state.currentStep];

  clearMessage();

  elements.progressLabel.textContent =
    `Setup ${Math.min(state.currentStep + 1, steps.length)} of ${steps.length}`;

  const progress = getProgressPercent();

  elements.progressPercent.textContent = `${progress}%`;
  elements.progressBar.style.width = `${progress}%`;

  elements.stepTag.textContent = step.tag;
  elements.stepTitle.textContent = step.title;
  elements.stepDescription.textContent = step.description;
  elements.stepCounter.textContent =
    `${Math.min(state.currentStep + 1, steps.length)} / ${steps.length}`;

  elements.stepContent.innerHTML = "";

  elements.backBtn.disabled = state.currentStep === 0;

  elements.stepHint.textContent =
    step.hint || "Take your time.";

  elements.nextBtn.textContent =
    state.currentStep === steps.length - 1
      ? "Launch NOVA OS →"
      : step.button || "Continue →";

  switch (step.type) {
    case "options":
      elements.stepContent.appendChild(createOptions(step));
      break;

    case "slider":
      elements.stepContent.appendChild(createSlider(step));
      break;

    case "toggle":
      elements.stepContent.appendChild(createToggle(step));
      break;

    case "text":
      elements.stepContent.appendChild(createTextInput(step));
      break;

    case "scan":
      elements.stepContent.appendChild(createScan(step));
      break;

    case "calibration":
      elements.stepContent.appendChild(createCalibration());
      break;

    case "summary":
      elements.stepContent.appendChild(createSummary());
      break;

    case "complete":
      elements.stepContent.appendChild(createComplete());
      break;

    case "launch":
      elements.stepContent.appendChild(createLaunch());
      break;

    case "save":
      elements.stepContent.innerHTML = `
        <div class="check-list">
          <div class="check-row">
            <span>Configuration</span>
            <span class="good">READY</span>
          </div>
          <div class="check-row">
            <span>Device profile</span>
            <span class="good">READY</span>
          </div>
          <div class="check-row">
            <span>Diagnostics</span>
            <span class="good">PASSED</span>
          </div>
        </div>
      `;
      break;

    case "info":
      elements.stepContent.innerHTML = `
        <div class="device-preview">
          <div class="device-screen">
            <span>MAXY.FUN SETUP</span>
          </div>
        </div>
      `;
      break;

    default:
      elements.stepContent.innerHTML = "";
      break;
  }

  elements.statusText.textContent =
    state.currentStep >= steps.length - 2
      ? "Finalising system"
      : "System ready";

  if (step.type === "scan" || state.scanRunning) {
    elements.nextBtn.disabled = true;
  }

  if (state.currentStep === steps.length - 1) {
    elements.nextBtn.disabled = false;
  }
}

function handleNext() {
  const step = steps[state.currentStep];

  if (state.scanRunning) {
    return;
  }

  if (
    step.type === "options" ||
    step.type === "slider" ||
    step.type === "toggle" ||
    step.type === "text" ||
    step.type === "calibration"
  ) {
    if (!requireAnswer()) {
      return;
    }
  }

  if (step.type === "complete") {
    saveProgress(false);
  }

  if (step.type === "launch") {
    launchNovaOS();
    return;
  }

  if (state.currentStep === steps.length - 2) {
    saveProgress(false);
  }

  if (state.currentStep < steps.length - 1) {
    state.currentStep += 1;
    saveProgress(false);
    renderStep();
  }
}

function handleBack() {
  if (state.currentStep <= 0) {
    return;
  }

  state.currentStep -= 1;
  state.scanRunning = false;
  renderStep();
}

function launchNovaOS() {
  elements.nextBtn.disabled = true;
  elements.backBtn.disabled = true;

  elements.statusText.textContent = "Launching NOVA OS";
  elements.stepTag.textContent = "LAUNCH";
  elements.stepTitle.textContent = "Launching NOVA OS…";
  elements.stepDescription.textContent =
    "Handing control over to your operating system.";

  elements.stepContent.innerHTML = `
    <div class="device-preview">
      <div class="device-screen">
        <span>Starting...</span>
      </div>
    </div>
  `;

  elements.stepHint.textContent =
    "Opening novaos.uk";

  setTimeout(() => {
    window.location.href = "https://novaos.uk";
  }, 1600);
}

elements.nextBtn.addEventListener("click", handleNext);

elements.backBtn.addEventListener("click", handleBack);

elements.saveBtn.addEventListener("click", () => {
  saveProgress(true);
});

elements.resetBtn.addEventListener("click", resetProgress);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const tag = document.activeElement?.tagName;

    if (tag !== "INPUT" && tag !== "BUTTON") {
      handleNext();
    }
  }

  if (event.key === "ArrowLeft") {
    handleBack();
  }

  if (event.key === "ArrowRight") {
    handleNext();
  }
});

loadProgress();
renderStep();
