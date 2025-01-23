import React, { Dispatch, SetStateAction, useState } from "react";
import CheckBox from "@/components/OrderPage/CheckBoxesBlock/components/Checkbox";
import privateHousePng from "./icons/private-house.png";

interface Props {
  t: (text: string, defaultText?: string) => string;
  isPrivateHouse?: boolean;
  setIsPrivateHouse?: Dispatch<SetStateAction<boolean>>;
}

const PrivateHouse = ({ t, isPrivateHouse, setIsPrivateHouse }: Props) => {
  return (
    <div className="mt-2">
      <CheckBox
        isCentral
        icon={privateHousePng}
        title={"title-private-house-checkbox"}
        price={"x1.3"}
        setCheck={setIsPrivateHouse}
        checked={isPrivateHouse}
        t={t}
      />
    </div>
  );
};

export default PrivateHouse;
