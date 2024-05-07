import React, { useContext } from 'react';
import SignOutButton from './SignOut';
import { Link } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

function UserAccount() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='mx-auto max-w-md p-6'>
      <h2 className='text-2xl font-bold mb-4'>
        Hi {currentUser.displayName}, You can view and update your Profile here
      </h2>
      <Link
        to="/chngpswd"
        className='block w-full text-center py-2 px-4 bg-primary hover:bg-action text-white font-bold rounded'
      >
        Change Password
      </Link>
      <br />
      <SignOutButton />
    </div>
  );
}

export default UserAccount;
