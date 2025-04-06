import SliderStep from "@/components/common/Slider/SliderStep";
import Swiper from "@/components/common/Swiper";
import { TBlog } from "@/types";
import BlogCard from "@/components/Blogs/components/BlogCard";

interface BlogsProps {
  t: (text: string, defaultText?: string) => string;
  blogs: TBlog[];
}

function Blogs({ t, blogs }: BlogsProps) {
  return blogs.length > 0 ? (
    <div className="mb-14 lg:mx-24 lg:mb-0 px-5-percents-mobile" id="blog">
      <div className="main-title lg:mb-6">
        <span className="text-gradient">TYT {t("blogs_title")}</span>
      </div>
      <div className="mobile-none">
        <SliderStep
          elements={blogs.map((blog) => (
            <div className="p-2.5 h-full w-full">
              <BlogCard blog={blog} key={blog.id} />
            </div>
          ))}
          itemsPerPage={3}
        />
      </div>
      <div className="mobile-only">
        <Swiper
          elements={blogs.map((blog) => (
            <div className="p-2.5 h-full w-full">
              <BlogCard blog={blog} key={blog.id} />
            </div>
          ))}
        />
      </div>
    </div>
  ) : null;
}

export default Blogs;
