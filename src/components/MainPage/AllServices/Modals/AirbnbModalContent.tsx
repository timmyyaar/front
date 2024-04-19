import { Writer } from "@/components/common/Writer";
import React from "react";
import reactStringReplace from "react-string-replace";
import { FIGURE_BRACKETS_REGEX } from "@/constants";
import { TranslateFunction } from "@/types";

function AirbnbModalContent({ t }: { t: TranslateFunction }) {
  return (
    <div>
      <div className="wrapper-title-text">
        <div className="wrapper-title text-gradient">
          <Writer text={t("airbnb_title")} />
        </div>
        <div className="wrapper-text _mb-20">
          {reactStringReplace(
            t("airbnb_description"),
            FIGURE_BRACKETS_REGEX,
            (match) => (
              <b>{match}</b>
            )
          )}
        </div>
        <div className="wrapper-title text-gradient">
          <Writer text={t("stages_of_preparing")} />
        </div>
      </div>
      <div className="_flex _flex-row _justify-between airbnb-mobile _gap-5">
        {["Prepare", "Cleaning", "Sanitize", "Finish"].map((el, i) => (
          <div className="step-card">
            <div className="number-wrapper">
              <div className="number">{i + 1}</div>
            </div>
            <div className="name">{t(el + "_airbnb_title")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AirbnbModalContent;
