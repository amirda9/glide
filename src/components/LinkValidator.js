import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateLink, verifyImages } from '../api/mockApi';
import Layout from './Layout';
import './LinkValidator.css';
import { useAuth } from '../context/AuthContext'; 

const LinkValidator = () => {
  const linkId = useParams().linkId;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Track if user is verified
  const { login } = useAuth();

  
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
          setError(true);
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

  const handleEmailVerification = (enteredEmail) => {
    if (enteredEmail === userData.email) {
      setEmailVerified(true);
    } else {
      alert('Email does not match. Please try again.');
    }
  };

  // Handle image submission and verification
  const handleImageSubmission = async (images) => {
    setLoading(true);
    try {
      const response = await verifyImages(images, linkId);
      // Inside handleImageSubmission function
      if (response.isApproved) {
        setIsVerified(true); // Show success message
        setTimeout(async () => {
          await login({ email: userData.email, password: userData.lastName });
          navigate('/home'); // Redirect to home page
        }, 3000); // Delay before redirecting
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error verifying images:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
      {isVerified ? (
        <div className="success-message">
          <div className="checkmark">
            ✔️
          </div>
          <h1>Verification Successful!</h1>
          <p>Redirecting you to the home page...</p>
        </div>
      ) : !emailVerified ? (
        <>
          <h1>Hello, {userData.firstName} {userData.lastName}!</h1>
          <p>Please verify your email address to proceed.</p>
          <EmailVerificationForm onVerify={handleEmailVerification} />
        </>
      ) : (
        <ImageUploadForm onSubmitImages={handleImageSubmission} />
      )}
    </Layout>
  );
};

// Form for email verification
const EmailVerificationForm = ({ onVerify }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(email);
  };

  return (
    <form className="verification-form" onSubmit={handleSubmit}>
      <div>
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
const ImageUploadForm = ({ onSubmitImages }) => {
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
      onSubmitImages(images); // Call the parent function to submit images for verification
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
      <button type="submit" className="submit-button">Submit Images</button>
    </form>
  );
};

export default LinkValidator;
