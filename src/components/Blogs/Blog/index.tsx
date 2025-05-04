"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useRef } from "react";
import reactStringReplace from "react-string-replace";

import { TBlog } from "@/types";
import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";
import { LocaleContext } from "@/components/Providers";
import { sendGAEvent } from "@/google-analytics";
import Titles from "./components/Titles";
import CalendarIcon from "@/components/Blogs/Blog/icons/CalendarIcon";
import TimeIcon from "@/components/Blogs/Blog/icons/TimeIcon";
import { LeftArrow } from "@/components/common/Slider/icons/LeftArrow";
import Button from "@/components/common/Button";
import { BLOG_TAGS, MAIN_CATEGORIES_URLS } from "@/constants";
import { ALL_SERVICE } from "@/components/OrderPage/constants";

const H2_REGEXP = /<h2>(.*?)<\/h2>/g;
const BOLD_REGEXP = /<b>(.*?)<\/b>/g;
const BULLET_REGEXP = /<bullet \/>/g;
const LINK_REGEXP = /<a>(.*?)<\/a>/g;

const DEFAULT_REDIRECT_OBJECT = {
  category: MAIN_CATEGORIES_URLS.GENERAL,
  text: "general cleaning",
  service: ALL_SERVICE.REGULAR,
};

const REDIRECT_BY_TAG = {
  [BLOG_TAGS.WINDOW_CLEANING]: {
    category: MAIN_CATEGORIES_URLS.SPECIAL,
    text: "windows cleaning",
    service: ALL_SERVICE.WINDOW,
  },
  [BLOG_TAGS.CLEANING_TIPS]: DEFAULT_REDIRECT_OBJECT,
  [BLOG_TAGS.GENERAL_CLEANING]: DEFAULT_REDIRECT_OBJECT,
  [BLOG_TAGS.DEEP_CLEANING]: {
    category: MAIN_CATEGORIES_URLS.GENERAL,
    text: "deep cleaning",
    service: ALL_SERVICE.DEEP,
  },
};

interface BlogsProps {
  blog: TBlog;
}

function Blog({ blog }: BlogsProps) {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);
  const router = useRouter();
  const { lang } = useParams();
  const searchParams = useSearchParams();

  const mainTitleRef = useRef<HTMLDivElement>(null);
  const titlesRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});

  const getReplacedText = (text: string) => {
    const replacedTextBullets = text.replaceAll(BULLET_REGEXP, "•  ");

    const replacedTextHeaders = reactStringReplace(
      replacedTextBullets,
      H2_REGEXP,
      (match) => (
        <h2
          key={match}
          className="font-semibold text-2xl"
          ref={(el) => {
            titlesRefs.current[match] = el;
          }}
        >
          {match}
        </h2>
      ),
    );

    const replacedTextLink = reactStringReplace(
      replacedTextHeaders,
      LINK_REGEXP,
      (match) => (
        <a
          key={match}
          href={process.env.NEXT_PUBLIC_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary"
        >
          {match}
        </a>
      ),
    );

    return reactStringReplace(replacedTextLink, BOLD_REGEXP, (match) => (
      <span key={match} className="font-semibold">
        {match}
      </span>
    ));
  };

  const getBlogTitles = (title: string, text: string) => {
    const matches = [...text.matchAll(H2_REGEXP)];

    return [
      title,
      ...matches.map((match) =>
        match[0].replace("<h2>", "").replace("</h2>", ""),
      ),
    ];
  };

  const redirectObject =
    REDIRECT_BY_TAG[blog.category] || DEFAULT_REDIRECT_OBJECT;

  const getUpdatedSearchParams = () => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("selectedService", redirectObject.service);

    return updatedSearchParams.toString();
  };

  const { blogId } = useParams();

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "blog",
      label: "Blog page view",
      value: blogId,
    });
  }, []);

  const translatedBlogTitle = t(`blog_${blog.key}_title`, blog.title);
  const translatedBlogText = t(`blog_${blog.key}_text`, blog.text);

  return (
    <div className="bg-primary-background">
      <div className="pt-6 px-4 lg:px-48 lg:py-9">
        <div
          className={`cursor-pointer flex items-center text-2xl font-semibold text-primary
            hover:text-primary-dark group pb-6 transition-all w-max`}
          onClick={() => {
            router.push(`/${lang}/blogs?${searchParams.toString()}`);
          }}
        >
          <div className="h-7 w-7 mr-3 cursor-pointer text-gray-dark group-hover:text-primary">
            <LeftArrow className="w-full h-full" />
          </div>
          {t("blogs_title")}
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <Titles
            category={blog.category}
            titles={getBlogTitles(translatedBlogTitle, translatedBlogText)}
            mainTitleRef={mainTitleRef}
            titlesRefs={titlesRefs}
            t={t}
          />
          <div className="whitespace-pre-wrap">
            <h1 className="font-semibold text-2xl mb-3" ref={mainTitleRef}>
              {translatedBlogTitle}
            </h1>
            <div className="flex gap-3 mb-5">
              <div className="py-3 px-4 bg-white rounded-full flex items-center justify-center whitespace-nowrap text-gray text-sm">
                <CalendarIcon className="mr-1" />
                {blog.date}
              </div>
              <div className="py-3 px-4 bg-white rounded-full flex items-center justify-center whitespace-nowrap text-gray text-sm">
                <TimeIcon className="mr-1" />
                {blog.read_time} {t("blogs_page_minutes")}
              </div>
            </div>
            <img
              alt={translatedBlogTitle}
              src={blog.main_image}
              className="w-full rounded-3xl mb-6"
            />
            {getReplacedText(translatedBlogText)}
            <Button
              title={t(
                `blogs_page_order_${redirectObject.text.replaceAll(" ", "_")}`,
              )}
              className="w-full mt-6"
              onClick={() => {
                router.push(
                  `/${lang}/order/${redirectObject.category}?${getUpdatedSearchParams()}`,
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Footer t={t} />
      </div>
    </div>
  );
}

export default Blog;
