import { GoogleLogo } from "@phosphor-icons/react";
import { doSocialSignIn } from "../firebase/FirebaseFunctions";

const SocialSignIn = () => {
  const socialSignOn = async () => {
    try {
      await doSocialSignIn();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="flex justify-center items-center font-didact text-primary bg-accent1 mt-2">
      <button
        onClick={() => socialSignOn()}
        className="flex items-center gap-2 px-4 py-2  border border-primary rounded-lg shadow-md  hover:bg-action hover:text-accent1 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <GoogleLogo size={32} />
        <span className="font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default SocialSignIn;
