import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../contexts/AuthContext';
import SocialSignIn from './SocialSignIn';

function SignUp() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { displayName, email, passwordOne, passwordTwo } = e.target.elements;
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch('Passwords do not match');
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(
        email.value,
        passwordOne.value,
        displayName.value
      );
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    return <Navigate to='/login' />;
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
      <br></br>
      <h2 className="text-2xl font-bold mb-4 text-center">Sign up</h2>
      {pwMatch && <div className="text-red-500 mb-4">{pwMatch}</div>}
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter your name"
            autoFocus={true}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="passwordOne" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="passwordOne"
            name="passwordOne"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter your password"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="passwordTwo" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="passwordTwo"
            name="passwordTwo"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Confirm your password"
            autoComplete="off"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign Up
        </button>
      </form>
      <br></br>
      <SocialSignIn />
    </div>
  );
}

export default SignUp;
