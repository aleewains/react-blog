import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./redux/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react"; // Import a clean icon

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        // Subtle delay to prevent a "flash" of the loader on fast connections
        setTimeout(() => setLoading(false), 400);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary animate-pulse">
        <Loader2 className="w-6 h-6 text-accent animate-spin mb-4" />
        <span className="text-xs uppercase tracking-[0.2em] text-text-muted font-sans">
          Initializing
        </span>
      </div>
    );
  }

  return (
    // 'antialiased' makes Inter and Playfair look much sharper on high-res screens
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary antialiased">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-in fade-in duration-700">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
