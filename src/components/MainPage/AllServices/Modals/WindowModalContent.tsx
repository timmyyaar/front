import { Writer } from "@/components/common/Writer";
import window0 from "@/components/MainPage/AllServices/Modals/images/0.png";
import window1 from "@/components/MainPage/AllServices/Modals/images/1.png";
import window2 from "@/components/MainPage/AllServices/Modals/images/2.png";
import window3 from "@/components/MainPage/AllServices/Modals/images/3.png";
import window4 from "@/components/MainPage/AllServices/Modals/images/4.png";
import window5 from "@/components/MainPage/AllServices/Modals/images/5.png";
import Image from "next/image";
import React from "react";
import { TranslateFunction } from "@/types";

function WindowModalContent({ t }: { t: TranslateFunction }) {
  return (
    <div className="wrapper-title-text">
      <div className="wrapper-title text-gradient">
        <Writer text={t("window_cleaning_title")} />
      </div>
      <div className="_grid _grid-cols-3 _gap-2">
        {[...new Array(6)].map((_, i) => {
          const windowImg = {
            0: window0,
            1: window1,
            2: window2,
            3: window3,
            4: window4,
            5: window5,
          };

          return (
            <div className="window-block">
              <div className="img-wrapper">
                <Image src={windowImg[i as 0 | 1 | 2 | 3 | 4 | 5]} alt="" />
              </div>
              <div className="title">
                <Writer
                  text={t("window_cleaning_description_" + (i + 1))}
                  key={"window_cleaning" + "_" + i}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WindowModalContent;
