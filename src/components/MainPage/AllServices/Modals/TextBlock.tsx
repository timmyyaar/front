import { Writer } from "@/components/common/Writer";
import React from "react";
import { TranslateFunction } from "@/types";

interface TextBlockProps {
  t: TranslateFunction;
  title: string;
  items: string[] | string[][];
  center?: boolean;
  inline?: boolean;
}

function TextBlock({ t, title, items, center, inline }: TextBlockProps) {
  return (
    <div
      className={`p-10 rounded-40-px bg-light ${
        center ? "col-span-1 lg:col-span-2" : ""
      }`}
    >
      <div className="text-2xl mb-10 text-center font-semibold">
        <Writer text={t(title)} />
      </div>
      {inline ? (
        <div className="flex-wrap lg:flex-nowrap flex gap-2 justify-between">
          {(items as string[][]).map((innerItems: string[]) => (
            <div>
              {innerItems.map((innerItem, index) => (
                <div
                  className="flex before:content-['\2022'] before:inline-block before:mr-3"
                  key={`${innerItem}-${index}`}
                >
                  <Writer text={t(innerItem)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col gap-2">
            {(items as string[]).map((item, index) => (
              <div
                className="flex before:content-['\2022'] before:inline-block before:mr-3"
                key={`${item}-${index}`}
              >
                <Writer text={t(item)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TextBlock;
