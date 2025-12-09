/* auth.js - robust version */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Setup Tab Switching
  window.switchTab = function(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    if (tab === 'login') {
      document.querySelectorAll('.auth-tab')[0].classList.add('active');
      document.getElementById('login-form').classList.add('active');
    } else {
      document.querySelectorAll('.auth-tab')[1].classList.add('active');
      document.getElementById('signup-form').classList.add('active');
    }
    // Clear errors
    document.getElementById('login-error').textContent = '';
    document.getElementById('signup-error').textContent = '';
  };

  // 2. Attach Signup Event Listener
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Stop page reload
      
      const name = document.getElementById('signup-name').value.trim();
      const mobile = document.getElementById('signup-mobile').value.trim();
      const pass = document.getElementById('signup-pass').value.trim();
      const errorEl = document.getElementById('signup-error');

      if (!name || !mobile || !pass) {
        errorEl.textContent = "All fields are required.";
        return;
      }

      if (mobile.length < 10) {
        errorEl.textContent = "Please enter a valid mobile number.";
        return;
      }

      // Check existing users
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(u => u.mobile === mobile)) {
        errorEl.textContent = "User with this mobile already exists.";
        return;
      }

      // Create User
      users.push({ name, mobile, pass });
      localStorage.setItem('users', JSON.stringify(users));

      alert("Account created successfully! Please login.");
      switchTab('login');
      document.getElementById('login-id').value = mobile; 
    });
  }

  // 3. Attach Login Event Listener
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Stop page reload

      const id = document.getElementById('login-id').value.trim();
      const pass = document.getElementById('login-pass').value.trim();
      const errorEl = document.getElementById('login-error');

      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Find user
      const user = users.find(u => u.mobile === id && u.pass === pass);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html'; // Redirect
      } else {
        errorEl.textContent = "Invalid Mobile or Password.";
      }
    });
  }
});