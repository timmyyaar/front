import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import boyPng from "@/assets/icons/main-cleaners/boy.png";
import girlPng from "@/assets/icons/main-cleaners/girl.png";
import Man from "./icons/Man.svg";
import Women from "./icons/Women.svg";
import calendaPng from "./icons/calendar.png";
import "./style.scss";
import Button from "@/components/common/Button";

export const Order = (props: any) => {
  const { t } = props;
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="_mb-14 lg:_mb-0 _flex _justify-center _px-5-percents-mobile lg:_px-24">
      <div
        className={`white-layout _relative _py-10 _w-full _rounded-3xl _bg-light
          _overflow-hidden _transition-all _duration-300`}
      >
        <div className="_main-title lg:_mb-8 _flex _justify-center">
          <span className="text-gradient">{t("Order cleaning today")}</span>
        </div>
        <div className="_flex _justify-center">
          <Image src={calendaPng} alt="Calendar" width="187" height="187" />
        </div>
        <div
          className={`_hidden lg:_block _absolute _-left-full _bottom-4 _pl-4
            _transition-all _duration-[2000ms] ${
              hover ? "man-icon-wrapper-animated" : ""
            }`}
        >
          <Image src={boyPng} alt="Boy" height="360" />
        </div>
        <div
          className={`_hidden lg:_block _absolute _-right-full _bottom-4
            _transition-all _duration-[2000ms] ${
              hover ? "woman-icon-wrapper-animated" : ""
            }`}
        >
          <Image src={girlPng} alt="Girl" height="360" />
        </div>
        <div className="_flex _justify-center">
          <Button
            className="_w-72 _mt-8"
            onClick={() =>
              router.push(`${pathname}/order?${searchParams.toString()}`)
            }
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            title={t("Order")}
          />
        </div>
      </div>
    </div>
  );
};
