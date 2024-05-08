import { doSocialSignIn } from '../firebase/FirebaseFunctions';

const SocialSignIn = () => {

  const socialSignOn = async () => {
    try {
      const userData = await doSocialSignIn(); 
      await sendSignUpEmail(userData.email, userData.displayName); 
    } catch (error) {
      alert(error.message);
    }
  };

  const sendSignUpEmail = async (email, displayName) => {
    try {
      const response = await fetch('http://localhost:8080/sendemail/accemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, displayName }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send email');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <img
        onClick={socialSignOn}
        alt='google signin'
        src='/imgs/btn_google_signin.png'
      />
    </div>
  );
};

export default SocialSignIn;
