import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout as authLogout } from "../../redux/authSlice";
import { LogOut } from "lucide-react"; // Matching your other icons

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(authLogout());
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="group flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-bold text-text-muted hover:text-red-500 transition-all duration-300"
    >
      <span>Logout</span>
      <LogOut
        size={14}
        className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
      />
    </button>
  );
}

export default LogoutBtn;
