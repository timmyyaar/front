import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { TBlog, TranslateFunction } from "@/types";
import { LeftArrow } from "@/components/common/Slider/icons/LeftArrow";
import useOverflow from "@/hooks/useOverflow";

interface BlogCardProps {
  blog: TBlog;
  t: TranslateFunction;
}

export default function BlogCard({ blog, t }: BlogCardProps) {
  const router = useRouter();
  const { lang } = useParams();
  const searchParams = useSearchParams();

  const { isOverflowing, ref: tagRef } = useOverflow();

  const translatedBlogTitle = t(`blog_${blog.key}_title`, blog.title);
  const translatedBlogText = t(`blog_${blog.key}_text`, blog.text);
  const translatedBlogTag = t(
    `blogs_page_tag_${blog.category.toLowerCase().replaceAll(" ", "_")}`
  );

  return (
    <div
      className="flex flex-col bg-white rounded-3xl p-6 gap-4 hover:shadow-md cursor-pointer transition-all"
      onClick={() => {
        router.push(`/${lang}/blogs/${blog.key}?${searchParams.toString()}`);
      }}
    >
      <img
        src={blog.main_image}
        alt={translatedBlogTitle}
        className="rounded-xl"
      />
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold line-clamp-2">
          {translatedBlogTitle}
        </div>
        <span className="line-clamp-3 text-ellipsis">{translatedBlogText}</span>
        <div className="flex gap-2 items-center">
          <div
            className="bg-gray-extra-light rounded-full py-3.5 px-5 whitespace-nowrap overflow-hidden text-ellipsis"
            ref={tagRef}
            {...(isOverflowing && {
              title: translatedBlogTag,
            })}
          >
            {translatedBlogTag}
          </div>
          <span className="text-gray-lighter">{blog.date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-lighter">
            {blog.read_time} {t("blogs_page_minutes_to_read")}
          </span>
          <div className="w-7 h-7 rounded-full border border-solid border-gray-dark flex items-center justify-center">
            <LeftArrow className="rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
}
