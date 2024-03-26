import React, { FC, useState, useEffect } from "react";

import CheckBox from "./components/Checkbox";

import { getCheckBoxByMainService } from "./utils";
import airSvg from "./icons/air-purifier.svg";
import vacuumCleanerSvg from "./icons/vacuum-cleaner.svg";
import ownSuppliesSvg from "./icons/own-supplies.svg";
import "./style.scss";
import { OWN_SUPPLES_SERVICE_NAME } from "@/components/OrderPage/constants";

interface IProps {
  mainService: string;
  subServices: any[];
  setSubService: (service: any) => void;
  t: any;
}

export const CheckBoxesBlock: FC<IProps> = (props) => {
  const { mainService, subServices, setSubService, t } = props;
  const [dryCleaner, setDryCleaner] = useState(false);
  const [vacuumCleaner, setVacuumCleaner] = useState(false);
  const [ownSupplies, setOwnSupplies] = useState(false);

  const checkBoxes = getCheckBoxByMainService(mainService);

  useEffect(() => {
    if (dryCleaner) {
      setSubService((sS: any) => [
        ...sS,
        { title: "Dry_cleaner_sub_service", time: 60, price: 50 },
      ]);
    } else {
      setSubService((sS: any) =>
        sS.filter((el: any) => el.title !== "Dry_cleaner_sub_service")
      );
    }
  }, [dryCleaner]);

  useEffect(() => {
    if (vacuumCleaner) {
      setSubService((sS: any) => [
        ...sS,
        { title: "Vacuum_cleaner_sub_service", time: 0, price: 30 },
      ]);
    } else {
      setSubService((sS: any) =>
        sS.filter((el: any) => el.title !== "Vacuum_cleaner_sub_service")
      );
    }
  }, [vacuumCleaner]);

  useEffect(() => {
    if (ownSupplies) {
      setSubService((sS: any) => [
        ...sS,
        { title: OWN_SUPPLES_SERVICE_NAME, time: 0, price: -15 },
      ]);
    } else {
      setSubService((sS: any) =>
        sS.filter((el: any) => el.title !== OWN_SUPPLES_SERVICE_NAME)
      );
    }
  }, [ownSupplies]);

  useEffect(() => {
    const dryCleanerSubService = subServices.filter(
      (el) => el.title === "Dry_cleaner_sub_service"
    );
    const vacuumCleanerSubService = subServices.filter(
      (el) => el.title === "Vacuum_cleaner_sub_service"
    );
    const ownSuppliesSubService = subServices.filter(
      (el) => el.title === OWN_SUPPLES_SERVICE_NAME
    );

    if (!dryCleanerSubService.length) {
      setDryCleaner(false);
    }

    if (!vacuumCleanerSubService.length) {
      setVacuumCleaner(false);
    }

    if (!ownSuppliesSubService.length) {
      setOwnSupplies(false);
    }
  }, [subServices]);

  return checkBoxes ? (
    <div className="check-boxes-block-component">
      {checkBoxes.includes("dry") ? (
        <CheckBox
          icon={airSvg}
          title={"title-dry-cleaner-checkbox"}
          subTitle={"sub-text-dry-cleaner-checkbox"}
          price={"50 zl"}
          // oldPrice={'60 zl'}
          setCheck={setDryCleaner}
          checked={dryCleaner}
          t={t}
        />
      ) : null}
      {checkBoxes.includes("vacuum cleaner") ? (
        <CheckBox
          icon={vacuumCleanerSvg}
          title={"title-vacuum-cleaner-checkbox"}
          subTitle={"sub-text-vacuum-cleaner-checkbox"}
          price={"30 zl"}
          setCheck={setVacuumCleaner}
          checked={vacuumCleaner}
          t={t}
        />
      ) : null}
      {checkBoxes.includes("own supplies") ? (
        <CheckBox
          icon={ownSuppliesSvg}
          title={"title-own-supplies-checkbox"}
          subTitle={"sub-text-own-supplies-checkbox"}
          price={"-15 zl"}
          setCheck={setOwnSupplies}
          checked={ownSupplies}
          t={t}
        />
      ) : null}
    </div>
  ) : null;
};
