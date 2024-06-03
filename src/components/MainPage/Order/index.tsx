import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import Man from "./icons/Man.svg";
import Women from "./icons/Women.svg";
import { Calendar } from "./Calendar";
import "./style.scss";
import Button from "@/components/common/Button";

export const Order = (props: any) => {
  const { t } = props;
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="_mb-14 lg:_mb-0 _flex _justify-center _px-5-percents-mobile lg:_px-24">
      <div
        className={`white-layout _relative _py-10 _w-full _rounded-3xl _bg-light
          _overflow-hidden _transition-all _duration-300`}
      >
        <div className="_main-title lg:_mb-8 _flex _justify-center">
          {t("Order cleaning today")}
        </div>
        <div className="_flex _justify-center">
          <Calendar />
        </div>
        <div
          className={`_hidden lg:_block _absolute _-left-full _top-[17%]
            _transition-all _duration-[2000ms] ${
              hover ? "man-icon-wrapper-animated" : ""
            }`}
        >
          <Image src={Man} alt="" />
        </div>
        <div
          className={`_hidden lg:_block _absolute _-right-full _top-[29%]
            _transition-all _duration-[2000ms] ${
              hover ? "woman-icon-wrapper-animated" : ""
            }`}
        >
          <Image src={Women} alt="" />
        </div>
        <div className="_flex _justify-center">
          <Button
            className="_w-72 _mt-8"
            onClick={() => router.push(`${pathname}/order`)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            title={t("Order")}
          />
        </div>
      </div>
    </div>
  );
};
