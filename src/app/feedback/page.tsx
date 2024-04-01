import React from "react";

import { Providers } from "@/components/Providers";
import Feedback from "../../components/Feedback/index";

import { getServerSideProps } from "../action";
import { Header } from "@/components/Header";

export default async function FeedbackPage() {
  const locales = await getServerSideProps();

  return (
    <Providers>
      <Header locales={locales} />
      <main>
        <Feedback locales={locales} />
      </main>
    </Providers>
  );
}
