# Dark Mode Implementation Guide for AYSH Health

This document outlines the steps to implement a comprehensive dark mode feature across the AYSH Health application.

## Table of Contents
1. [Overview](#overview)
2. [Implementation Steps](#implementation-steps)
3. [CSS Variables Approach](#css-variables-approach)
4. [Component-Specific Styling](#component-specific-styling)
5. [User Preference Detection](#user-preference-detection)
6. [Toggle Component](#toggle-component)
7. [Persistence](#persistence)
8. [Testing](#testing)

## Overview

Dark mode provides several benefits:
- Reduced eye strain in low-light environments
- Lower battery consumption on OLED/AMOLED screens
- Aesthetic preference for many users
- Accessibility improvements for users with certain visual sensitivities

## Implementation Steps

### 1. Create a Theme Context

First, create a ThemeContext to manage the theme state across the application:

```jsx
// src/context/ThemeContext.jsx
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle function
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Apply theme class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Load saved preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### 2. Wrap Your App with the Theme Provider

```jsx
// src/App.jsx
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      {/* Rest of your app */}
    </ThemeProvider>
  );
}
```

### 3. Define CSS Variables for Colors

```css
/* src/index.css */
:root {
  /* Light mode colors */
  --background: #f8fafc;
  --surface: #ffffff;
  --primary: #4299e1;
  --primary-dark: #3182ce;
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --border: #e2e8f0;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --input-bg: rgba(255, 255, 255, 0.9);
}

.dark-mode {
  /* Dark mode colors */
  --background: #1a202c;
  --surface: #2d3748;
  --primary: #63b3ed;
  --primary-dark: #4299e1;
  --text-primary: #f7fafc;
  --text-secondary: #e2e8f0;
  --border: #4a5568;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  --input-bg: rgba(45, 55, 72, 0.9);
}
```

### 4. Update Component Styles

Replace hardcoded color values with CSS variables in all component CSS files. For example:

```css
/* Before */
.login-card {
  background: rgba(255, 255, 255, 0.9);
  color: #2d3748;
}

/* After */
.login-card {
  background: var(--surface);
  color: var(--text-primary);
}
```

### 5. Create a Theme Toggle Component

```jsx
// src/components/ThemeToggle.jsx
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleDarkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
```

```css
/* src/components/ThemeToggle.css */
.theme-toggle {
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  box-shadow: var(--shadow);
}

.theme-toggle:hover {
  transform: rotate(30deg);
}
```

### 6. Add the Toggle to Your Layout

```jsx
// src/components/layout/Layout.jsx
import ThemeToggle from '../ThemeToggle';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout-container">
        {children}
      </div>
      <ThemeToggle />
    </div>
  );
};
```

## Component-Specific Styling

### Login Page Dark Mode

For the login page, update the following styles:

```css
/* src/pages/LoginPage.css */
.login-page {
  background: linear-gradient(135deg, var(--background), var(--primary-dark));
}

.particle {
  color: var(--primary);
  opacity: 0.3;
}

.login-card {
  background: var(--surface);
  box-shadow: var(--shadow);
}

.login-header h1 {
  color: var(--text-primary);
}

.login-header p {
  color: var(--text-secondary);
}

.input-group input, .login-input {
  background: var(--input-bg);
  color: var(--text-primary);
  border-color: var(--border);
}

.input-icon {
  color: var(--text-secondary);
}

.login-button {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
}
```

## User Preference Detection

To automatically detect user's system preference:

```jsx
// Add to ThemeContext.jsx
useEffect(() => {
  // Check for saved preference first
  const savedDarkMode = localStorage.getItem('darkMode');
  
  if (savedDarkMode === null) {
    // If no saved preference, check system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  } else {
    setDarkMode(savedDarkMode === 'true');
  }
  
  // Listen for changes in system preference
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (e) => {
    if (localStorage.getItem('darkMode') === null) {
      setDarkMode(e.matches);
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}, []);
```

## Persistence

The implementation above already includes localStorage persistence. When a user toggles the theme, their preference is saved and will be restored on subsequent visits.

## Testing

Test your dark mode implementation across:

1. Different browsers (Chrome, Firefox, Safari, Edge)
2. Different devices (desktop, tablet, mobile)
3. Different color schemes (light, dark, high contrast)
4. With different accessibility tools

## Images and Graphics

For images and graphics that need different versions in dark mode:

```css
.logo-image {
  content: url('/images/logo-light.png');
}

.dark-mode .logo-image {
  content: url('/images/logo-dark.png');
}
```

---

By following these steps, you'll have a comprehensive dark mode implementation that respects user preferences, provides a consistent experience across the application, and enhances accessibility. 