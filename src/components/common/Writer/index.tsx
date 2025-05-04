import React, { FC, Fragment } from "react";

interface Props {
  text: string;
  alignLeft?: boolean;
  whiteSpaceNormal?: boolean;
  className?: string;
}

export const Writer: FC<Props> = (props) => {
  const { text, alignLeft, whiteSpaceNormal, className } = props;

  return text.indexOf("\\n") === -1 ? (
    <div
      className={`whitespace-normal break-words ${
        alignLeft ? "text-left" : ""
      } ${className || ""}`}
    >
      {text}
    </div>
  ) : (
    <div className={className || ""}>
      {text.split("\\n ").map((line, i, arr) => (
        <Fragment key={line}>
          <div
            className={`${!whiteSpaceNormal ? "whitespace-nowrap" : ""} ${
              className || ""
            }`}
          >
            {line}
            {i < arr.length - 1 ? <br /> : null}
          </div>
        </Fragment>
      ))}
    </div>
  );
};
