"use client";

import React, { useContext, useEffect, useState } from "react";

import searchSvg from "./icons/search.svg";
import { TBlog } from "@/types";
import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";
import { LocaleContext } from "@/components/Providers";
import { sendGAEvent } from "@/google-analytics";
import Input from "@/components/OrderPage/Summary/UserData/components/Input";
import Tags from "@/components/Blogs/components/Tags";

const TITLE_REGEXP = /{([^}]*)}/g;

interface BlogsProps {
  blogs: TBlog[];
}

function Blogs({ blogs }: BlogsProps) {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  const [activeTags, setActiveTags] = useState<string[]>(["All"]);

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "blogs",
      label: "Blogs page view",
      value: "blogs",
    });
  }, []);

  const tags = [...new Set(blogs.map(({ category }) => category))];

  return (
    <div className="_bg-primary-background">
      <>
        <div className="tw:pt-6 _px-4 lg:_px-48 lg:_py-9">
          <div className="_p-5 _text-7xl _font-black text-gradient _w-max">
            TYT Blog
          </div>
          <div className="_pl-5">
            A daily dose of valuable content from the specialists at Take Your
            Time
          </div>
          <div className="_w-full _flex _justify-center _pb-10 lg:_pb-15">
            <div className="_pt-5 lg:_pt-20 _w-full lg:_w-1/3">
              <Input isRound icon={searchSvg} placeholder="Search" />
            </div>
          </div>
          <div className="_mobile-none _pb-10">
            <Tags
              tags={tags}
              activeTags={activeTags}
              setActiveTags={setActiveTags}
            />
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
