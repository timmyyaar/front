"use client";

import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import reactStringReplace from "react-string-replace";
import Image from "next/image";
import request from "@/utils/request";

import "./style.scss";
import Loader from "@/components/common/Loader";

import calendarSvg from "./icons/calendar.svg";
import timeSvg from "./icons/time.svg";
import { Blog } from "@/types";
import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";
import { LocaleContext } from "@/components/Providers";

const TITLE_REGEXP = /{([^}]*)}/g;

function Blogs() {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isBlogLoading, setIsBlogLoading] = useState<boolean>(false);
  const [blogError, setBlogError] = useState<boolean>(false);

  const { blogId } = useParams();

  const getBlog = async () => {
    try {
      setIsBlogLoading(true);

      const blogResponse = await request({ url: `blogs/${blogId}` });

      setBlog(blogResponse as Blog);
    } catch (error) {
      setBlogError(true);
    } finally {
      setIsBlogLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, [blogId]);

  return (
    <div className="blogs-wrapper">
      <Loader isLoading={isBlogLoading} />
      {blogError && (
        <div className="blog-title text-center _mt-10">
          Sorry, the blog doesn't exist...
        </div>
      )}
      {!isBlogLoading && blog && (
        <>
          <div className="blog-wrapper">
            <div className="blog-title text-center">
              {t(`blogs_title_${blog.id}`)}
            </div>
            <div className="_flex _justify-center _gap-6 _my-6 blog-images-wrapper">
              <img src={blog.blog_image_one} alt="" className="blog-image" />
              <img src={blog.blog_image_two} alt="" className="blog-image" />
            </div>
            <div className="_px-6">
              <div className="_flex _gap-4 _mb-6">
                <div className="_flex _items-center _gap-2">
                  <Image src={calendarSvg} alt="" />
                  <span className="_font-semibold">{blog.date}</span>
                </div>
                <div className="_flex _items-center _gap-2">
                  <Image src={timeSvg} alt="" />
                  <span className="_font-semibold">
                    {blog.read_time} {t("blogs_time")}
                  </span>
                </div>
              </div>
              <div className="_whitespace-pre-wrap">
                {reactStringReplace(
                  t(`blogs_text_${blog.id}`),
                  TITLE_REGEXP,
                  (match) => (
                    <span className="_font-semibold">{match}</span>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="_flex _flex-col">
            <Footer t={t} />
          </div>
        </>
      )}
    </div>
  );
}

export default Blogs;
