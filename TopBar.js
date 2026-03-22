@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #F8FAFF;
  color: #111827;
}

.App {
  min-height: 100vh;
}

/* Scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #F8FAFF;
}

::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #D1D5DB;
}

/* Prevent text selection on interactive elements */
button, .nav-item {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Smooth transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
}

button:focus,
input:focus,
textarea:focus {
  outline: none;
}
