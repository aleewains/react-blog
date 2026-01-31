import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appWriteService from "../../appwrite/config";
import { Button, Input, RTE, Select } from "../index";
import { type RootState } from "../../redux/store";

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
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm<PostFormData>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
        image: undefined,
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const submit = async (data: PostFormData): Promise<void> => {
    const basePayload = {
      title: data.title,
      slug: data.slug,
      content: data.content,
      status: data.status,
    };

    if (post) {
      //getting new image and upload into storage this will return a fileid
      const file =
        data.image && data.image[0]
          ? await appWriteService.uploadFile(data.image[0])
          : null;
      //deleting old image file
      if (file) {
        await appWriteService.deleteFile(post.featuredImage);
      }

      const payload: Partial<Post> = {
        ...basePayload,
        featuredImage: file ? file.$id : post.featuredImage,
      };
      // updating the post
      const dbPost = await appWriteService.updatePost(post.$id, payload);
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file =
        data.image && data.image[0]
          ? await appWriteService.uploadFile(data.image[0])
          : null;

      if (file) {
        const fileId = file.$id;
        // data.featuredImage = fileId;
        // we cannot simply spread ...data because it contains the image property which is a FileList. Appwrite's database service would reject that.

        const payload = {
          ...basePayload,
          featuredImage: fileId,
          userId: userData.$id,
        };
        const dbPost = await appWriteService.createPost(payload);
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  //slug Transform
  const slugTransform = useCallback((value: string) => {
    // if (value && typeof value === "string ") {
    if (value) {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-") // Replace anything NOT a letter, number, or space
        .replace(/\s/g, "-");
    }
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
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value || ""), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appWriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
