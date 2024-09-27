# Glide App

A React-based application that allows users to verify themselves through a unique link. Once verified, users can upload two images as part of the verification process. The app is optimized for mobile devices and includes a clean UI for a better user experience.

## Features

- **Unique Link Validation**: Checks if the user has a valid unique link.
- **Email Verification**: User verifies their email against the provided unique link.
- **Image Upload**: After email verification, users are prompted to upload two images for further verification.
- **Responsive UI**: The app is designed to be mobile-friendly with modern UI components.

## Project Structure

/src ├── /api │ └── mockApi.js # Mock API to simulate link and user data validation ├── /assets │ └── logo.png # Logo used in the app ├── /components │ ├── EmailVerificationForm.js # Component for email verification │ ├── LinkValidator.js # Main component for link validation and verification process │ ├── WelcomePage.js # Component for the welcome page and image upload │ ├── Layout.js # Shared layout component with logo and container │ ├── LinkValidator.css # CSS specific to LinkValidator component │ ├── WelcomePage.css # CSS specific to WelcomePage component │ └── Layout.css # CSS for the shared layout ├── /styles │ └── global.css # Global CSS styles ├── App.js # Main app component with routing └── index.js # Entry point of the application 



## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/glide-app.git
   cd glide-app


2. **Install dependencies**
   ```bash 
    npm install
    ```

3. **Run the app**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

