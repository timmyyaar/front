import React from "react";

interface Props {
  active: boolean;
  children: React.ReactNode;
}

export const Overlay: React.FC<Props> = ({ active, children }) =>
  active ? (
    <div
      className={`_flex _items-center _justify-center _overflow-hidden
        _fixed _top-0 _left-0 _w-full _h-full _bg-black _bg-opacity-40 _z-50`}
    >
      {children}
    </div>
  ) : null;
