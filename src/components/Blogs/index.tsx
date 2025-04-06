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
import { ALL_TAG } from "@/components/Blogs/constants";
import boyPng from "@/assets/icons/main-cleaners/boy.png";
import girlPng from "@/assets/icons/main-cleaners/girl.png";

interface BlogsProps {
  blogs: TBlog[];
}

function Blogs({ blogs }: BlogsProps) {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  const [searchText, setSearchText] = useState<string>("");
  const [activeTags, setActiveTags] = useState<string[]>([ALL_TAG]);

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
    .filter(({ text }) => text.toLowerCase().includes(searchText.toLowerCase()))
    .filter(
      ({ category }) =>
        activeTags.includes(ALL_TAG) || activeTags.includes(category),
    );

  return (
    <div className="bg-primary-background">
      <div className="pt-6 px-4 lg:px-48 lg:py-9">
        <div className="relative">
          <div className="p-5 text-4xl lg:text-7xl font-black text-gradient w-max">
            TYT Blog
          </div>
          <div className="pl-5">
            A daily dose of valuable content from the specialists at Take Your
            Time
          </div>
          <div className="w-full flex justify-center pb-10 lg:pb-15">
            <div className="pt-5 lg:pt-20 w-full lg:w-1/3">
              <Input
                isRound
                icon={searchSvg}
                placeholder="Search"
                value={searchText}
                onChange={({
                  target: { value },
                }: ChangeEvent<HTMLInputElement>) => setSearchText(value)}
              />
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
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.key} blog={blog} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <Footer t={t} />
      </div>
    </div>
  );
}

export default Blogs;
