import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";
import { ArrowRight, Lock } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Link } from "react-router-dom";

// 1. Define the single Post structure
interface Post {
  $id: string;
  title: string;
  content: string;
  featuredImage: string;
  status: string;
  userId: string;
}

function Home() {
  // 2. Set state to be an array of Post objects
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    // service.getAllPosts should return the Appwrite Documents object
    service.getAllPosts([]).then((response) => {
      if (response) {
        setPosts(response.rows);
      }
      setLoading(false);
    });
  }, []);

  if (!authStatus) {
    return (
      <div className="w-full min-h-[80vh] flex items-center bg-bg-primary">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-border-subtle bg-bg-secondary text-text-muted">
                <Lock size={14} className="text-accent" />
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  Member Access Only
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading text-text-primary leading-[0.9] tracking-tighter">
                Refined <br />
                <span className="italic font-serif text-accent">
                  perspectives
                </span>{" "}
                <br />
                on code.
              </h1>

              <p className="text-lg text-text-secondary max-w-md leading-relaxed font-sans">
                A curated digital space for those who appreciate the
                intersection of technical precision and aesthetic excellence.
              </p>

              <Link
                to="/login"
                className="inline-flex items-center gap-4 group bg-text-primary text-bg-primary px-8 py-4 rounded-full transition-all hover:bg-accent"
              >
                <span className="text-xs uppercase tracking-[0.2em] font-bold">
                  Enter The Studio
                </span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </div>

            {/* Visual Decoration for Logged Out State */}
            <div className="hidden lg:block relative aspect-square bg-bg-secondary rounded-2xl border border-border-subtle overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-accent via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-[15rem] text-bg-muted select-none">
                  P
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // 2. Logged In: The Content Feed
  return (
    <div className="w-full py-16">
      <Container>
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-accent"></div>
            <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold">
              The Journal
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-heading text-text-primary tracking-tight">
            Latest Stories
          </h2>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-video bg-bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="transition-transform duration-500 hover:-translate-y-2"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
