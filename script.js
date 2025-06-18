// Theme Toggle Logic
function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  applyTheme();
}

function applyTheme() {
  const saved = localStorage.getItem("theme");
  const isDark = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
  document.body.className = isDark ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen";

  document.querySelectorAll('textarea').forEach(el => {
    el.classList.toggle('bg-gray-800', isDark);
    el.classList.toggle('text-white', isDark);
    el.classList.toggle('bg-white', !isDark);
    el.classList.toggle('text-black', !isDark);
  });
  document.getElementById("preview").classList.toggle("bg-gray-800", isDark);
  document.getElementById("preview").classList.toggle("bg-white", !isDark);
}

// Run Code Logic
const debounce = (func, delay) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
};

const runCode = debounce(() => {
  const html = document.getElementById("html").value;
  const css = document.getElementById("css").value;
  const js = document.getElementById("js").value;

  const output = `
    <!DOCTYPE html>
    <html>
    <head><style>${css}</style></head>
    <body>
      ${html}
      <script>
        window.onerror = function(msg) {
          parent.document.getElementById('consoleLog').innerText = '❌ ' + msg;
        }
        console.log = function(msg) {
          parent.document.getElementById('consoleLog').innerText += '🟢 ' + msg + "\n";
        }
        ${js}
      <\/script>
    </body>
    </html>
  `;

  const iframe = document.getElementById("preview");
  iframe.srcdoc = output;
  document.getElementById("consoleLog").innerText = "";
}, 500);

["html", "css", "js"].forEach(id => {
  document.getElementById(id).addEventListener("input", runCode);
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("themeToggle").addEventListener("click", toggleDarkMode);
  applyTheme();
  loadProjects();
  runCode();
});

// Project CRUD
function saveProject() {
  const name = document.getElementById("projectName").value.trim();
  const html = document.getElementById("html").value;
  const css = document.getElementById("css").value;
  const js = document.getElementById("js").value;

  if (!name) return alert("Project name is required");

  fetch("backend/save_code.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `name=${encodeURIComponent(name)}&html=${encodeURIComponent(html)}&css=${encodeURIComponent(css)}&js=${encodeURIComponent(js)}`
  })
    .then(res => res.text())
    .then(msg => alert(msg));
}

function loadProjects() {
  fetch("backend/load_projects.php")
    .then(res => res.json())
    .then(projects => {
      const list = document.getElementById("projectList");
      list.innerHTML = "";
      projects.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        list.appendChild(option);
      });
    });
}

function loadSelectedProject() {
  const name = document.getElementById("projectList").value;
  if (!name) return;

  fetch(`backend/load_code.php?name=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("html").value = data.html;
      document.getElementById("css").value = data.css;
      document.getElementById("js").value = data.js;
      runCode();
    });
}

function deleteProject() {
  const name = document.getElementById("projectList").value;
  if (!name) return alert("Select a project to delete.");

  if (!confirm(`Are you sure you want to delete '${name}'?`)) return;

  fetch("backend/delete_code.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `name=${encodeURIComponent(name)}`
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      loadProjects();
    });
}
