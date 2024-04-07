"use client";

import { MainImage } from "@/components/common/MainImage";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { LocaleContext } from "@/components/Providers";
import { useLocales } from "@/hooks/useLocales";
import { MAIN_CATEGORIES } from "@/constants";

const MAIN_CATEGORIES_REVERSED = Object.fromEntries(
  Object.entries(MAIN_CATEGORIES).map(([key, value]) => [value, key])
);
const MAIN_CATEGORIES_OPTIONS = Object.values(MAIN_CATEGORIES);

function OrderCategory() {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <MainImage
      services={MAIN_CATEGORIES_OPTIONS}
      setService={(service: string) => {
        router.push(`${pathname}/${MAIN_CATEGORIES_REVERSED[service]}`);
      }}
      t={t}
    />
  );
}

export default OrderCategory;
