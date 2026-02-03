import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

function ThemeBtn() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute right-4 p-2 rounded-full hover:bg-bg-muted transition-colors group cursor-pointer"
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun Icon */}
        <Sun
          className={`absolute inset-0 transition-transform duration-500 ${
            theme === "dark" ? "-translate-y-8" : "translate-y-0"
          }`}
          size={20}
        />
        {/* Moon Icon */}
        <Moon
          className={`absolute inset-0 transition-transform duration-500 ${
            theme === "dark" ? "translate-y-0" : "translate-y-8"
          }`}
          size={20}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export default ThemeBtn;
