"use client";

import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";
import reactStringReplace from "react-string-replace";
import Image from "next/image";

import "./style.scss";

import calendarSvg from "./icons/calendar.svg";
import timeSvg from "./icons/time.svg";
import { Blog } from "@/types";
import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";
import { LocaleContext } from "@/components/Providers";
import { sendGAEvent } from "@/google-analytics";

const TITLE_REGEXP = /{([^}]*)}/g;

interface BlogsProps {
  blog: Blog;
}

function Blogs({ blog }: BlogsProps) {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  const { blogId } = useParams();

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "blog",
      label: "Blog page view",
      value: blogId,
    });
  }, []);

  return (
    <div className="blogs-wrapper">
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
    </div>
  );
}

export default Blogs;
