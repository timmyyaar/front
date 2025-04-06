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
    <div className="mb-14 lg:mb-0 flex justify-center px-5-percents-mobile lg:px-24">
      <div
        className={`white-layout relative py-10 w-full rounded-3xl bg-light
          overflow-hidden transition-all duration-300`}
      >
        <div className="main-title lg:mb-8 flex justify-center">
          <span className="text-gradient">{t("Order cleaning today")}</span>
        </div>
        <div className="flex justify-center">
          <Image src={calendaPng} alt="Calendar" width="187" height="187" />
        </div>
        <div
          className={`hidden lg:block absolute -left-full bottom-4 pl-4
            transition-all duration-2000 ${
              hover ? "man-icon-wrapper-animated" : ""
            }`}
        >
          <Image src={boyPng} alt="Boy" height="360" />
        </div>
        <div
          className={`hidden lg:block absolute -right-full bottom-4
            transition-all duration-2000 ${
              hover ? "woman-icon-wrapper-animated" : ""
            }`}
        >
          <Image src={girlPng} alt="Girl" height="360" />
        </div>
        <div className="flex justify-center">
          <Button
            className="w-72 mt-8"
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
