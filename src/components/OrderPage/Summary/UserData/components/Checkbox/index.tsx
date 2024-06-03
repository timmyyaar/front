import React, { FC } from "react";
import Image from "next/image";

import checkSvg from "./icons/mingcute_check-fill.svg";

export const CheckBox: FC<any> = ({ title, checked, setCheck, t, link }) => {
  return (
    <div>
      <div
        className="_cursor-pointer _flex _items-center _gap-4"
        onClick={() => {
          if (!link) {
            setCheck((ch: boolean) => !ch);
          }
        }}
      >
        <div
          className="_flex _justify-center _items-center _w-11 _h-11 _rounded-full _bg-white"
          onClick={() => {
            if (link) {
              setCheck((ch: boolean) => !ch);
            }
          }}
        >
          {checked ? (
            <div className="_w-6 _h-6">
              <Image src={checkSvg} alt="" />
            </div>
          ) : null}
        </div>
        <div className="_flex _items-center _select-none _w-4/5">
          {link ? (
            <a href={link} target="_blank">
              <div className="_whitespace-pre-line hover:_text-primary active:_bg-primary">
                {t(title)}
              </div>
            </a>
          ) : (
            <div className="_whitespace-pre-line">{t(title)}</div>
          )}
        </div>
      </div>
    </div>
  );
};
