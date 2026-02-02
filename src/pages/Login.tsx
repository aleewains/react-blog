import { Login as LoginComponent } from "../components";

function Login() {
  return (
    <div className="grid min-h-[calc(100vh-64px)] w-full lg:grid-cols-2 overflow-hidden bg-bg-primary">
      {/* Left Column: The Form */}
      <div className="flex items-center justify-center p-8 md:p-16 lg:p-24">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-left-4 duration-700">
          <LoginComponent />
        </div>
      </div>

      {/* Right Column: The "Vibe" (Hidden on Mobile) */}
      <div className="hidden lg:relative lg:flex flex-col justify-between p-20 bg-bg-secondary border-l border-border-subtle overflow-hidden">
        {/* Background Image/Pattern */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
            alt="Minimalist Architecture"
            className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply"
          />
          {/* Elegant gold gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-bg-secondary via-transparent to-accent/5" />
        </div>

        {/* Top Text */}
        <div className="relative z-10">
          <span className="text-accent text-xs uppercase tracking-[0.4em] font-bold">
            Established 2024
          </span>
        </div>

        {/* Bottom Quote/Statement */}
        <div className="relative z-10">
          <h2 className="font-heading text-5xl xl:text-6xl text-text-primary leading-[1.1] mb-6">
            Refining the <br />
            Digital <span className="italic">Perspective.</span>
          </h2>
          <p className="text-text-secondary max-w-md font-sans leading-relaxed tracking-wide">
            Join a community of designers and developers committed to aesthetic
            excellence and technical precision.
          </p>
        </div>

        {/* Subtle Decorative Element */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

export default Login;
