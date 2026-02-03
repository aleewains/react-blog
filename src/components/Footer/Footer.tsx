import { Link } from "react-router-dom";
import Logo from "../Logo";
import { Instagram, Twitter, Github, Linkedin } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-primary border-t border-border-subtle pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Mission Column */}
          <div className="md:col-span-12 row-start-2 lg:row-start-1 lg:col-span-5  space-y-8 justify-items-center lg:justify-items-start lg:justify-self-start  ">
            <div className="block">
              <Logo />
            </div>
            <p className="text-text-secondary text-center lg:text-left text-lg leading-relaxed max-w-lg">
              A curated space for digital craftsmen, exploring the intersection
              of
              <span className="text-text-primary font-medium">
                {" "}
                art, code, and perspective.
              </span>
            </p>
            <div className="flex gap-5 text-text-muted">
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-3 md:grid-cols-3 md:col-span-12 lg:col-span-7 gap-8 justify-items-start sm:justify-items-center">
            {/* Journal Column */}
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">
                Journal
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    Latest Entries
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    Popular Stories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    The Archive
                  </Link>
                </li>
              </ul>
            </div>

            {/* Studio Column */}
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">
                Studio
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    Affiliates
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legals Column */}
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">
                Legal
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-text-muted">
            &copy; {currentYear} Perspective Journal. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest text-text-muted">
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
