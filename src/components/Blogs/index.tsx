"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Image from "next/image";

import searchSvg from "./icons/search.svg";
import { TBlog } from "@/types";
import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";
import { LocaleContext } from "@/components/Providers";
import { sendGAEvent } from "@/google-analytics";
import Input from "@/components/OrderPage/Summary/UserData/components/Input";
import Tags from "@/components/Blogs/components/Tags";
import BlogCard from "@/components/Blogs/components/BlogCard";
import boyPng from "@/assets/icons/main-cleaners/boy.png";
import girlPng from "@/assets/icons/main-cleaners/girl.png";
import noResultsSvg from "./icons/no-results.svg";
import Button from "@/components/common/Button";
import TagsMobile from "@/components/Blogs/components/TagsMobile";
import { BLOG_TAGS } from "@/constants";

interface BlogsProps {
  blogs: TBlog[];
}

function Blogs({ blogs }: BlogsProps) {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  const [searchText, setSearchText] = useState<string>("");
  const [activeTags, setActiveTags] = useState<BLOG_TAGS[]>([BLOG_TAGS.ALL]);
  const [isTagModalOpened, setIsTagsModalOpened] = useState<boolean>(false);

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "blogs",
      label: "Blogs page view",
      value: "blogs",
    });
  }, []);

  const tags = [...new Set(blogs.map(({ category }) => category))];
  const filteredBlogs = blogs
    .filter(({ key }) =>
      t(`blog_${key}_text`).toLowerCase().includes(searchText.toLowerCase()),
    )
    .filter(
      ({ category }) =>
        activeTags.includes(BLOG_TAGS.ALL) || activeTags.includes(category),
    );

  const mobileTagButtonText = activeTags.includes(BLOG_TAGS.ALL)
    ? t("blogs_page_all_topics")
    : activeTags.length > 1
      ? `${activeTags[0]} + ${activeTags.length - 1}`
      : activeTags[0];

  return (
    <div className="bg-primary-background">
      <div className="pt-6 px-4 lg:px-48 lg:py-9">
        <div className="relative">
          <h1 className="p-5 text-4xl lg:text-7xl font-black text-gradient w-max">
            TYT {t("blogs_title")}
          </h1>
          <div className="pl-5">{t("blogs_page_description")}</div>
          <div className="w-full flex justify-center pb-10 lg:pb-15">
            <div className="flex flex-col gap-3.5 pt-5 lg:pt-20 w-full lg:w-1/3">
              <Input
                isRound
                icon={searchSvg}
                placeholder={t("Search")}
                value={searchText}
                onChange={({
                  target: { value },
                }: ChangeEvent<HTMLInputElement>) => setSearchText(value)}
              />
              <div className="mobile-only">
                <Button
                  title={mobileTagButtonText}
                  className="w-full"
                  onClick={() => setIsTagsModalOpened(true)}
                />
                {isTagModalOpened && (
                  <TagsMobile
                    tags={tags}
                    activeTags={activeTags}
                    setActiveTags={setActiveTags}
                    onClose={() => setIsTagsModalOpened(false)}
                    t={t}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="hidden xl:flex gap-4 absolute right-0 bottom-0">
            <Image
              src={boyPng}
              alt="Boy"
              height={300}
              priority
              className="rotate-y-180"
            />
            <Image src={girlPng} alt="Girl" height={300} priority />
          </div>
          <div className="hidden lg:flex xl:hidden gap-4 absolute right-0 bottom-0">
            <Image
              src={boyPng}
              alt="Boy"
              height={180}
              priority
              className="rotate-y-180"
            />
            <Image src={girlPng} alt="Girl" height={180} priority />
          </div>
        </div>
        <div className="mobile-none pb-10">
          <Tags
            tags={tags}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
            t={t}
          />
        </div>
        {Boolean(searchText.length > 0 && !filteredBlogs.length) ? (
          <div className="flex flex-col justify-center items-center text-center">
            <Image src={noResultsSvg} alt="No results" />
            {t("blogs_page_no_search_results_message")}
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.key} blog={blog} t={t} />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <Footer t={t} />
      </div>
    </div>
  );
}

export default Blogs;
