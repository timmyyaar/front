import React from "react";

export const Instruction = ({ title, cardsCount, t }: any) => {
  return (
    <>
      <div className="_px-[10vw] mobile-none">
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
                className={`_group hover:_shadow-custom-light-dark hover:_bg-light-dark active:_bg-light-dark _transition-all _min-h-44
                  _rounded-2xl _bg-light _flex _flex-col _justify-center _relative`}
                key={el.step}
              >
                <div className="group-hover:_invisible">
                  <div
                    className={`lg:_mx-auto lg:_mb-3 _w-10 _h-10 _flex
                      _justify-center _items-center _rounded-3xl _bg-primary
                      _text-light _font-semibold`}
                  >
                    {el.step}
                  </div>
                  <div className="_font-medium _text-center">
                    <b className="_px-2 _whitespace-break-spaces">
                      {t(el.text)}
                    </b>
                  </div>
                </div>
                <div className="_invisible group-hover:_visible _py-8 _px-4 _text-center _absolute">
                  {t(`${title}_step_${el.step}_description`)}
                </div>
              </div>
            ))}
        </div>
        <div className="_flex _justify-center _gap-2 _text-gray-dark _mt-6">
          <div>{t("Hover over a stage to see detailed information")}</div>
        </div>
      </div>
      <div className="_px-5-percents-mobile _flex _flex-col _gap-4 mobile-only-flex">
        {[...new Array(cardsCount)].map((_, index) => (
          <div className="_flex _flex-col _gap-4 _items-center" key={index}>
            <div
              className={`_w-10 _h-10 _flex _justify-center _items-center
                _rounded-3xl _bg-primary _text-light _font-semibold`}
            >
              {index + 1}
            </div>
            <span className="_text-center">
              {t(`${title}_step_${index + 1}_description`)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
