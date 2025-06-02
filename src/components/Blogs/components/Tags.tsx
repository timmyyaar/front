import { Dispatch, SetStateAction } from "react";
import { BLOG_TAGS } from "@/constants";
import Tag from "./Tag";
import { TranslateFunction } from "@/types";

interface TagsProps {
  tags: BLOG_TAGS[];
  activeTags: BLOG_TAGS[];
  setActiveTags: Dispatch<SetStateAction<BLOG_TAGS[]>>;
  t: TranslateFunction;
}

export default function Tags({
  tags,
  activeTags,
  setActiveTags,
  t,
}: TagsProps) {
  const onAllTagClick = () => {
    setActiveTags((prev) =>
      !prev.includes(BLOG_TAGS.ALL) ? [BLOG_TAGS.ALL] : prev,
    );
  };

  const onTagClick = (tag: BLOG_TAGS) => {
    setActiveTags((prev) => {
      if (prev.includes(BLOG_TAGS.ALL)) {
        return [tag];
      }

      if (prev.includes(tag)) {
        const newTags = prev.filter((prevTag) => prevTag !== tag);

        if (!newTags.length) {
          return [BLOG_TAGS.ALL];
        }

        return newTags;
      }

      return [...prev, tag];
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Tag
        tag={BLOG_TAGS.ALL}
        isActive={activeTags.includes(BLOG_TAGS.ALL)}
        onClick={onAllTagClick}
        t={t}
      />
      {tags.map((tag) => (
        <Tag
          key={tag}
          tag={tag}
          isActive={activeTags.includes(tag)}
          onClick={() => onTagClick(tag)}
          t={t}
        />
      ))}
    </div>
  );
}
