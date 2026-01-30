import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./redux/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  //when fisrt load we check user status
  useEffect(() => {
    authService
      .getCurrentUser() //this this will user status
      .then((userData) => {
        console.log(userData, "userData");
        if (userData) {
          dispatch(login({ userData })); //if user exist then change the state in store
        } else {
          dispatch(logout()); //if not exist then atleast logout the user to maintain state
        }
      })
      .finally(() => setLoading(false)); // also update this for conditional rendering
  }, []);
  return !loading ? (
    <div className="min-h-secreen flex flex-wrap flex-col content-between bg-amber-50">
      <div className="w-full block text-center">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="bg-amber-300 text">Loading</div>
  );
}

export default App;
