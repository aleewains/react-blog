import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";
import { ArrowRight } from "lucide-react";

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

  useEffect(() => {
    // service.getAllPosts should return the Appwrite Documents object
    service.getAllPosts([]).then((response) => {
      if (response) {
        // Appwrite returns documents in a 'documents' array, not 'rows'
        setPosts(response.rows);
      }
      setLoading(false);
    });
  }, []);

  if (!loading && posts.length === 0) {
    return (
      <div className="w-full py-24 text-center border-b border-border-subtle">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading text-text-primary mb-6">
              Refined perspectives <br /> on code & design.
            </h1>
            <p className="text-text-secondary mb-10 font-sans tracking-wide">
              Please sign in to access our exclusive collection of articles.
            </p>
            <button className="inline-flex items-center gap-2 text-accent font-medium hover:gap-4 transition-all border-b border-accent pb-1">
              Sign in to your account <ArrowRight size={18} />
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12">
      <Container>
        {/* Editorial Header Section */}
        <div className="mb-16 border-b border-border-default pb-8">
          <span className="text-accent text-xs uppercase tracking-[0.3em] font-semibold">
            The Journal
          </span>
          <h2 className="text-5xl md:text-6xl font-heading mt-4 text-text-primary">
            Latest Stories
          </h2>
        </div>

        {/* Improved Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="group">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
