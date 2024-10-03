import React, { useState } from 'react';
import { auth } from '../../firebase'; 
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import './Auth.css'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate(); 
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); 
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed. Please ensure your password is at least 6 characters.');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); 
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Google sign-up failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <button onClick={handleGoogleSignUp} className="google" style={{ marginTop: '10px' }}>
        Sign up with Google
      </button>
    </div>
  );
};

export default Signup;
