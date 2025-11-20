document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Correct credentials
    const adminUser = "admin123";
    const adminPass = "admin@123";

    if (username === adminUser && password === adminPass) {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "index.html";
    } else {
        document.getElementById("errorMsg").innerText = "Invalid username or password!";
    }
});
