"use client";

import { MainImage } from "@/components/common/MainImage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { LocaleContext } from "@/components/Providers";
import { useLocales } from "@/hooks/useLocales";
import { MAIN_CATEGORIES, MAIN_CATEGORIES_URLS } from "@/constants";
import { ALL_SERVICE } from "@/components/OrderPage/constants";

const MAIN_CATEGORIES_REVERSED = Object.fromEntries(
  Object.entries(MAIN_CATEGORIES).map(([key, value]) => [value, key]),
);
const MAIN_CATEGORIES_OPTIONS = Object.values(MAIN_CATEGORIES);

const MAIN_CATEGORY_DEFAULT_SERVICE_BY_URL = {
  [MAIN_CATEGORIES_URLS.GENERAL]: ALL_SERVICE.REGULAR,
  [MAIN_CATEGORIES_URLS.HEALTHCARE]: ALL_SERVICE.DRY,
  [MAIN_CATEGORIES_URLS.SPECIAL]: ALL_SERVICE.WINDOW,
};

function OrderCategory() {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const city = searchParams.get("city");

  return (
    <div className="_flex-1">
      <MainImage
        services={MAIN_CATEGORIES_OPTIONS}
        setService={(service: string) => {
          const mainCategoryUrl = MAIN_CATEGORIES_REVERSED[service];

          router.push(
            `${pathname}/${mainCategoryUrl}?selectedService=${MAIN_CATEGORY_DEFAULT_SERVICE_BY_URL[mainCategoryUrl]}${city ? `&city=${city}` : ""}`,
          );
        }}
        t={t}
      />
    </div>
  );
}

export default OrderCategory;
