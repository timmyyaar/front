import React, { FC, useEffect } from "react";
import Image from "next/image";

import OzonSvg from "./icons/ozone-layer.svg";
import CleanSvg from "./icons/rectangle.svg";
import caretUpSvg from "./icons/caret-up.svg";
import { getAdditionalServices } from "./utils";
import "./style.scss";
interface IProps {
  mainService: string;
  setSecondService: (props: any) => void;
  t: any;
  children: any;
}

export { getAdditionalServices };

export const AddedMainService: FC<IProps> = (props) => {
  const { mainService, setSecondService, t, children } = props;
  const [addServiceList, setAddServiceList] = React.useState(false);
  const addService = getAdditionalServices(mainService);
  const isOzonation = addService === "ADD OZONATION SERVICE";

  const onClickSecondService = () => {
    setAddServiceList((sL) => !sL);
    setSecondService((s: any) => {
      if (s) {
        return "";
      } else {
        return isOzonation ? "Ozonation" : "Dry cleaning";
      }
    });
  };

  useEffect(() => {
    setAddServiceList(false);
  }, [mainService]);

  return addService ? (
    <div className="added-main-service-component">
      <div className="switch-component" onClick={onClickSecondService}>
        <div className="image-wrapper">
          <Image src={isOzonation ? OzonSvg : CleanSvg} alt="" />
        </div>
        <div className={`title ${addServiceList ? "title-active" : ""}`}>
          {t(addService)}
        </div>
        <div className={`icon ${addServiceList ? "" : "flipped-icon"}`}>
          <Image src={caretUpSvg} alt="" />
        </div>
      </div>
      {addServiceList ? (
        <div className="add-service-list-wrapper">{children}</div>
      ) : null}
    </div>
  ) : null;
};
