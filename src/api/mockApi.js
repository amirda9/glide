export const validateLink = (linkId) => {
  // Simulated user data associated with each link, including email
  const users = {
    'abc123': { isValid: true, firstName: 'Amir', lastName: 'Naeini', email: 'amirnaeeni83@gmail.com', isVerified: false },
    'def456': { isValid: true, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', isVerified: false },
    'ghi789': { isValid: true, firstName: 'Emily', lastName: 'Johnson', email: 'emily.johnson@example.com', isVerified: true },
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userData = users[linkId];
      if (userData) {
        resolve(userData);
      } else {
        resolve({ isValid: false });
      }
    }, 1000); // Simulated network delay
  });
};
