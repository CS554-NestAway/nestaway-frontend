import React, { useContext } from "react";
import SignOutButton from "./SignOut";
import ChangePassword from "./ChangePswd";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function UserAccount() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex bg-secondary justify-center items-center h-[91.5vh]">
      <div className="bg-accent1 text-accent2 border border-primary shadow-lg p-8 w-96">
        <h2 className="text-2xl mb-4">Hello, {currentUser.displayName}</h2>
        <ChangePassword />
        <SignOutButton />
      </div>
    </div>
  );
}

export default UserAccount;
