import React, { useState, ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 bg-light rounded-2xl px-10 py-7
            shadow-md whitespace-normal left-1/2 transform -translate-x-1/2 mt-2 ${className}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};
