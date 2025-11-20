const apiUrl = "http://localhost:8080/students";

// 🚫 Redirect if not logged in
if (localStorage.getItem("isAdmin") !== "true") {
  window.location.href = "login.html";
}

// 🚪 Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("isAdmin");
  window.location.href = "login.html";
});

// 📌 Fetch all students
async function fetchStudents() {
  try {
    const res = await fetch(apiUrl);
    const students = await res.json();

    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    students.forEach((s) => {
      tableBody.innerHTML += `
        <tr>
          <td>${s.id}</td>
          <td>${s.name}</td>
          <td>${s.email}</td>
          <td>${s.age}</td>
          <td>
            <button class="edit-btn" onclick="editStudent(${s.id})">Edit</button>
            <button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
          </td>
        </tr>
      `;
    });
  } catch (err) {
    console.error("Error fetching students", err);
  }
}

// ✏️ Edit student
async function editStudent(id) {
  const res = await fetch(`${apiUrl}/${id}`);
  const s = await res.json();

  document.getElementById("studentId").value = s.id;
  document.getElementById("name").value = s.name;
  document.getElementById("email").value = s.email;
  document.getElementById("age").value = s.age;
}

// ❌ Delete student
async function deleteStudent(id) {
  if (!confirm("Delete this student?")) return;

  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  fetchStudents();
}

// 💾 Save student (Add or Update)
document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("studentId").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;

  const student = { name, email, age };

  const method = id ? "PUT" : "POST";
  const url = id ? `${apiUrl}/${id}` : apiUrl;

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  document.getElementById("studentForm").reset();
  fetchStudents();
});

// 🌙 DARK MODE
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

// Load data at start
fetchStudents();
