interface TagProps {
  tag: string;
  isActive: boolean;
  onClick: () => void;
}

export default function Tag({ tag, isActive, onClick }: TagProps) {
  return (
    <div
      className={`_cursor-pointer _bg-white _px-8 _py-5 _rounded-full ${isActive ? "_outline _outline-solid _outline-primary tw:text-primary" : ""}`}
      onClick={onClick}
    >
      {tag}
    </div>
  );
}
