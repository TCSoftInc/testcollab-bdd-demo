/**
 * TestCollab BDD Demo - Application Logic
 * 
 * This script provides the interactive functionality for the demo web application.
 * It includes login handling, profile management, and form validation.
 */

// Mock user database (for demo purposes)
const mockUsers = {
    'valid@example.com': {
        password: 'correctpassword',
        name: 'John Doe',
        phone: '+1-555-0123',
        bio: 'Software developer and BDD enthusiast.'
    },
    'jane@example.com': {
        password: 'mypassword123',
        name: 'Jane Smith', 
        phone: '+1-555-0456',
        bio: 'QA engineer passionate about test automation.'
    }
};

// Current session state
let currentUser = null;

// DOM elements
const loginSection = document.getElementById('login-section');
const profileSection = document.getElementById('profile-section');
const loginForm = document.getElementById('login-form');
const profileForm = document.getElementById('profile-form');
const passwordForm = document.getElementById('password-form');
const loginError = document.getElementById('login-error');
const passwordError = document.getElementById('password-error');
const passwordSuccess = document.getElementById('password-success');
const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('logout-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Check if user is already logged in (from sessionStorage)
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showProfileSection();
    } else {
        showLoginSection();
    }

    // Set up event listeners
    setupEventListeners();
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Login form submission
    loginForm.addEventListener('submit', handleLogin);
    
    // Profile form submission
    profileForm.addEventListener('submit', handleProfileUpdate);
    
    // Password change form submission
    passwordForm.addEventListener('submit', handlePasswordChange);
    
    // Logout button
    logoutBtn.addEventListener('click', handleLogout);
    
    // Form field validation
    setupFormValidation();
}

/**
 * Handle login form submission
 */
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Clear previous error messages
    hideError(loginError);
    
    // Validate form
    if (!email || !password) {
        showError(loginError, 'Please fill in all fields');
        return;
    }
    
    // Check credentials
    if (!mockUsers[email]) {
        showError(loginError, 'User not found');
        return;
    }
    
    if (mockUsers[email].password !== password) {
        showError(loginError, 'Invalid credentials');
        return;
    }
    
    // Successful login
    currentUser = {
        email: email,
        ...mockUsers[email]
    };
    
    // Save to session storage
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Show profile section
    showProfileSection();
}

/**
 * Handle profile update form submission
 */
function handleProfileUpdate(event) {
    event.preventDefault();
    
    if (!currentUser) return;
    
    const formData = new FormData(profileForm);
    const name = formData.get('name').trim();
    const phone = formData.get('phone').trim();
    const bio = formData.get('bio').trim();
    
    if (!name) {
        alert('Name is required');
        return;
    }
    
    // Update current user data
    currentUser.name = name;
    currentUser.phone = phone;
    currentUser.bio = bio;
    
    // Update mock database
    mockUsers[currentUser.email] = {
        ...mockUsers[currentUser.email],
        name: name,
        phone: phone,
        bio: bio
    };
    
    // Update session storage
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Show success feedback
    showTemporaryMessage('Profile updated successfully!', 'success');
}

/**
 * Handle password change form submission
 */
function handlePasswordChange(event) {
    event.preventDefault();
    
    if (!currentUser) return;
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Clear previous messages
    hideError(passwordError);
    hideSuccess(passwordSuccess);
    
    // Validate current password
    if (currentPassword !== currentUser.password) {
        showError(passwordError, 'Current password is incorrect');
        return;
    }
    
    // Validate new password
    if (newPassword.length < 6) {
        showError(passwordError, 'New password must be at least 6 characters long');
        return;
    }
    
    // Validate password confirmation
    if (newPassword !== confirmPassword) {
        showError(passwordError, 'New passwords do not match');
        return;
    }
    
    // Update password
    currentUser.password = newPassword;
    mockUsers[currentUser.email].password = newPassword;
    
    // Update session storage
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Show success message
    showSuccess(passwordSuccess, 'Password changed successfully!');
    
    // Clear form
    passwordForm.reset();
}

/**
 * Handle logout
 */
function handleLogout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    showLoginSection();
    
    // Clear all forms
    loginForm.reset();
    profileForm.reset();
    passwordForm.reset();
    
    // Clear all messages
    hideError(loginError);
    hideError(passwordError);
    hideSuccess(passwordSuccess);
}

/**
 * Show the login section
 */
function showLoginSection() {
    loginSection.classList.remove('hidden');
    profileSection.classList.add('hidden');
    document.getElementById('email').focus();
}

/**
 * Show the profile section
 */
function showProfileSection() {
    if (!currentUser) return;
    
    loginSection.classList.add('hidden');
    profileSection.classList.remove('hidden');
    
    // Update welcome message
    welcomeMessage.textContent = `Welcome back, ${currentUser.name}!`;
    
    // Populate profile form
    document.getElementById('profile-name').value = currentUser.name || '';
    document.getElementById('profile-email').value = currentUser.email || '';
    document.getElementById('profile-phone').value = currentUser.phone || '';
    document.getElementById('profile-bio').value = currentUser.bio || '';
}

/**
 * Show error message
 */
function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

/**
 * Hide error message
 */
function hideError(element) {
    element.textContent = '';
    element.classList.remove('show');
}

/**
 * Show success message
 */
function showSuccess(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

/**
 * Hide success message
 */
function hideSuccess(element) {
    element.textContent = '';
    element.classList.remove('show');
}

/**
 * Show temporary message with auto-hide
 */
function showTemporaryMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message show`;
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.padding = '15px 20px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

/**
 * Setup form validation
 */
function setupFormValidation() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.setCustomValidity('');
            }
        });
    });
    
    // Password confirmation validation
    const confirmPasswordInput = document.getElementById('confirm-password');
    const newPasswordInput = document.getElementById('new-password');
    
    if (confirmPasswordInput && newPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value !== newPasswordInput.value) {
                this.setCustomValidity('Passwords do not match');
            } else {
                this.setCustomValidity('');
            }
        });
        
        newPasswordInput.addEventListener('input', function() {
            if (confirmPasswordInput.value && confirmPasswordInput.value !== this.value) {
                confirmPasswordInput.setCustomValidity('Passwords do not match');
            } else {
                confirmPasswordInput.setCustomValidity('');
            }
        });
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Helper function to get current user (for testing)
 */
function getCurrentUser() {
    return currentUser;
}

/**
 * Helper function to check if user is logged in (for testing)
 */
function isLoggedIn() {
    return currentUser !== null;
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleLogin,
        handleProfileUpdate,
        handlePasswordChange,
        handleLogout,
        getCurrentUser,
        isLoggedIn,
        mockUsers
    };
}
