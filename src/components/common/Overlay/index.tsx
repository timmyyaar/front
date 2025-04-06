import React from "react";

interface Props {
  active: boolean;
  children: React.ReactNode;
}

export const Overlay: React.FC<Props> = ({ active, children }) =>
  active ? (
    <div
      className={`flex items-center justify-center overflow-hidden
        fixed top-0 left-0 w-full h-full bg-black/4 z-50`}
    >
      {children}
    </div>
  ) : null;
