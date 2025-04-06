interface TagProps {
  tag: string;
  isActive: boolean;
  onClick: () => void;
}

export default function Tag({ tag, isActive, onClick }: TagProps) {
  return (
    <div
      className={`cursor-pointer bg-white px-8 py-5 rounded-full outline outline-solid hover:outline-primary
        transition-all ${isActive ? "outline-primary text-primary" : "outline-white"}`}
      onClick={onClick}
    >
      {tag}
    </div>
  );
}
