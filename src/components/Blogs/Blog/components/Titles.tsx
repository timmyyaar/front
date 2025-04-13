import { RefObject, useEffect, useState } from "react";
import { TranslateFunction } from "@/types";

interface TitlesProps {
  category: string;
  titles: string[];
  mainTitleRef: RefObject<HTMLDivElement | null>;
  titlesRefs: RefObject<{ [key: string]: HTMLSpanElement | null }>;
  t: TranslateFunction;
}

const BOTTOM_OFFSET = 10;

export default function Titles({
  category,
  titles,
  mainTitleRef,
  titlesRefs,
  t,
}: TitlesProps) {
  const [activeTitle, setActiveTitle] = useState<string>(titles[0]);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        Math.ceil(window.scrollY + window.innerHeight) >=
        document.documentElement.scrollHeight - BOTTOM_OFFSET;

      if (isAtBottom) {
        setActiveTitle(titles[titles.length - 1]);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const title = titles.find(
            (t) =>
              titlesRefs.current[t] === entry.target ||
              (t === titles[0] && mainTitleRef.current === entry.target),
          );

          if (entry.isIntersecting) {
            setActiveTitle(title || "");
          }
        });
      },
      {
        threshold: [0],
        rootMargin: "0px 0px -90% 0px",
      },
    );

    if (mainTitleRef.current) {
      observer.observe(mainTitleRef.current);
    }

    titles.forEach((title) => {
      if (titlesRefs.current[title]) {
        observer.observe(titlesRefs.current[title]);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [titles, mainTitleRef, titlesRefs]);

  const onTitleClick = (title: string, index: number) => {
    if (!index) {
      mainTitleRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      titlesRefs.current[title]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white p-6 flex flex-col gap-6 rounded-3xl min-w-1/3 lg:sticky top-4 h-max">
      <span className="font-semibold text-lg">
        {t(`blogs_page_tag_${category.toLowerCase().replaceAll(" ", "_")}`)}
      </span>
      <div className="flex flex-col gap-1">
        {titles.map((title, index) => (
          <div
            key={title}
            className="cursor-pointer hover:translate-x-1 transition-all"
            onClick={() => onTitleClick(title, index)}
          >
            <span
              className={`hover:opacity-90 transition-all ${activeTitle === title ? "text-primary" : "text-gray"}`}
            >
              {index + 1}. {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
