import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateLink } from '../api/mockApi';
import Layout from './Layout'; // Import the Layout component
import './LinkValidator.css'; // Import specific styles if needed

const LinkValidator = () => {
  const { linkId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false); // New state variable to track invalid link
  const [emailVerified, setEmailVerified] = useState(false); // State to track email verification

  useEffect(() => {
    const checkLink = async () => {
      if (!linkId) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await validateLink(linkId);
        if (response.isValid) {
          setUserData(response);
        } else {
          setError(true); // Set error state if the link is invalid
        }
      } catch (error) {
        console.error('Error validating link:', error);
        alert('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    checkLink();
  }, [linkId]);

  // Handle email verification
  const handleEmailVerification = (enteredEmail) => {
    if (enteredEmail === userData.email) {
      setEmailVerified(true);
    } else {
      alert('Email does not match. Please try again.');
    }
  };

  // Handle form submission for verification
  const handleVerificationComplete = () => {
    alert("Verification completed successfully!");
    navigate('/welcome'); // Redirect to the welcome page
  };

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return (
      <Layout>
        <div className="error-message">
          <h1>Invalid Link</h1>
          <p>The link you have entered is not valid. Please check the URL and try again.</p>
          <p>If you believe this is an error, please contact support for further assistance.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {!emailVerified ? (
        <>
          <h1>Hello, {userData.firstName}</h1>
          <p>Please verify your email address to proceed.</p>
          <EmailVerificationForm onVerify={handleEmailVerification} />
        </>
      ) : (
        <ImageUploadForm onComplete={handleVerificationComplete} />
      )}
    </Layout>
  );
};

// Form for email verification
const EmailVerificationForm = ({ onVerify }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(email); // Pass the entered email to parent for verification
  };

  return (
    <form className="verification-form" onSubmit={handleSubmit}>
    <div className="input-group">
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="input-field"
      />
    </div>
    <button type="submit" className="submit-button">Verify Email</button>
  </form>
  );
};

// Form for uploading two images
const ImageUploadForm = ({ onComplete }) => {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
  });
  const [previews, setPreviews] = useState({
    preview1: '',
    preview2: '',
  });

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setImages((prevImages) => ({ ...prevImages, [name]: file }));
      setPreviews((prevPreviews) => ({ ...prevPreviews, [`preview${name.slice(-1)}`]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.image1 && images.image2) {
      onComplete(); // Call the parent function to complete verification
    } else {
      alert('Please upload both images.');
    }
  };

  return (
    <form className="image-upload-form" onSubmit={handleSubmit}>
      <div>
        <input
          type="file"
          name="image1"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {previews.preview1 && <img src={previews.preview1} alt="Preview 1" className="preview-img" />}
      </div>
      <div>
        <input
          type="file"
          name="image2"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {previews.preview2 && <img src={previews.preview2} alt="Preview 2" className="preview-img" />}
      </div>
      <button type="submit">Submit Images</button>
    </form>
  );
};

export default LinkValidator;
