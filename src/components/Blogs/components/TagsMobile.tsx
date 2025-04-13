import { Dispatch, SetStateAction, useState } from "react";
import { BLOG_TAGS } from "@/constants";
import Tag from "./Tag";
import { TranslateFunction } from "@/types";

interface TagsProps {
  tags: BLOG_TAGS[];
  activeTags: BLOG_TAGS[];
  setActiveTags: Dispatch<SetStateAction<BLOG_TAGS[]>>;
  onClose: () => void;
  t: TranslateFunction;
}

export default function TagsMobile({
  tags,
  activeTags,
  setActiveTags,
  onClose,
  t,
}: TagsProps) {
  const [selectedTags, setSelectedTags] = useState<BLOG_TAGS[]>(activeTags);

  const onAllTagClick = () => {
    setSelectedTags((prev) =>
      !prev.includes(BLOG_TAGS.ALL) ? [BLOG_TAGS.ALL] : prev,
    );
  };

  const onTagClick = (tag: BLOG_TAGS) => {
    setSelectedTags((prev) => {
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

  const onApplyTagsClick = () => {
    setActiveTags(selectedTags);
    onClose();
  };

  return (
    <div className="backdrop-blur-lg fixed flex items-center justify-center left-0 top-0 h-full w-full z-2">
      <div className="flex flex-col bg-light w-9/10 border border-solid border-gray-light rounded-xl animate-expandFromCenter">
        <Tag
          tag={BLOG_TAGS.ALL}
          isActive={selectedTags.includes(BLOG_TAGS.ALL)}
          onClick={onAllTagClick}
          t={t}
        />
        {tags.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            isActive={selectedTags.includes(tag)}
            onClick={() => onTagClick(tag)}
            t={t}
          />
        ))}
        <div
          className="text-center py-5 text-primary mt-auto text-lg font-semibold"
          onClick={onApplyTagsClick}
        >
          Apply
        </div>
      </div>
    </div>
  );
}
