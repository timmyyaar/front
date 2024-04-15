import "./style.scss";

import BlogItem from "@/components/MainPage/Blogs/Blog";
import SliderStep from "@/components/common/Slider/SliderStep";
import Swiper from "@/components/common/Swiper";
import request from "@/utils/request";
import { useEffect, useState } from "react";
import { Blog } from "@/types";

interface BlogsProps {
  t: (text: string) => string;
}

function Blogs({ t }: BlogsProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlogs = async () => {
    try {
      const blogsResponse = await request({ url: "blogs" });

      setBlogs(blogsResponse as Blog[]);
    } catch (error) {
      setBlogs([]);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return blogs.length > 0 ? (
    <div className="main-blogs-wrapper">
      <div className="title _mb-8 _font-semibold _text-center">
        TYT {t("blogs_title")}
      </div>
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
