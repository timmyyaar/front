import { useContext } from "react";
import Image from "next/image";
import { PricesContext } from "@/components/Providers";
import ozonationIcon from "@/components/common/icons/services/ozonation.svg";
import { capitalizeFirstLetter } from "@/utils";

interface OzonationCostsProps {
  t: (text: string) => string;
}

function OzonationCosts({ t }: OzonationCostsProps) {
  const { prices } = useContext(PricesContext);

  return (
    <div className="costs-mobile-item _p-6 _grid _grid-cols-3 _gap-6">
      <div className="_flex _flex-col _gap-2">
        <div className="_text-center text-secondary _whitespace-nowrap">
          {capitalizeFirstLetter(t("up_to"))} 50 {t("m")}
          <sup>2</sup>
        </div>
        <div className="_flex _justify-center">
          <Image src={ozonationIcon} width="48" height="48" alt="Ozonation" />
        </div>
        <div className="cost-price _font-bold _text-center">
          {prices.ozonationSmallArea} {t("zl")}/{t("m")}
          <sup>2</sup>
        </div>
      </div>
      <div className="_flex _flex-col _gap-2">
        <div className="_text-center text-secondary _whitespace-nowrap">
          51-120 {t("m")}
          <sup>2</sup>
        </div>
        <div className="_flex _justify-center">
          <Image src={ozonationIcon} width="48" height="48" alt="Ozonation" />
        </div>
        <div className="cost-price _font-bold _text-center">
          {prices.ozonationMediumArea} {t("zl")}/{t("m")}
          <sup>2</sup>
        </div>
      </div>
      <div className="_flex _flex-col _gap-2">
        <div className="_text-center text-secondary _whitespace-nowrap">
          {">"} 120 {t("m")}
          <sup>2</sup>
        </div>
        <div className="_flex _justify-center">
          <Image src={ozonationIcon} width="48" height="48" alt="Ozonation" />
        </div>
        <div className="cost-price _font-bold _text-center">
          {prices.ozonationBigArea} {t("zl")}/{t("m")}
          <sup>2</sup>
        </div>
      </div>
    </div>
  );
}

export default OzonationCosts;
