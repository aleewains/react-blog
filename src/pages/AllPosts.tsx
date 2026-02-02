import { useEffect, useState } from "react";
import appWriteService from "../appwrite/config";
import { PostCard, Container } from "../components";

interface Post {
  $id: string;
  title: string;
  slug: string;
  featuredImage: string;
  $createdAt?: string;
  // Add other fields as needed
}

function AllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appWriteService.getAllPosts([]).then((response) => {
      if (response) {
        // ensure response is not false
        const formattedPosts: Post[] = response.rows.map((row: any) => ({
          $id: row.$id,
          title: row.title || "Untitled",
          slug: row.slug || "",
          featuredImage: row.featuredImage || "",
          $createdAt: row.$createdAt,
        }));
        setPosts(formattedPosts);
      } else {
        setPosts([]); // in case response is false
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-accent border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-24 text-center">
        <Container>
          <h1 className="text-3xl font-heading text-text-muted">
            The archive is currently empty.
          </h1>
          <p className="mt-4 text-text-muted/60 font-sans italic">
            Check back soon for new entries.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12 min-h-screen bg-bg-primary">
      <Container>
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border-subtle pb-6">
          <div>
            <h1 className="text-4xl font-heading text-text-primary">
              All Entries
            </h1>
            <p className="text-text-secondary mt-2 font-sans">
              Exploring the intersection of technology and aesthetic.
            </p>
          </div>
          <div className="text-sm text-text-muted mt-4 md:mt-0 font-medium tracking-widest uppercase">
            {posts.length} {posts.length === 1 ? "Result" : "Results"}
          </div>
        </div>

        {/* Responsive Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
