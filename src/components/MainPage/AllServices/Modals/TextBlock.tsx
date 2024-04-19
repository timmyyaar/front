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
    <div className={`wrapper-modal-reg ${center ? "cell-full-width" : ""}`}>
      <div className="wrapper-modal-reg-title">
        <Writer text={t(title)} />
      </div>
      {inline ? (
        <div className="wrapper-modal-reg-list-row _justify-between">
          {(items as string[][]).map((innerItems: string[]) => (
            <div>
              {innerItems.map((innerItem, index) => (
                <div
                  className="wrapper-modal-reg-item"
                  key={`${innerItem}-${index}`}
                >
                  <div className="wrapper-modal-reg-item-text">
                    <Writer text={t(innerItem)} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="_flex _justify-center">
          <div className="wrapper-modal-reg-list">
            {(items as string[]).map((item, index) => (
              <div className="wrapper-modal-reg-item" key={`${item}-${index}`}>
                <div className="wrapper-modal-reg-item-text">
                  <Writer text={t(item)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TextBlock;
