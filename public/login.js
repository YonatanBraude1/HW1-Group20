 // Function to simulate login with fake data
 function login(username, password) {
    const fakeUsers = [
        { username: "celine", password: "123" },
        { username: "annod", password: "234" },
        { username: "marwa", password: "456" }
    ];

    const user = fakeUsers.find(u => u.username === username && u.password === password);

    if (user) {
        alert(`Welcome, ${username}!`);
        // Perform actual form submission or redirect here
        // Example: document.getElementById("loginForm").submit();
        window.location.href = "profile.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

// Function to handle form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    login(username, password);
});

// Function for "Login without account" button (just an example)
function loginWithoutAccount() {
    alert("Login without account clicked.");
    // Implement action as needed
    window.location.href = "home.html";
}