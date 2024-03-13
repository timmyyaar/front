import { useRef } from 'react';

export function useScrollToElement() {
  const targetElementRef = useRef(null);

  const scrollToElement = () => {
    if (targetElementRef.current) {
      window.scrollTo({
        // @ts-ignore
        top: targetElementRef.current.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return [scrollToElement, targetElementRef];
}
