import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { doChangePassword } from '../firebase/FirebaseFunctions';
import axios from 'axios';

function ChangePassword() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  const [name, setname] = useState(currentUser.displayName);

  const submitChangePasswordForm = async (event) => {
    event.preventDefault();
    const { currentPassword, newPasswordOne, newPasswordTwo } =
      event.target.elements;

    if (newPasswordOne.value !== newPasswordTwo.value) {
      setPwMatch('New Passwords do not match, please try again');
      return false;
    }

    try {
      await doChangePassword(
        currentUser.email,
        currentPassword.value,
        newPasswordOne.value
      );
      alert('Password has been changed, you will now be logged out');
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {}, [name]);

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      {pwMatch && <div className="text-red-500 mb-4">{pwMatch}</div>}
      <form onSubmit={submitChangePasswordForm}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter your current password"
            autoComplete="current-password"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPasswordOne" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            id="newPasswordOne"
            name="newPasswordOne"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter your new password"
            autoComplete="new-password"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="newPasswordTwo" className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            id="newPasswordTwo"
            name="newPasswordTwo"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Confirm your new password"
            autoComplete="new-password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-action focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
