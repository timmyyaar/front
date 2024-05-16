"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import "./style.scss";

import FeedbackItem from "@/components/Feedback/FeedbackItem/FeedbackItem";
import { useLocales } from "@/hooks/useLocales";
import FinishedFeedback from "@/components/Feedback/FinishedFeedback/FinishedFeedback";
import { LocaleContext } from "@/components/Providers";
import { sendGAEvent } from "@/google-analytics";
import {getOrdersByIds} from "@/components/Feedback/actions";

function Feedback() {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  const router = useRouter();
  const { lang } = useParams();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [finishedRating, setFinishedRating] = useState<{
    [key: string]: number;
  }>({});
  const [error, setError] = useState<boolean>(false);
  const [isOrdersLoading, setIsOrdersLoading] = useState<boolean>(false);

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "feedback",
      label: "Feedback page view",
      value: "feedback",
    });
  }, []);

  const ordersSearch = searchParams.get("orders");
  const decryptedOrders = atob(ordersSearch as string);

  const getClientOrders = async (ids: string) => {
    setIsOrdersLoading(true);

    const ordersResponse = await getOrdersByIds(ids)

    setFinishedRating(
      ordersResponse.reduce(
        (
          result: { [key: string]: number },
          { id, rating }: { id: number; rating: number }
        ) => ({
          ...result,
          [id]: rating || 0,
        }),
        {}
      )
    );

    setIsOrdersLoading(false);
  };

  useEffect(() => {
    if (!decryptedOrders) {
      router.push(`/${lang}`);
    }

    try {
      const parsedOrders = JSON.parse(decryptedOrders);

      if (parsedOrders.every(({ id }: { id: number }) => id)) {
        setOrders(parsedOrders);
        setFinishedRating(
          parsedOrders.reduce(
            (result: { [key: string]: number }, { id }: { id: number }) => ({
              ...result,
              [id]: 0,
            }),
            {}
          )
        );

        getClientOrders(
          parsedOrders.map(({ id }: { id: number }) => id).join(",")
        );
      } else {
        setError(true);
      }
    } catch {
      router.push(`/${lang}`);
    }
  }, [decryptedOrders]);

  const finishedRatingEntries = Object.entries(finishedRating);
  const isFeedbackFinished =
    finishedRatingEntries.length > 0 &&
    finishedRatingEntries.every(([id, rating]) => id && rating);

  return error ? (
    <div>No orders found!</div>
  ) : isFeedbackFinished ? (
    <FinishedFeedback finishedRating={finishedRating} t={t} />
  ) : (
    <div
      className={`_flex feedbacks-wrapper _gap-10 ${
        orders.length > 1 ? "multi-feedbacks-wrapper" : "_h-screen"
      }`}
    >
      {orders.map(({ id, title }) => (
        <FeedbackItem
          id={id}
          title={title}
          orders={orders}
          setFinishedRating={setFinishedRating}
          isOrdersLoading={isOrdersLoading}
          t={t}
        />
      ))}
    </div>
  );
}

export default Feedback;
