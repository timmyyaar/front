import React from "react";
import Image from "next/image";

import moreDetailsPng from "@/assets/icons/common/more-details.png";

interface Props {
  title: string;
  icon: any;
  t: any;
  onClick: () => void;
}

export const ServiceItem: React.FC<Props> = ({ title, icon, t, onClick }) => (
  <div
    className={`_py-4 _min-h-52 _rounded-2.5xl _bg-light _w-full
      _flex _flex-col _justify-between _gap-5 _h-full`}
  >
    <div className="_text-center _text-sm lg:_text-lg _font-semibold _px-4">
      {title}
    </div>
    <div className="_flex _justify-center">
      <Image src={icon} alt="" width={96} height={96} />
    </div>
    <div
      className={`_flex _justify-center _cursor-pointer hover:_text-primary
        _text-sm lg:_text-base`}
    >
      <div
        className="_flex _gap-2 _transition-all _items-center"
        onClick={onClick}
      >
        <div className="_text-center">{t("How it works")}</div>
        <div className="_cursor-pointer">
          <Image src={moreDetailsPng} alt="" width="22" height="22" />
        </div>
      </div>
    </div>
  </div>
);
