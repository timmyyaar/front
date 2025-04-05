import { Dispatch, SetStateAction } from "react";
import Tag from "./Tag";

interface TagsProps {
  tags: string[];
  activeTags: string[];
  setActiveTags: Dispatch<SetStateAction<string[]>>;
}

export default function Tags({ tags, activeTags, setActiveTags }: TagsProps) {
  const onAllTagClick = () => {
    setActiveTags((prev) => (!prev.includes("All") ? ["All"] : prev));
  };

  const onTagClick = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes("All")
        ? [tag]
        : prev.includes(tag)
          ? prev.filter((prevTag) => prevTag !== tag)
          : [...prev, tag],
    );
  };

  return (
    <div className="_flex _gap-2">
      <Tag
        tag="All"
        isActive={activeTags.includes("All")}
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
