// ======================================
// 🎨 ACE Editor Setup & Global Constants
// ======================================
ace.require("ace/ext/language_tools");

const htmlEditor = ace.edit("editor-html", {
  mode: "ace/mode/html",
  theme: "ace/theme/monokai",
  fontSize: 14,
  wrap: true,
  showPrintMargin: false,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true
});

const cssEditor = ace.edit("editor-css", {
  mode: "ace/mode/css",
  theme: "ace/theme/monokai",
  fontSize: 14,
  wrap: true,
  showPrintMargin: false,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true
});

const jsEditor = ace.edit("editor-js", {
  mode: "ace/mode/javascript",
  theme: "ace/theme/monokai",
  fontSize: 14,
  wrap: true,
  showPrintMargin: false,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true
});

// =============================
// ▶️ Run Code in Preview
// =============================
window.runCode = function () {
  const runBtn = document.querySelector("button[onclick='runCode()']");
  runBtn.classList.add("btn-loading");
  runBtn.innerHTML = 'Running <span class="spinner"></span>';

  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const completeHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>
          console.log = (msg) => parent.postMessage({ type: 'log', message: msg }, '*');
          window.onerror = (msg, url, line, col) =>
            parent.postMessage({ type: 'error', message: msg + ' at ' + line + ':' + col }, '*');
          try { ${js} } catch (e) { console.error(e); }
        <\/script>
      </body>
    </html>
  `;

  const blob = new Blob([completeHTML], { type: "text/html" });
  document.getElementById("preview").src = URL.createObjectURL(blob);
  document.getElementById("consoleLog").textContent = "";

  setTimeout(() => {
    runBtn.innerHTML = "▶️ Run";
    runBtn.classList.remove("btn-loading");
  }, 800);
};

// =============================
// 🧾 Console Logger
// =============================
window.addEventListener("message", (e) => {
  const logBox = document.getElementById("consoleLog");
  const prefix = e.data.type === "log" ? "🟢" : "🔴";
  logBox.textContent += `${prefix} ${e.data.message}\n`;
  logBox.scrollTop = logBox.scrollHeight;
});

// =============================
// 💾 Project Save/Load
// =============================
function updateProjectList() {
  const list = document.getElementById("projectList");
  list.innerHTML = '<option value="">-- Projects --</option>';
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith("project_")) {
      const name = key.replace("project_", "");
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      list.appendChild(opt);
    }
  });
}

window.saveActiveProject = () => {
  const name = prompt("Enter project name:");
  if (!name) return;
  const data = {
    html: htmlEditor.getValue(),
    css: cssEditor.getValue(),
    js: jsEditor.getValue()
  };
  localStorage.setItem("project_" + name, JSON.stringify(data));
  updateProjectList();
};

window.loadActiveProject = () => {
  const name = document.getElementById("projectList").value;
  if (!name) return;
  const data = JSON.parse(localStorage.getItem("project_" + name));
  if (data) {
    htmlEditor.setValue(data.html, -1);
    cssEditor.setValue(data.css, -1);
    jsEditor.setValue(data.js, -1);
  }
};

window.selectProject = (name) => {
  if (name) window.loadActiveProject();
};

// =============================
// 🧹 Clear All Editors
// =============================
window.clearAll = () => {
  htmlEditor.setValue("", -1);
  cssEditor.setValue("", -1);
  jsEditor.setValue("", -1);
  document.getElementById("consoleLog").textContent = "";
};

// =============================
// 📦 Export Project to ZIP
// =============================
window.exportZip = () => {
  const zip = new JSZip();
  zip.file("index.html", htmlEditor.getValue());
  zip.file("style.css", cssEditor.getValue());
  zip.file("script.js", jsEditor.getValue());

  zip.generateAsync({ type: "blob" }).then(content => {
    saveAs(content, "project.zip");
  });
};

// =============================
// 🔗 Shareable Project URL
// =============================
window.shareProject = () => {
  const data = {
    html: htmlEditor.getValue(),
    css: cssEditor.getValue(),
    js: jsEditor.getValue()
  };
  const encoded = btoa(JSON.stringify(data));
  const url = `${location.origin}${location.pathname}?project=${encoded}`;
  navigator.clipboard.writeText(url);
  alert("🔗 Shareable link copied to clipboard!");
};

// =============================
// 🌐 Load from Shared URL
// =============================
function loadFromURL() {
  const params = new URLSearchParams(location.search);
  if (params.has("project")) {
    try {
      const raw = atob(params.get("project"));
      const data = JSON.parse(raw);
      htmlEditor.setValue(data.html, -1);
      cssEditor.setValue(data.css, -1);
      jsEditor.setValue(data.js, -1);
    } catch (e) {
      alert("Failed to load shared project.");
    }
  }
}

// =============================
// 🌙 Theme Toggle + Persistence
// =============================
window.toggleTheme = () => {
  const isDark = document.getElementById("themeToggle").checked;
  const theme = isDark ? "dark" : "light";

  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const aceTheme = isDark ? "ace/theme/monokai" : "ace/theme/chrome";
  htmlEditor.setTheme(aceTheme);
  cssEditor.setTheme(aceTheme);
  jsEditor.setTheme(aceTheme);
};

// =============================
// 🖥️ Fullscreen Toggle
// =============================
window.togglePreviewFullscreen = () => {
  document.getElementById("preview").classList.toggle("fullscreen");
};

// =============================
// 🚀 Initialization
// =============================
window.addEventListener("DOMContentLoaded", () => {
  updateProjectList();
  loadFromURL();

  const savedTheme = localStorage.getItem("theme") || "light";
  const isDark = savedTheme === "dark";
  document.getElementById("themeToggle").checked = isDark;
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.setAttribute("data-theme", savedTheme);

  const aceTheme = isDark ? "ace/theme/monokai" : "ace/theme/chrome";
  htmlEditor.setTheme(aceTheme);
  cssEditor.setTheme(aceTheme);
  jsEditor.setTheme(aceTheme);
});
