import { useParams, usePathname, useRouter } from "next/navigation";
import { Blog } from "@/types";

interface BlogProps {
  blog: Blog;
  t: (text: string) => string;
}

function Blog({ blog, t }: BlogProps) {
  const pathname = usePathname();
  const router = useRouter();

  const onBlogClick = () => {
    router.push(`${pathname}/blogs/${blog.id}`);
  };

  return (
    <div className="_p-2.5 _h-full _w-full">
      <div className="blog _p-4 _h-full _flex _flex-col" onClick={onBlogClick}>
        <img src={blog.main_image} alt="" />
        <div className="_flex _flex-col _flex-1">
          <div className="_font-semibold blog-title _truncate _pt-3.5 _pb-3">
            {t(`blogs_title_${blog.id}`)}
          </div>
          <div className="blog-category _mt-auto _px-5 _py-2 _whitespace-nowrap _w-max">
            {t(`blogs_category_${blog.id}`)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
