import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appWriteService from "../../appwrite/config";
import { Button, Input, RTE, Select } from "../index";
import { type RootState } from "../../redux/store";
import { ImagePlus, Send, Save } from "lucide-react";

interface PostFormData {
  title: string;
  slug: string;
  content: string;
  status: "active" | "inactive";
  image: FileList | undefined;
}

export interface Post {
  $id: string;
  title: string;
  slug: string;
  content: string;
  status: "active" | "inactive";
  featuredImage: string;
  userId: string;
}

interface PostFormProps {
  post?: Post;
}

function PostForm({ post }: PostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null); // State for live preview
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm<PostFormData>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  // Watch the image field to generate a preview URL
  const watchedImage = watch("image");

  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Clean up memory
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [watchedImage]);

  const submit = async (data: PostFormData) => {
    setIsSubmitting(true);
    try {
      const basePayload = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
      };

      if (post) {
        const file = data.image?.[0]
          ? await appWriteService.uploadFile(data.image[0])
          : null;
        if (file) await appWriteService.deleteFile(post.featuredImage);

        const dbPost = await appWriteService.updatePost(post.$id, {
          ...basePayload,
          featuredImage: file ? file.$id : post.featuredImage,
        });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        const file = data.image?.[0]
          ? await appWriteService.uploadFile(data.image[0])
          : null;
        if (file) {
          const dbPost = await appWriteService.createPost({
            ...basePayload,
            featuredImage: file.$id,
            userId: userData.$id,
          });
          if (dbPost) navigate(`/post/${dbPost.$id}`);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value: string) => {
    if (value)
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title || ""), {
          shouldValidate: true,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-6xl mx-auto pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <span className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold">
            Studio Mode
          </span>
          <h1 className="text-4xl font-heading text-text-primary mt-2">
            {post ? "Edit Masterpiece" : "New Perspective"}
          </h1>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button
            type="submit"
            isLoading={isSubmitting}
            variant={post ? "secondary" : "primary"}
            className="flex-1 md:flex-none px-8"
            leftIcon={post ? <Save size={18} /> : <Send size={18} />}
          >
            {post ? "Update Entry" : "Publish to Journal"}
          </Button>
        </div>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <section className="space-y-10">
          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-widest text-text-muted font-bold ml-1">
              Article Title
            </label>
            <input
              {...register("title", { required: true })}
              placeholder="Enter a captivating title..."
              className="w-full bg-transparent border-b border-border-default py-4 text-3xl font-heading focus:border-accent focus:outline-none transition-colors placeholder:text-text-muted/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase tracking-widest text-text-muted font-bold ml-1">
              URL Identifier (Slug)
            </label>
            <Input
              placeholder="post-url-handle"
              className="bg-bg-muted/50 border-none font-mono text-xs"
              {...register("slug", { required: true })}
              onInput={(e) =>
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                })
              }
            />
          </div>

          <div className="prose-editor">
            <label className="text-[11px] uppercase tracking-widest text-text-muted font-bold ml-1 mb-4 block">
              Body Content
            </label>
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </section>

        <aside className="space-y-8">
          <div className="sticky top-20 space-y-8 ">
            {/* Media Upload Box */}
            <div className="group relative rounded-2xl border-2 border-dashed border-border-default p-8 text-center hover:border-accent transition-colors bg-bg-secondary shadow-sm overflow-hidden">
              <Input
                label="Featured Image"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-20"
                {...register("image", { required: !post })}
              />

              {/* Conditional UI based on if an image exists */}
              {!preview && !post && (
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-accent-soft flex items-center justify-center text-accent">
                    <ImagePlus size={24} />
                  </div>
                  <div className="text-sm">
                    <span className="text-text-primary font-semibold block">
                      Click to upload image
                    </span>
                    <span className="text-text-muted text-xs">
                      High resolution recommended
                    </span>
                  </div>
                </div>
              )}

              {/* Display either the New Preview or the Existing Image */}
              {(preview || post) && (
                <div className="relative rounded-lg overflow-hidden border border-border-subtle shadow-premium z-10">
                  <img
                    src={
                      preview ||
                      appWriteService.getFileView(post?.featuredImage!)
                    }
                    alt="Preview"
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <ImagePlus size={14} /> Change Image
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-6 shadow-soft space-y-4">
              <Select
                options={["active", "inactive"]}
                label="Visibility Status"
                className="w-full"
                {...register("status", { required: true })}
              />
              <p className="text-[10px] text-text-muted leading-relaxed italic">
                Active posts are immediately visible to the public. Inactive
                posts are saved as drafts.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}

export default PostForm;
