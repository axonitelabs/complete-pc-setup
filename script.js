// ===== SECRET ADMIN PANEL =====

let adminCode = "";
const SECRET_ADMIN_CODE = "2017";

document.addEventListener("keydown", (event) => {
  // Ignore keys while typing in an input
  if (
    document.activeElement &&
    (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA"
    )
  ) {
    return;
  }

  if (/^[0-9]$/.test(event.key)) {
    adminCode += event.key;

    if (adminCode.length > SECRET_ADMIN_CODE.length) {
      adminCode = adminCode.slice(-SECRET_ADMIN_CODE.length);
    }

    if (adminCode === SECRET_ADMIN_CODE) {
      adminCode = "";
      openAdminPanel();
    }
  }
});

function openAdminPanel() {
  if (document.getElementById("adminPanel")) return;

  const panel = document.createElement("div");
  panel.id = "adminPanel";

  panel.innerHTML = `
    <div style="
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.72);
      backdrop-filter:blur(8px);
      z-index:9999;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
    ">
      <div style="
        width:min(520px,100%);
        background:#11141c;
        border:1px solid rgba(143,124,255,.4);
        border-radius:20px;
        padding:24px;
        box-shadow:0 30px 80px rgba(0,0,0,.6);
        color:white;
      ">
        <div style="
          color:#a894ff;
          font-size:12px;
          font-weight:900;
          letter-spacing:.12em;
          margin-bottom:8px;
        ">
          SECRET ADMIN PANEL
        </div>

        <h2 style="margin:0 0 8px;">
          MAXY.FUN CONTROL CENTRE
        </h2>

        <p style="
          color:#aab1c0;
          margin-top:0;
        ">
          Current step: ${state.currentStep + 1} / ${steps.length}
        </p>

        <div style="
          display:grid;
          gap:10px;
          margin-top:18px;
        ">
          <button id="adminNext" style="${adminButtonStyle()}">
            Skip to next step
          </button>

          <button id="adminComplete" style="${adminButtonStyle()}">
            Complete entire game
          </button>

          <button id="adminClearSave" style="${adminButtonStyle()}">
            Clear saved progress
          </button>

          <button id="adminClose" style="${adminButtonStyle()}">
            Close admin panel
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(panel);

  document.getElementById("adminNext").onclick = () => {
    if (state.currentStep < steps.length - 1) {
      state.currentStep++;
      renderStep();
      panel.remove();
    }
  };

  document.getElementById("adminComplete").onclick = () => {
    state.currentStep = steps.length - 2;
    saveProgress(false);
    renderStep();
    showToast("ADMIN: Game completed.");
    panel.remove();
  };

  document.getElementById("adminClearSave").onclick = () => {
    localStorage.removeItem(SAVE_KEY);
    showToast("ADMIN: Saved progress deleted.");
  };

  document.getElementById("adminClose").onclick = () => {
    panel.remove();
  };
}

function adminButtonStyle() {
  return `
    width:100%;
    padding:13px 15px;
    border-radius:12px;
    border:1px solid rgba(255,255,255,.1);
    background:rgba(255,255,255,.05);
    color:white;
    cursor:pointer;
    font-weight:800;
  `;
}
