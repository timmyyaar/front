import { useLayoutEffect, useRef, useState } from "react";

export default function useOverflow() {
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const checkOverflow = () => {
      const element = ref.current;
      if (!element) return;

      const hasOverflow = element.clientWidth < element.scrollWidth;
      setIsOverflowing(hasOverflow);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { isOverflowing, ref };
}
