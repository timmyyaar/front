import React, { FC } from "react";
import Image from "next/image";

import checkSvg from "./icons/mingcute_check-fill.svg";

export const CheckBox: FC<any> = ({ title, checked, setCheck, t, link }) => {
  return (
    <div>
      <div
        className="cursor-pointer flex items-center gap-4"
        onClick={() => {
          if (!link) {
            setCheck((ch: boolean) => !ch);
          }
        }}
      >
        <div
          className="flex justify-center items-center w-11 h-11 rounded-full bg-white"
          onClick={() => {
            if (link) {
              setCheck((ch: boolean) => !ch);
            }
          }}
        >
          {checked ? (
            <div className="w-6 h-6">
              <Image src={checkSvg} alt="" />
            </div>
          ) : null}
        </div>
        <div className="flex items-center select-none w-4/5">
          {link ? (
            <a href={link} target="_blank">
              <div className="whitespace-pre-line hover:text-primary active:bg-primary">
                {t(title)}
              </div>
            </a>
          ) : (
            <div className="whitespace-pre-line">{t(title)}</div>
          )}
        </div>
      </div>
    </div>
  );
};
