import React from 'react';
import SignOutButton from './SignOut';
import ChangePassword from './ChangePswd';

function UserAccount() {
  return (
    <div className='card'>
      <h2>Account Page</h2>
      <ChangePassword />
      <SignOutButton />
    </div>
  );
}

export default UserAccount;