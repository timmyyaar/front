import { useContext } from "react";
import Image from "next/image";
import { PricesContext } from "@/components/Providers";
import ozonationIcon from "@/assets/icons/main-services/ozonation.png";
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
    <div className="rounded-xl bg-light p-6 grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-center text-gray-dark whitespace-nowrap">
          {capitalizeFirstLetter(t("up_to"))} 50 {t("m")}
          <sup>2</sup>
        </div>
        <div className="flex justify-center">
          <Image src={ozonationIcon} width="48" height="48" alt="Ozonation" />
        </div>
        <div className="text-2lx font-bold text-center">
          {transformedPrices.ozonationSmallArea} {t("zl")}/{t("m")}
          <sup>2</sup>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-center text-gray-dark whitespace-nowrap">
          51-120 {t("m")}
          <sup>2</sup>
        </div>
        <div className="flex justify-center">
          <Image src={ozonationIcon} width="48" height="48" alt="Ozonation" />
        </div>
        <div className="text-2lx font-bold text-center">
          {transformedPrices.ozonationMediumArea} {t("zl")}/{t("m")}
          <sup>2</sup>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-center text-gray-dark whitespace-nowrap">
          {">"} 120 {t("m")}
          <sup>2</sup>
        </div>
        <div className="flex justify-center">
          <Image src={ozonationIcon} width="48" height="48" alt="Ozonation" />
        </div>
        <div className="text-2lx font-bold text-center">
          {transformedPrices.ozonationBigArea} {t("zl")}/{t("m")}
          <sup>2</sup>
        </div>
      </div>
    </div>
  );
}

export default OzonationCosts;
