import { useEffect, useState, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
interface AuthProps {
  children: ReactNode;
  authentication: boolean;
}
//authentication = true - it means user needs to be logged in to see the children
function AuthLayout({ children, authentication = true }: AuthProps) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus: boolean = useSelector((state: any) => state.auth.status);
  useEffect(() => {
    //user is not authenticated
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, authentication, navigate]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
