import { Link, NavLink } from "react-router-dom";
import { Container, LogoutBtn, Logo } from "../index";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

function Header() {
  const authStatus = useSelector((state: RootState) => state.auth.status);

  const navItems = [
    { name: "Home", url: "/", active: true },
    { name: "Login", url: "/login", active: !authStatus },
    { name: "Signup", url: "/signup", active: !authStatus },
    { name: "All Posts", url: "/all-posts", active: authStatus },
    { name: "Add Post", url: "/add-post", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur border-b border-border">
      <Container>
        <nav className="flex h-16 items-center">
          {/* Logo */}
          <Link to="/" className="mr-8 flex items-center">
            <Logo width="70px" />
          </Link>

          {/* Navigation */}
          <ul className="ml-auto flex items-center gap-1">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `
                        relative px-4 py-2 text-sm font-medium rounded-md
                        transition-colors duration-200
                        ${
                          isActive
                            ? "text-text-primary"
                            : "text-text-secondary hover:text-text-primary hover:bg-bg-muted"
                        }
                      `
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.name}
                          <span
                            className={`absolute left-0 -bottom-1 h-0.5 w-full bg-accent rounded-full transition-transform duration-300 ${
                              isActive ? "scale-x-100" : "scale-x-0"
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  </li>
                ),
            )}

            {authStatus && (
              <li className="ml-4">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
