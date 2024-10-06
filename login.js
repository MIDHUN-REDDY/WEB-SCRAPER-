document.getElementById('loginBtn').addEventListener('click', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    // Dummy validation
    if (email === "user@example.com" && password === "password") {
        loginMessage.innerText = "Login successful!";
        loginMessage.style.color = "green";

        setTimeout(() => {
            window.location.href = 'scraper.html';
        }, 1000);
    } else {
        loginMessage.innerText = "Invalid email or password!";
        loginMessage.style.color = "red";
    }
});
