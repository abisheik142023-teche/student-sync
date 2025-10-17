document.addEventListener('DOMContentLoaded', () => {

  // ----------------------
  // Student Registration
  // ----------------------
  const studentForm = document.getElementById('studentForm');
  if(studentForm){
    studentForm.addEventListener('submit', async e => {
      e.preventDefault();
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if(password !== confirmPassword){
        alert("Passwords do not match!");
        return;
      }

      try {
        const res = await fetch('/api/auth/register/student', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, email, password })
        });
        const data = await res.json();
        if(res.ok){
          alert("Student registered successfully!");
          window.location.href = '/login.html';
        } else {
          alert(data.message || "Registration failed");
        }
      } catch(err){
        console.error(err);
        alert("Server error");
      }
    });
  }

  // ----------------------
  // Faculty Registration
  // ----------------------
  const facultyForm = document.getElementById('facultyForm');
  if(facultyForm){
    facultyForm.addEventListener('submit', async e => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if(password !== confirmPassword){
        alert("Passwords do not match!");
        return;
      }

      try {
        const res = await fetch('/api/auth/register/faculty', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if(res.ok){
          alert("Faculty registered successfully!");
          window.location.href = '/login.html';
        } else {
          alert(data.message || "Registration failed");
        }
      } catch(err){
        console.error(err);
        alert("Server error");
      }
    });
  }

  // ----------------------
  // Login
  // ----------------------
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if(res.ok){
          localStorage.setItem('token', data.token);
          localStorage.setItem('userRole', data.role); // student / faculty
          alert("Login successful!");
          if(data.role === 'faculty'){
            window.location.href = '/faculty-dashboard.html';
          } else {
            window.location.href = '/';
          }
        } else {
          alert(data.message || "Login failed");
        }
      } catch(err){
        console.error(err);
        alert("Server error");
      }
    });
  }

  // ----------------------
  // Event Creation (Faculty Only)
  // ----------------------
  const eventForm = document.getElementById('eventForm');
  if(eventForm){
    eventForm.addEventListener('submit', async e => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      if(!token){
        alert("Please login first!");
        return;
      }

      const eventData = {
        title: document.getElementById('title').value.trim(),
        type: document.getElementById('type').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        location: document.getElementById('location').value.trim(),
        description: document.getElementById('description').value.trim()
      };

      try {
        const res = await fetch('/api/events/create', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(eventData)
        });
        const data = await res.json();
        if(res.ok){
          alert("Event created successfully!");
          window.location.href = '/faculty-dashboard.html';
        } else {
          alert(data.message || "Failed to create event");
        }
      } catch(err){
        console.error(err);
        alert("Server error");
      }
    });
  }

  // ----------------------
  // Optional: Logout button handler
  // ----------------------
  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn){
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/';
    });
  }

});
