import service from "../appwrite/config";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface Post {
  $id: string;
  title: string;
  featuredImage: string;
  $createdAt?: string; // Appwrite provides this automatically
}

function PostCard({ $id, title, featuredImage, $createdAt }: Post) {
  // Format the date for a premium feel
  const date = $createdAt
    ? new Date($createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent Entry";

  return (
    <Link to={`/post/${$id}`} className="group block focus:outline-none">
      <article className="h-full flex flex-col space-y-4">
        {/* Image Container with Custom Ratio */}
        <div className="relative aspect-video overflow-hidden rounded-sm bg-bg-muted">
          <img
            src={service.getFileView(featuredImage)} // Changed View to Preview for better performance
            alt={title}
            className="
              h-full w-full object-cover
              transition-all duration-700 ease-out
              group-hover:scale-110 group-hover:brightness-90
            "
          />
          {/* Subtle Overlay Icon */}
          <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <ArrowUpRight size={16} className="text-text-primary" />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 px-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">
              Perspective
            </span>
            <span className="h-[1px] w-8 bg-border-default"></span>
            <time className="text-[10px] uppercase tracking-[0.15em] text-text-muted">
              {date}
            </time>
          </div>

          <h2
            className="
            font-heading text-xl lg:text-2xl
            text-text-primary leading-[1.2]
            group-hover:text-accent transition-colors duration-300
            line-clamp-2
          "
          >
            {title}
          </h2>

          <div className="mt-auto pt-4 flex items-center text-[11px] font-sans font-medium uppercase tracking-widest text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Read Article
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
