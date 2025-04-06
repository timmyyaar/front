import { Dispatch, SetStateAction } from "react";
import { ALL_TAG } from "../constants";
import Tag from "./Tag";

interface TagsProps {
  tags: string[];
  activeTags: string[];
  setActiveTags: Dispatch<SetStateAction<string[]>>;
}

export default function Tags({ tags, activeTags, setActiveTags }: TagsProps) {
  const onAllTagClick = () => {
    setActiveTags((prev) => (!prev.includes(ALL_TAG) ? [ALL_TAG] : prev));
  };

  const onTagClick = (tag: string) => {
    setActiveTags((prev) => {
      if (prev.includes(ALL_TAG)) {
        return [tag];
      }

      if (prev.includes(tag)) {
        const newTags = prev.filter((prevTag) => prevTag !== tag);

        if (!newTags.length) {
          return [ALL_TAG];
        }

        return newTags;
      }

      return [...prev, tag];
    });
  };

  return (
    <div className="flex gap-2">
      <Tag
        tag={ALL_TAG}
        isActive={activeTags.includes(ALL_TAG)}
        onClick={onAllTagClick}
      />
      {tags.map((tag) => (
        <Tag
          key={tag}
          tag={tag}
          isActive={activeTags.includes(tag)}
          onClick={() => onTagClick(tag)}
        />
      ))}
    </div>
  );
}
