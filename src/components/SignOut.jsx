import React from 'react';
import {doSignOut} from '../firebase/FirebaseFunctions';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  const navigate = useNavigate(); 

  const handleSignOut = async () => {
    await doSignOut();
    navigate('/'); 
  };
  return (
    <button className='block w-full text-center py-2 px-4 bg-primary hover:bg-action text-white font-bold rounded' type='button' onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
