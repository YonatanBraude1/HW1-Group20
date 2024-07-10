document.addEventListener('DOMContentLoaded', () => {
    // Define an array to store user objects
    let users = [
        {
            firstName: 'celine',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            password: '123'
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '9876543210',
            password: 'pass456'
        },
        // Add more fake users as needed
    ];

    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', handleSignUp);

    function handleSignUp(event) {
        event.preventDefault();

        const firstName = document.getElementById('signupFirstName').value;
        const lastName = document.getElementById('signupLastName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('signupPhone').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;

        // Check if phone number is exactly 10 digits
        if (!/^\d{10}$/.test(phone)) {
            alert('Phone number must be 10 digits. Please try again.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Check if the email already exists in the users array
        if (users.some(user => user.email === email)) {
            alert('Email already exists. Please use a different email.');
        } else {
            // Add the new user to the users array
            const newUser = { firstName, lastName, email, phone, password };
            users.push(newUser);

            alert('Signed up successfully!');
            // Clear form fields (optional)
            window.location.href = "home.html";
        }
    }
});
