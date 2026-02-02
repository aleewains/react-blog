import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { login as authLogin } from "../../redux/authSlice";
import { Logo, Input, Button } from "../index";
import { UserPlus, AlertCircle } from "lucide-react";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const create = async (data: Inputs) => {
    setError("");
    setIsLoading(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(authLogin(currentUser));
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Editorial Header */}
      <div className="mb-10 lg:mb-12">
        <div className="lg:hidden flex justify-center mb-6">
          <Logo width="50px" />
        </div>
        <h1 className="font-heading text-4xl md:text-5xl text-text-primary tracking-tight">
          Begin your journey.
        </h1>
        <p className="mt-3 text-text-secondary font-sans text-sm tracking-wide">
          Join our community of refined perspectives.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
          <AlertCircle size={18} />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(create)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <Input
              label="Full Name"
              placeholder="E.g. Alexander Rossi"
              className="bg-bg-secondary/50 border-border-subtle focus:bg-white transition-all"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-[10px] text-red-500 uppercase tracking-widest font-bold ml-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <Input
              label="Email Address"
              placeholder="name@example.com"
              type="email"
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
              placeholder="Minimum 8 characters"
              className="bg-bg-secondary/50 border-border-subtle focus:bg-white transition-all"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
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
          className="w-full h-12 text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-accent/10 mt-2"
          isLoading={isLoading}
          leftIcon={!isLoading && <UserPlus size={16} />}
        >
          Create Account
        </Button>
      </form>

      <div className="mt-10 pt-8 border-t border-border-subtle">
        <p className="text-sm text-text-muted">
          Already a member?&nbsp;
          <Link
            to="/login"
            className="text-text-primary font-bold hover:text-accent transition-colors underline underline-offset-8 decoration-accent/30 hover:decoration-accent"
          >
            Sign In
          </Link>
        </p>

        <p className="mt-8 text-[10px] text-text-muted uppercase tracking-[0.2em] leading-relaxed max-w-xs">
          By joining, you agree to our terms of service and editorial
          guidelines.
        </p>
      </div>
    </div>
  );
}

export default SignUp;
