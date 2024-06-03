import React from "react";
import Costs from "@/components/MainPage/AllServices/Modals/Costs/Costs";

import CostsMobile from "@/components/MainPage/AllServices/Modals/Costs/CostsMobile";
import { Cost } from "@/types";

interface CostsProps {
  costs: Cost[] | { [key: string]: Cost[] };
  t: (text: string, defaultText?: string) => string;
  isSubscription?: boolean;
  redirectPathname: string;
  description?: string;
}

function CostsIndex({
  costs,
  t,
  redirectPathname,
  isSubscription,
  description,
}: CostsProps) {
  return (
    <>
      <div className="mobile-none">
        <Costs
          costs={costs}
          t={t}
          redirectPathname={redirectPathname}
          isSubscription={isSubscription}
        />
      </div>
      <div className="mobile-only">
        <CostsMobile
          costs={costs}
          t={t}
          redirectPathname={redirectPathname}
          isSubscription={isSubscription}
          description={description}
        />
      </div>
    </>
  );
}

export default CostsIndex;
