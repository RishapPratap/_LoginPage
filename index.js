// Get DOM elements
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const homeLink = document.querySelector('nav a[href="#"]');
const loginForm = document.querySelector('.form-box.login form');
const registerForm = document.querySelector('.form-box.register form');

// Add event listeners
registerLink.addEventListener('click', () => {
  document.querySelector('.login-section').classList.add('active');
});

loginLink.addEventListener('click', () => {
  document.querySelector('.login-section').classList.remove('active');
});

homeLink.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'home.html';
});


loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('.form-box.login input[type="email"]').value;
  const password = document.querySelector('.form-box.login input[type="password"]').value;

  // Send a POST request to the login API endpoint
  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the API
      if (data.message === 'Login successful') {
        // Login successful, perform desired actions
        console.log('Login successful');
        // Redirect to the home page
        window.location.href = 'home.html';
      } else {
        // Login failed, display error message
        console.log('Invalid username or password');
      }
    })
    .catch((error) => {
      console.log('An error occurred:', error);
    });
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.querySelector('.form-box.register input[type="text"]').value;
  const email = document.querySelector('.form-box.register input[type="email"]').value;
  const password = document.querySelector('.form-box.register input[type="password"]').value;

  // Send a POST request to the register API endpoint
  fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the API
      if (data.message === 'Registration successful') {
        // Registration successful, perform desired actions
        console.log('Registration successful');
        // Show the login form after successful registration
        document.querySelector('.login-section').classList.remove('active');
      } else {
        // Registration failed, display error message
        console.log('Registration failed');
      }
    })
    .catch((error) => {
      console.log('An error occurred:', error);
    });
});
