// Mock user data with verification status and optional password
const users = {
  'abc123': { isValid: true, firstName: 'Amir', lastName: 'Naeini', email: 'amirnaeeni83@gmail.com', isVerified: false, password: 'p' },
  'def456': { isValid: true, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', isVerified: false, password: null },
  'ghi789': { isValid: true, firstName: 'Emily', lastName: 'Johnson', email: 'emily.johnson@example.com', isVerified: true, password: 'password123' },
};

export const validateLink = (linkId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userData = users[linkId];
      if (userData) {
        resolve(userData);
        localStorage.setItem('authenticatedUser', JSON.stringify(userData))
      } else {
        resolve({ isValid: false });
      }
    }, 1000); // Simulated network delay
  });
};

// Update the user's isVerified status and set initial password upon successful image verification
export const verifyImages = (images, linkId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isApproved = Math.random() > 0.5; // Randomly approve or reject 
      if (isApproved && users[linkId]) {
        users[linkId].isVerified = true; // Update the isVerified status to true
        users[linkId].password = users[linkId].lastName; // Set initial password as last name
        resolve({ isApproved: true });
      } else {
        resolve({ isApproved: false, message: "Images do not meet the verification criteria. Please try again." });
      }
    }, 1000); // Simulated network delay
  });
};

// Set a password for the user
export const setPassword = (linkId, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users[linkId]) {
        users[linkId].password = password; // Set the password
        resolve({ success: true });
      } else {
        reject({ success: false, message: "User not found." });
      }
    }, 1000); // Simulated network delay
  });
};

// Sign in with email and password
export const signIn = (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find user with matching email and password
      const user = Object.values(users).find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        localStorage.setItem('authenticatedUser', JSON.stringify(user))
        resolve({ success: true });
      } else {
        resolve({ success: false, message: "Invalid email or password." });
      }
    }, 1000); // Simulated network delay
  });
};


// Mock function to simulate logout
export const signOut = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500); // Simulated network delay
  });
};

// Mock function to get the current authenticated user
export const getCurrentUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check localStorage or sessionStorage for authenticated user
      const user = JSON.parse(localStorage.getItem('authenticatedUser'));
      if (user) {
        resolve({ success: true, user });
      } else {
        resolve({ success: false });
      }
    }, 500); // Simulated network delay
  });
};
