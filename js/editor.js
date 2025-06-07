// Live preview logic
function runCode() {
  const html = document.getElementById('htmlCode').value;
  const css = document.getElementById('cssCode').value;
  const js = document.getElementById('jsCode').value;

  const output = `
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            padding: 1rem;
            font-family: sans-serif;
            word-wrap: break-word;
          }
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
    </html>
  `;

  const iframe = document.getElementById('preview');
  iframe.srcdoc = output;

  // Auto-resize iframe height to fit content (optional)
  setTimeout(() => {
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 50 + "px";
  }, 300);
}

// Save code to server
function saveCode() {
  const html = document.getElementById('htmlCode').value;
  const css = document.getElementById('cssCode').value;
  const js = document.getElementById('jsCode').value;

  fetch('backend/save_code.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html, css, js })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message || "Saved successfully!");
  })
  .catch(err => {
    console.error(err);
    alert("Error saving code.");
  });
}

// Load code from server
function loadCode() {
  fetch('backend/load_code.php')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById('htmlCode').value = data.html;
        document.getElementById('cssCode').value = data.css;
        document.getElementById('jsCode').value = data.js;
        runCode();
      } else {
        alert("Failed to load code.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Error loading code.");
    });
}

// Export code as downloadable ZIP
function exportCode() {
  const html = document.getElementById('htmlCode').value;
  const css = document.getElementById('cssCode').value;
  const js = document.getElementById('jsCode').value;

  const zip = new JSZip();
  zip.file("index.html", html);
  zip.file("style.css", css);
  zip.file("script.js", js);

  zip.generateAsync({ type: "blob" }).then(function (content) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "code-editor-export.zip";
    link.click();
  });
}

// Modal open/close functions
function openLoginModal() {
  document.getElementById('loginModalWrapper').classList.remove('d-none');
  document.getElementById('registerModalWrapper').classList.add('d-none');
}

function closeLoginModal() {
  document.getElementById('loginModalWrapper').classList.add('d-none');
}

function openRegisterModal() {
  document.getElementById('registerModalWrapper').classList.remove('d-none');
  document.getElementById('loginModalWrapper').classList.add('d-none');
}

function closeRegisterModal() {
  document.getElementById('registerModalWrapper').classList.add('d-none');
}

// Register form submit handler with AJAX
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = {
    username: form.username.value.trim(),
    email: form.email.value.trim(),
    password: form.password.value,
    confirmPassword: form.confirmPassword.value,
  };

  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  fetch('backend/register.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Registration successful! Please log in.');
      closeRegisterModal();
      openLoginModal();
    } else {
      alert('Error: ' + data.message);
    }
  })
  .catch(() => {
    alert('An error occurred while registering. Please try again later.');
  });
});

// Login form submit handler with AJAX
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = {
    email: form.email.value.trim(),
    password: form.password.value,
  };

  fetch('backend/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Login successful! Welcome, ' + data.username);
      closeLoginModal();
      // TODO: Show username in navbar and handle login state here
    } else {
      alert('Login failed: ' + data.message);
    }
  })
  .catch(() => {
    alert('An error occurred while logging in. Please try again later.');
  });
});
