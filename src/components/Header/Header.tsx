import { Link, NavLink } from "react-router-dom";
import { Container, LogoutBtn, Logo } from "../index";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/store";

function Header() {
  const authStatus = useSelector((state: RootState) => state.auth.status);

  // const navigate = useNavigate();

  const navItmes = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    { name: "Login", url: "/login", active: !authStatus },
    { name: "Signup", url: "/signup", active: !authStatus },
    { name: "All Posts", url: "/all-posts", active: authStatus },
    { name: "Add Post", url: "/add-post", active: authStatus },
  ];
  return (
    <header className="py-3 shadow bg-white">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto gap-1">
            {navItmes.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `px-6 py-2 rounded-full border transition-all duration-100 ease-in-out ${
                        isActive
                          ? "bg-gray-200 border-gray-400 shadow-sm" // Active State
                          : "bg-transparent border-transparent hover:bg-gray-100" // Inactive/Hover State
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                  {/* <button onClick={() => navigate(item.url)}>
                    {item.name}
                  </button> */}
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
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
