import React from "react";

import "./style.scss";

export const Instruction = ({ title, cardsCount, t }: any) => {
  return (
    <>
      <div className="instruction-component mobile-none">
        <div
          className="_grid _gap-5 _justify-center"
          style={{
            gridTemplateColumns: `repeat(${cardsCount}, 11.75rem)`,
          }}
        >
          {[...new Array(cardsCount)]
            .map((_, number) => ({
              step: number + 1,
              text: `${title}_step_${number + 1}_title`,
            }))
            .map((el, i) => (
              <div
                className="step-card _flex _flex-col _justify-center _relative"
                key={el.step}
              >
                <div className="un-hover-block">
                  <div className="step-number">{el.step}</div>
                  <div className="text-wrapper">
                    <b className="_px-2 _whitespace-break-spaces">
                      {t(el.text)}
                    </b>
                  </div>
                </div>
                <div className="hover-block _absolute">
                  {t(`${title}_step_${el.step}_description`)}
                </div>
              </div>
            ))}
        </div>
        <div
          className="_flex _justify-center _gap-2"
          style={{ marginTop: "24px", color: "#5C5C5C" }}
        >
          <div>{t("Hover over a stage to see detailed information")}</div>
        </div>
      </div>
      <div className="instruction-component _flex _flex-col _gap-4 mobile-only-flex">
        {[...new Array(cardsCount)].map((_, index) => (
          <div className="_flex _flex-col _gap-4 _items-center" key={index}>
            <div className="step-number">{index + 1}</div>
            <span className="_text-center">
              {t(`${title}_step_${index + 1}_description`)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
