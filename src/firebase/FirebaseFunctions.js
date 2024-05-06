import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    signInWithEmailAndPassword,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    EmailAuthProvider,
    reauthenticateWithCredential
  } from 'firebase/auth';
  import axios from 'axios'
  
  async function doCreateUserWithEmailAndPassword(email, password, displayName) {
    const auth = getAuth();
    let user;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // console.log(userCredential);
        user = userCredential.user;
        // console.log(user);
    } catch (error) {
        console.error("Error creating user:", error.message);
        return; 
    }

    try {
        await updateProfile(auth.currentUser, { displayName });
    } catch (error) {
        console.error("Error updating profile:", error.message);
        return; 
    }

    try {
        await axios.post("http://localhost:8080/user/newuser", {
            name: displayName,
            email: user.email 
        });
        console.log("User created and profile updated successfully.");
        await doSignOut();
    } catch (error) {
        console.error("Error posting user data:", error.message);
    }
}
async function updateUserProfile(displayName) {
  const auth = getAuth();

  try {
    await updateProfile(auth.currentUser, { displayName});
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
}

  async function doChangePassword(email, oldPassword, newPassword) {
    const auth = getAuth();
    let credential = EmailAuthProvider.credential(email, oldPassword);
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
    await doSignOut();
  }
  
  async function doSignInWithEmailAndPassword(email, password) {
    let auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
  }
  
  async function doSocialSignIn() {
    let auth = getAuth();
    let socialProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, socialProvider);
  }
  
  async function doPasswordReset(email) {
    let auth = getAuth();
    await sendPasswordResetEmail(auth, email);
  }
  
  async function doSignOut() {
    let auth = getAuth();
    await signOut(auth);
  }
  
  export {
    doCreateUserWithEmailAndPassword,
    doSocialSignIn,
    doSignInWithEmailAndPassword,
    doPasswordReset,
    doSignOut,
    doChangePassword,
    updateUserProfile
  };