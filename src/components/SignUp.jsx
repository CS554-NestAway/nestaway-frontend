import {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {doCreateUserWithEmailAndPassword} from '../firebase/FirebaseFunctions';
import {AuthContext} from '../contexts/AuthContext';
import SocialSignIn from './SocialSignIn';

function SignUp() {
  const {currentUser} = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  const handleSignUp = async (e) => {
    e.preventDefault();
    const {displayName, email, passwordOne, passwordTwo} = e.target.elements;
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
    <div className="flex justify-center items-center h-screen">
      <div className="card border border-gray-300 shadow-lg p-8 w-96">
        <div className='bg-primary'><h1 className="text-2xl mb-4 text-white">Sign up</h1></div>
        {pwMatch && <h4 className="error">{pwMatch}</h4>}
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label>
              Name:
              <br />
              <input
                className="form-control mt-2 w-full"
                required
                name="displayName"
                type="text"
                placeholder="Name"
                autoFocus={true}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email:
              <br />
              <input
                className="form-control mt-2"
                required
                name="email"
                type="email"
                placeholder="Email"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password:
              <br />
              <input
                className="form-control mt-2"
                id="passwordOne"
                name="passwordOne"
                type="password"
                placeholder="Password"
                autoComplete="off"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Confirm Password:
              <br />
              <input
                className="form-control mt-2"
                name="passwordTwo"
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
                required
              />
            </label>
          </div>
          <br></br>
          <button
            className={"bg-primary  gap-2 text-accent1 rounded-lg ml-auto px-2"}
            id="submitButton"
            name="submitButton"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <br />
        <SocialSignIn />
      </div>
    </div>
  );
}

export default SignUp;