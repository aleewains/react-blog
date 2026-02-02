import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { login as authLogin } from "../../redux/authSlice";
import { Logo, Input, Button } from "../index";
import { LogIn, AlertCircle } from "lucide-react";

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const login = async (data: Inputs) => {
    setError("");
    setIsLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4">
      {/* Editorial Header */}
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-6">
          <Logo width="60px" />
        </div>
        <h1 className="font-heading text-4xl md:text-5xl text-text-primary tracking-tight">
          Welcome back.
        </h1>
        <p className="mt-4 text-text-secondary font-sans text-sm tracking-wide uppercase">
          Enter your details to access the journal
        </p>
      </div>

      <div className="w-full max-w-[440px] bg-bg-secondary rounded-2xl border border-border-default p-8 md:p-10 shadow-premium">
        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(login)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <Input
                label="Email Address"
                placeholder="name@example.com"
                type="email"
                className="bg-bg-primary/50"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-[11px] text-red-500 ml-1 uppercase tracking-tighter">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                className="bg-bg-primary/50"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <span className="text-[11px] text-red-500 ml-1 uppercase tracking-tighter">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-sm uppercase tracking-widest font-bold"
            isLoading={isLoading}
            leftIcon={!isLoading && <LogIn size={18} />}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-subtle text-center">
          <p className="text-sm text-text-muted">
            New to the platform?&nbsp;
            <Link
              to="/signup"
              className="text-accent font-semibold hover:text-accent-hover transition-colors underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
