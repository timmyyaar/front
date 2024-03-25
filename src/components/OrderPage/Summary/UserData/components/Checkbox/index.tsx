import React, { FC } from "react";
import Image from "next/image";

import checkSvg from "./icons/mingcute_check-fill.svg";
import "./style.scss";

export const CheckBox: FC<any> = ({ title, checked, setCheck, t, link }) => {
  return (
    <div className="check-boxes-component">
      <div
        className="check-box-wrapper _cursor-pointer"
        onClick={() => {
          if (!link) {
            setCheck((ch: boolean) => !ch);
          }
        }}
      >
        <div
          className="checked-icon-wrapper"
          onClick={() => {
            if (link) {
              setCheck((ch: boolean) => !ch);
            }
          }}
        >
          {checked ? (
            <div className="checked-icon">
              <Image src={checkSvg} alt="" />
            </div>
          ) : null}
        </div>
        <div className="content-wrapper-checkbox">
          {link ? (
            <a href={link} target="_blank">
              <div className="_whitespace-pre-line link">{t(title)}</div>
            </a>
          ) : (
            <div className="_whitespace-pre-line">{t(title)}</div>
          )}
        </div>
      </div>
    </div>
  );
};
