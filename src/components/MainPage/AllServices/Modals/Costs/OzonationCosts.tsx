import { useContext } from "react";
import Image from "next/image";
import { PricesContext } from "@/components/Providers";
import ozonationIcon from "@/components/common/icons/services/ozonation.svg";
import { capitalizeFirstLetter, getTransformedPrices } from "@/utils";
import { useSearchParams } from "next/navigation";
import { CITIES } from "@/constants";

interface OzonationCostsProps {
  t: (text: string, defaultText?: string) => string;
}

function OzonationCosts({ t }: OzonationCostsProps) {
  const { prices } = useContext(PricesContext);
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || CITIES.KRAKOW.name;

  const transformedPrices = getTransformedPrices(prices, city);

  return (
    <div className="_rounded-xl _bg-light _p-6 _grid _grid-cols-3 _gap-6">
      <div className="_flex _flex-col _gap-2">
        <div className="_text-center _text-gray-dark _whitespace-nowrap">
          {capitalizeFirstLetter(t("up_to"))} 50 {t("m")}
          <sup>2</sup>
        </div>
        <div className="_flex _justify-center">
          <Image src={ozonationIcon} width="48" height="48" alt="Ozonation" />
        </div>
        <div className="_text-2lx _font-bold _text-center">
          {transformedPrices.ozonationSmallArea} {t("zl")}/{t("m")}
          <sup>2</sup>
        </div>
      </div>
      <div className="_flex _flex-col _gap-2">
        <div className="_text-center _text-gray-dark _whitespace-nowrap">
          51-120 {t("m")}
          <sup>2</sup>
        </div>
        <div className="_flex _justify-center">
          <Image src={ozonationIcon} width="48" height="48" alt="Ozonation" />
        </div>
        <div className="_text-2lx _font-bold _text-center">
          {transformedPrices.ozonationMediumArea} {t("zl")}/{t("m")}
          <sup>2</sup>
        </div>
      </div>
      <div className="_flex _flex-col _gap-2">
        <div className="_text-center _text-gray-dark _whitespace-nowrap">
          {">"} 120 {t("m")}
          <sup>2</sup>
        </div>
        <div className="_flex _justify-center">
          <Image src={ozonationIcon} width="48" height="48" alt="Ozonation" />
        </div>
        <div className="_text-2lx _font-bold _text-center">
          {transformedPrices.ozonationBigArea} {t("zl")}/{t("m")}
          <sup>2</sup>
        </div>
      </div>
    </div>
  );
}

export default OzonationCosts;
