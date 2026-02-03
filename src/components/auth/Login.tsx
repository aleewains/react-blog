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
    <div className="w-full">
      {/* Branding - Hidden on larger screens if your Page header already has it */}
      <div className="mb-8 lg:mb-12">
        <div className="lg:hidden flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="font-heading text-4xl md:text-5xl text-text-primary tracking-tight">
          Welcome back.
        </h1>
        <p className="mt-3 text-text-secondary font-sans text-sm tracking-wide">
          Enter your credentials to access the studio.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
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
              // Adding a subtle background to inputs to stand out on the white page
              className="bg-bg-secondary/50 border-border-subtle focus:bg-white transition-all"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-[10px] text-red-500 uppercase tracking-widest font-bold ml-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              className="bg-bg-secondary/50 border-border-subtle focus:bg-white transition-all"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="text-[10px] text-red-500 uppercase tracking-widest font-bold ml-1">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-accent/10"
          isLoading={isLoading}
          leftIcon={!isLoading && <LogIn size={16} />}
        >
          Sign In
        </Button>
      </form>

      <div className="mt-10 pt-8 border-t border-border-subtle">
        <p className="text-sm text-text-muted">
          New to the journal?&nbsp;
          <Link
            to="/signup"
            className="text-text-primary font-bold hover:text-accent transition-colors underline underline-offset-8 decoration-accent/30 hover:decoration-accent"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
