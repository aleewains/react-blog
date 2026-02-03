import { SignUp as SignUpComponent } from "../components/index";

function SignUp() {
  return (
    <div className="grid min-h-[calc(100vh-64px)] w-full lg:grid-cols-2 overflow-hidden bg-bg-primary">
      {/* Left Column: The Image (The "Vision") */}
      <div className=" relative lg:relative flex lg:flex flex-col justify-between p-20 bg-bg-secondary border-r border-border-subtle overflow-hidden">
        {/* Background Image: Abstract & Inspiring */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519643381401-22c77e60520e?q=80&w=2070"
            alt="Mountainscape Minimalist"
            className="w-full h-full object-cover grayscale opacity-30 mix-blend-multiply"
          />
          {/* Subtle gold-tinted gradient */}
          <div className="absolute inset-0 bg-linear-to-bl from-accent/10 via-transparent to-bg-secondary" />
        </div>

        {/* Brand Tag */}
        <div className="relative z-10">
          <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold px-3 py-1 border border-accent/30 rounded-full">
            The Collective
          </span>
        </div>

        {/* Bottom Statement */}
        <div className="relative z-10">
          <h2 className="font-heading text-5xl xl:text-6xl text-text-primary leading-[1.1] mb-6">
            Your journey <br />
            starts <span className="italic text-accent">here.</span>
          </h2>
          <p className="text-text-secondary max-w-sm font-sans leading-relaxed tracking-wide text-lg">
            Create an account to save your favorite stories, interact with
            authors, and contribute to the journal.
          </p>
        </div>

        {/* Decorative Light Leak */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Right Column: The SignUp Form */}
      <div className="row-start-1 flex items-center justify-center p-8 md:p-16 lg:p-24">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-700">
          <SignUpComponent />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
