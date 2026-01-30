import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout as authLogout } from "../../redux/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(authLogout()); //update the state in store
    });
  };
  return (
    <button
      onClick={handleLogout}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
