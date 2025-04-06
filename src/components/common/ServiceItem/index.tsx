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
    className={`py-4 min-h-52 rounded-[1.25rem] bg-light w-full
      flex flex-col justify-between gap-5 h-full`}
  >
    <div className="text-center text-sm lg:text-lg font-semibold px-4">
      {title}
    </div>
    <div className="flex justify-center">
      <Image src={icon} alt="" width={96} height={96} />
    </div>
    <div
      className={`flex justify-center cursor-pointer hover:text-primary
        text-sm lg:text-base`}
    >
      <div
        className="flex gap-2 transition-all items-center"
        onClick={onClick}
      >
        <div className="text-center">{t("How it works")}</div>
        <div className="cursor-pointer">
          <Image src={moreDetailsPng} alt="" width="22" height="22" />
        </div>
      </div>
    </div>
  </div>
);
