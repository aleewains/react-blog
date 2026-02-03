import { Link, NavLink } from "react-router-dom";
import { Container, LogoutBtn, Logo, ThemeBtn } from "../index";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
function Header() {
  const authStatus = useSelector((state: RootState) => state.auth.status);

  const navItems = [
    { name: "Home", url: "/", active: true },
    { name: "All Posts", url: "/all-posts", active: authStatus },
    { name: "Add Post", url: "/add-post", active: authStatus },
    { name: "Login", url: "/login", active: !authStatus },
    { name: "Signup", url: "/signup", active: !authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-primary/70 backdrop-blur-md border-b border-border-subtle">
      <Container>
        <nav className="flex h-20 items-center justify-between ">
          {/* Logo Section */}
          <Link
            to="/"
            className="transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Logo />
          </Link>

          {/* Navigation Section */}
          <div className="flex items-center gap-8">
            <ul className="flex items-center gap-2">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `relative px-4 py-2 text-[13px] uppercase tracking-[0.15em] font-semibold transition-all duration-300
                          ${
                            isActive
                              ? "text-text-primary"
                              : "text-text-muted hover:text-text-primary"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {item.name}
                            {/* Refined Indicator: A subtle dot or a thinner line */}
                            <span
                              className={`absolute left-1/2 -bottom-1 h-1 w-1 rounded-full bg-accent -translate-x-1/2 transition-all duration-500 ${
                                isActive
                                  ? "opacity-100 scale-100"
                                  : "opacity-0 scale-0"
                              }`}
                            />
                          </>
                        )}
                      </NavLink>
                    </li>
                  ),
              )}
            </ul>
          </div>
          <div className=" flex ">
            {authStatus && (
              <div className="pl-6 border-l border-border-subtle">
                <LogoutBtn />
              </div>
            )}
          </div>
          <ThemeBtn />
        </nav>
      </Container>
    </header>
  );
}

export default Header;
