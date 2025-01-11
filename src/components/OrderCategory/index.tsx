"use client";

import { MainImage } from "@/components/common/MainImage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useContext } from "react";
import { LocaleContext, ServicesContext } from "@/components/Providers";
import { useLocales } from "@/hooks/useLocales";
import { CITIES, MAIN_CATEGORIES, MAIN_CATEGORIES_REVERSED } from "@/constants";
import { getServicesWithIconsByCity } from "@/utils";

const MAIN_CATEGORIES_OPTIONS = Object.values(MAIN_CATEGORIES);

function OrderCategory() {
  const { locales } = useContext(LocaleContext);
  const { mainServices } = useContext(ServicesContext);
  const { t } = useLocales(locales);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const city = searchParams.get("city") || CITIES.KRAKOW.name;

  return (
    <div className="_flex-1">
      <MainImage
        services={MAIN_CATEGORIES_OPTIONS}
        setService={(service: string) => {
          const mainCategoryUrl = MAIN_CATEGORIES_REVERSED[service];

          const filteredServices = getServicesWithIconsByCity({
            services: mainServices,
            city,
            serviceCategory: MAIN_CATEGORIES_REVERSED[service],
          });

          router.push(
            `${pathname}/${mainCategoryUrl}?selectedService=${filteredServices[0].title}${city ? `&city=${city}` : ""}`,
          );
        }}
        t={t}
      />
    </div>
  );
}

export default OrderCategory;
