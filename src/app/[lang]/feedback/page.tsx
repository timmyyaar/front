import React from "react";

import Feedback from "../../../components/Feedback/index";
import { getLocales } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export default async function FeedbackPage() {
  const locales = await getLocales();

  return (
    <Providers locales={locales}>
      <main>
        <Header />
        <Feedback />
      </main>
    </Providers>
  );
}
