import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../../redux/user/userSlice";

export default function Oauth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signinSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("tidak bisa sign in dengan google");
    }
  };
  return (
    <button
      type="button"
      className="bg-neutral-900 p-3 rounded-lg text-white w-full uppercase text-sm hover:opacity-95"
      onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  );
}
