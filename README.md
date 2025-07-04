
# 🧑‍💻 Online Code Editor (HTML, CSS, JS + PHP + MySQL)

A browser-based **live code editor** with plans to support user authentication and code snippet management.

---

## 🚀 Project Goal

To build a web-based IDE where users can:

- 📝 Write HTML, CSS, and JavaScript in separate editors  
- 🔎 Preview the output in real time using an `<iframe>`  
- 💾 Save and load code snippets (authentication planned)  
- 🌓 Toggle between Light and Dark themes  
- 📦 Export projects as ZIP files  

> ⚠️ **Note:** User authentication (register/login) is under development and **not functional yet**.

---

## 💻 Tech Stack

| Layer       | Technology                      |
|-------------|----------------------------------|
| Frontend    | HTML, CSS, JavaScript, Bootstrap |
| Editor      | ACE Editor                       |
| Backend     | PHP (for Auth & Project Handling)|
| Database    | MySQL (for User and Code Storage)|
| Hosting     | GitHub Pages / 000webhost / XAMPP|

---

## 📁 Project Structure

 ``` 
📦 online-code-editor/
├── index.html             # Main editor page
├── main.css               # All styles (light/dark mode included)
├── script.js              # Editor logic and theme management
├── backend/
│   ├── db.php             # MySQL database connection
│   ├── register.php       # Registration handler (incomplete)
│   ├── login.php          # Login handler (incomplete)
│   ├── logout.php         # Logout script (planned)
│   ├── save.php           # Save code to database (planned)
│   └── load.php           # Load saved code (planned)
├── auth/
│   ├── login.html         # Login form UI
│   ├── register.html      # Signup form UI
├── assets/                # Optional fonts, icons, images
└── README.md              # Project documentation

 ``` 
---


## 🗂️ Roadmap

| Feature                          | Status        |
|----------------------------------|---------------|
| Basic folder setup               | ✅ Done        |
| Live code editor (HTML/CSS/JS)   | ✅ Done        |
| Live preview via iframe          | ✅ Done        |
| Theme toggle (Light/Dark)        | ✅ Done        |
| Export project as ZIP            | ✅ Done        |
| Save/Load snippets               | 🚧 Planned     |
| User registration/login (PHP)    | 🚧 Incomplete  |
| Responsive UI with Bootstrap     | 🚧 In Progress |
| My Profile page                  | 📝 Planned     |

---

## 👥 Team Members

| Member       | Role                | Key Contributions                        |
|--------------|---------------------|-------------------------------------------|
| Rahul Kumar  | Full-Stack Developer| Initial setup, Editor logic, Theme toggle |
| Somya        | Backend Developer   | PHP + MySQL setup (auth in progress)      |
| Shurti      | UI/UX Designer      | Layout, Styling, Responsive Design        |
| Rahul         | QA & Deployment     | Bug testing, Hosting configuration        |

---

## 🧪 How to Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/online-code-editor.git
   cd online-code-editor ``` 


2. **Set up local server (using XAMPP or similar):**

   * Place the project inside `htdocs/`
   * Start **Apache** and **MySQL**
   * Access: `http://localhost/online-code-editor/`

3. **Database setup (optional):**

   * Create a MySQL DB called `code_editor`
   * Import your SQL schema (not included yet)
   * Update `backend/db.php` with your credentials

---

## ⚠️ Known Issues

* 🔐 Authentication is not yet working (incomplete login/register backend)
* 💾 Save/Load functionality is planned, not implemented
* 📱 Mobile responsiveness needs further optimization

---

## 📬 Feedback and Contributions

We’d love to have your feedback!

* ⭐ Star this repo
* 🍴 Fork and improve it
* 🐛 Submit issues or feature requests

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

```

```
