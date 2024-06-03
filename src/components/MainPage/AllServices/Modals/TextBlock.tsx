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
      className={`_p-10 _border-40 _bg-light ${
        center ? "_col-span-1 lg:_col-span-2" : ""
      }`}
    >
      <div className="_text-2xl _mb-10 _text-center _font-semibold">
        <Writer text={t(title)} />
      </div>
      {inline ? (
        <div className="_flex-wrap lg:_flex-nowrap _flex _gap-2 _justify-between">
          {(items as string[][]).map((innerItems: string[]) => (
            <div>
              {innerItems.map((innerItem, index) => (
                <div
                  className="_flex before:_content-['\2022'] before:_inline-block before:_mr-3"
                  key={`${innerItem}-${index}`}
                >
                  <Writer text={t(innerItem)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="_flex _justify-center">
          <div className="_flex _flex-col _gap-2">
            {(items as string[]).map((item, index) => (
              <div
                className="_flex before:_content-['\2022'] before:_inline-block before:_mr-3"
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
