import React, { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import reactStringReplace from "react-string-replace";
import { FIGURE_BRACKETS_REGEX } from "@/constants";

import { CheckSvg } from "./icons/check-fill";
import vector from "./icons/vector.svg";
import Button from "@/components/common/Button";

export const MainOffer: FC<any> = (props) => {
  const { t, handleScroll } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const advantages = [
    { title: "Clear", text: "space" },
    { title: "Professional", text: "service" },
    { title: "Fair", text: "price" },
  ];

  return (
    <>
      <div
        className={`_-translate-y-2/4 _-translate-x-2/4
          _absolute _top-2/4 _left-2/4 mobile-none`}
      >
        <Image src={vector} alt="" />
        <div className="_top-[6.5%] _left-[15%] _absolute">
          <div className="_text-7xl _text-dark _w-max _whitespace-pre-wrap">
            {reactStringReplace(
              t("main_page_title"),
              FIGURE_BRACKETS_REGEX,
              (match) => (
                <b className="main-title">{match}</b>
              ),
            )}
          </div>
          <div className="_mt-5 _flex _gap-5">
            {advantages.map((el) => (
              <div className="_flex _gap-3" key={el.title}>
                <CheckSvg />
                <div>
                  <div className="_font-semibold _text-dark">{t(el.title)}</div>
                  <div>{t(el.text)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="_mt-10 _flex _gap-6">
            <Button
              className="_py-6 _font-semibold _min-w-44"
              onClick={() =>
                router.push(`${pathname}/order?${searchParams.toString()}`)
              }
              title={t("Order online now")}
            />
            <button
              className={`_flex _justify-center _items-center hover:_bg-primary-dark active:_bg-primary-dark
                hover:_text-white active:_text-white _transition-all _min-w-24 _py-6
                _text-center _border-40 _bg-white _text-dark _font-semibold _cursor-pointer`}
              onClick={() => handleScroll("costs-block")}
            >
              {t("Pricing")}
            </button>
          </div>
        </div>
      </div>
      <div className="_px-[13vw] mobile-only _absolute _top-0 _w-full">
        <Button
          className="_mt-[20vh] _py-6 _font-semibold _h-12 _w-full _mb-2"
          onClick={() => router.push(`${pathname}/order?${searchParams.toString()}`)}
          title={t("Order")}
        />
        <button
          className={`_flex _justify-center _items-center _h-12 _w-full
            hover:_bg-primary-dark active:_bg-primary-dark hover:_text-white active:_text-white _transition-all _min-w-24
            _py-6 _text-center _border-40 _bg-white _text-dark _font-semibold _cursor-pointer`}
          onClick={() => handleScroll("costs-block")}
        >
          {t("Pricing")}
        </button>
      </div>
    </>
  );
};
