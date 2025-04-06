import React from "react";

export const Instruction = ({ title, cardsCount, t }: any) => {
  return (
    <>
      <div className="px-[10vw] mobile-none">
        <div
          className="grid gap-5 justify-center"
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
                className={`group hover:shadow-custom-light-dark hover:bg-light-dark active:bg-light-dark transition-all min-h-44
                  rounded-2xl bg-light flex flex-col justify-center relative`}
                key={el.step}
              >
                <div className="group-hover:invisible">
                  <div
                    className={`lg:mx-auto lg:mb-3 w-10 h-10 flex
                      justify-center items-center rounded-3xl bg-primary
                      text-light font-semibold`}
                  >
                    {el.step}
                  </div>
                  <div className="font-medium text-center">
                    <b className="px-2 whitespace-break-spaces">
                      {t(el.text)}
                    </b>
                  </div>
                </div>
                <div className="invisible group-hover:visible py-8 px-4 text-center absolute">
                  {t(`${title}_step_${el.step}_description`)}
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center gap-2 text-gray-dark mt-6">
          <div>{t("Hover over a stage to see detailed information")}</div>
        </div>
      </div>
      <div className="px-5-percents-mobile flex flex-col gap-4 mobile-only-flex">
        {[...new Array(cardsCount)].map((_, index) => (
          <div className="flex flex-col gap-4 items-center" key={index}>
            <div
              className={`w-10 h-10 flex justify-center items-center
                rounded-3xl bg-primary text-light font-semibold`}
            >
              {index + 1}
            </div>
            <span className="text-center">
              {t(`${title}_step_${index + 1}_description`)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
