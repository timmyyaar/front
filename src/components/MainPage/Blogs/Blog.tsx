import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TBlog } from "@/types";

interface BlogProps {
  blog: TBlog;
  t: (text: string, defaultValue: string) => string;
}

function Blog({ blog, t }: BlogProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onBlogClick = () => {
    router.push(`${pathname}/blogs/${blog.id}?${searchParams.toString()}`);
  };

  return (
    <div className="_p-2.5 _h-full _w-full">
      <div
        className="hover:_shadow-md _rounded-3xl _cursor-pointer _bg-light hover:_bg-light-dark active:_bg-light-dark _transition-all _p-4 _h-full _flex _flex-col"
        onClick={onBlogClick}
      >
        <img src={blog.main_image} alt="" />
        <div className="_flex _flex-col _flex-1">
          <div className="_font-semibold _truncate _pt-3.5 _pb-3">
            {t(`blogs_title_${blog.id}`, "Blog title")}
          </div>
          <div className="_border _border-solid _border-gray _text-gray-dark _rounded-full _mt-auto _px-5 _py-2 _whitespace-nowrap _w-max">
            {t(`blogs_category_${blog.id}`, "Blog description")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
