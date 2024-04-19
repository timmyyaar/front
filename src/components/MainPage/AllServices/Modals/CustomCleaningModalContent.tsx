import { Writer } from "@/components/common/Writer";
import reactStringReplace from "react-string-replace";
import { FIGURE_BRACKETS_REGEX } from "@/constants";
import React from "react";

function CustomCleaningModalContent({ t }) {
  return (
    <div className="wrapper-title-text">
      <div className="wrapper-title text-gradient">
        <Writer text={t("custom_cleaning_title")} />
      </div>
      <div className="wrapper-text">
        {reactStringReplace(
          t("custom_cleaning_description"),
          FIGURE_BRACKETS_REGEX,
          (match) => (
            <b>{match}</b>
          )
        )}
      </div>
    </div>
  );
}

export default CustomCleaningModalContent;
