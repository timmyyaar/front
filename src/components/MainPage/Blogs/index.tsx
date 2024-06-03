import BlogItem from "@/components/MainPage/Blogs/Blog";
import SliderStep from "@/components/common/Slider/SliderStep";
import Swiper from "@/components/common/Swiper";
import { Blog } from "@/types";

interface BlogsProps {
  t: (text: string, defaultText?: string) => string;
  blogs: Blog[];
}

function Blogs({ t, blogs }: BlogsProps) {
  return blogs.length > 0 ? (
    <div className="_mb-14 lg:_mx-24 lg:_mb-0 _px-5-percents-mobile" id="blog">
      <div className="_main-title _mb-8">TYT {t("blogs_title")}</div>
      <div className="mobile-none">
        <SliderStep
          elements={blogs.map((blog) => (
            <BlogItem blog={blog} key={blog.id} t={t} />
          ))}
          itemsPerPage={3}
        />
      </div>
      <div className="mobile-only">
        <Swiper
          elements={blogs.map((blog) => (
            <BlogItem blog={blog} key={blog.id} t={t} />
          ))}
        />
      </div>
    </div>
  ) : null;
}

export default Blogs;
