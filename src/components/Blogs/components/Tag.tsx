import { BLOG_TAGS } from "@/constants";
import { TranslateFunction } from "@/types";

interface TagProps {
  tag: BLOG_TAGS;
  isActive: boolean;
  onClick: () => void;
  t: TranslateFunction;
}

export default function Tag({ tag, isActive, onClick, t }: TagProps) {
  return (
    <div
      className={`cursor-pointer whitespace-nowrap lg:bg-white px-2 border-b border-b-gray-light lg:border-0
       lg:px-8 py-3.5 lg:py-5 lg:rounded-full lg:outline lg:outline-solid hover:outline-primary
        transition-all ${isActive ? "lg:outline-primary text-primary" : "lg:outline-white"}`}
      onClick={onClick}
    >
      {t(`blogs_page_tag_${tag.toLowerCase().replaceAll(" ", "_")}`)}
    </div>
  );
}
