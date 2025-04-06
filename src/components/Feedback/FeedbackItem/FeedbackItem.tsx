"use client";

import React, { Dispatch, SetStateAction, useState } from "react";

import Image from "next/image";

import crySvg from "@/components/Feedback/icons/cry.svg";
import sadSvg from "@/components/Feedback/icons/sad.svg";
import neutralSvg from "@/components/Feedback/icons/neutral.svg";
import smileSvg from "@/components/Feedback/icons/smile.svg";
import happySvg from "@/components/Feedback/icons/happy.svg";

import { ModalRequest } from "@/components/common/ModalRequest";
import { Overlay } from "@/components/common/Overlay";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { sendGAEvent } from "@/google-analytics";
import { sendFeedback } from "@/components/Feedback/FeedbackItem/actions";
import Button from "@/components/common/Button";

const icons = [
  { image: crySvg, rating: 1 },
  { image: sadSvg, rating: 2 },
  { image: neutralSvg, rating: 3 },
  { image: smileSvg, rating: 4 },
  { image: happySvg, rating: 5 },
];

interface FeedbackItemProps {
  id: number;
  title: string;
  orders: { id: number; title: string }[];
  t: (text: string, defaultText?: string) => string;
  isOrdersLoading: boolean;
  setFinishedRating: Dispatch<SetStateAction<{ [key: string]: number }>>;
}

function FeedbackItem({
  id,
  title,
  orders,
  setFinishedRating,
  isOrdersLoading,
  t,
}: FeedbackItemProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [isFeedbackError, setIsFeedbackError] = useState<boolean>(false);
  const errorRef = useClickOutside(() => setIsFeedbackError(false));

  const onSendFeedback = async () => {
    try {
      setIsSubmitLoading(true);

      const sendFeedbackResponse = await sendFeedback(id, {
        feedback: feedback || "-",
        rating: selectedRating,
      });

      if (sendFeedbackResponse.isError) {
        setIsFeedbackError(true);

        return;
      }

      setWasSubmitted(true);
      setFinishedRating((prev: any) => ({ ...prev, [id]: selectedRating }));

      sendGAEvent({
        action: "send_feedback",
        category: "feedback",
        label: "Feedback has been sent",
        value: `Order id: ${id}, Feedback: ${
          feedback || "-"
        }, Rating: ${selectedRating}`,
      });
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
      {isFeedbackError && (
        <Overlay active={isFeedbackError}>
          <div ref={errorRef}>
            <ModalRequest
              title="Sorry! The feedback for this order was already submitted"
              onClose={() => setIsFeedbackError(false)}
            />
          </div>
        </Overlay>
      )}
      <div className="font-semibold text-center pb-6">
        {t("feedback_how_was_your_experience")}
        {orders.length > 1 ? <span className="ml-1">({t(title)})</span> : ""}
      </div>
      <div
        className={`flex justify-center ${
          orders.length > 1 ? "gap-2 lg:gap-4" : "gap-2 lg:gap-20"
        }`}
      >
        {icons.map(({ image, rating }) => (
          <Image
            src={image}
            alt={`${rating}`}
            className={`cursor-pointer transition-all duration-200 hover:scale-125 ${
              rating === selectedRating ? "scale-[1.3]" : ""
            }`}
            onClick={() => {
              if (!wasSubmitted) {
                setSelectedRating(rating);
              }
            }}
          />
        ))}
      </div>
      <div
        className={`py-10 w-full ${
          orders.length > 1 ? "h-72 flex-none lg:flex-1" : "flex-1"
        }`}
      >
        <textarea
          className={`w-full h-full border border-solid bg-light outline-0
            p-3.5 border-neutral-500 rounded-xl`}
          placeholder={t("feedback_add_more_details")}
          value={feedback}
          onChange={({ target: { value } }) => setFeedback(value)}
          disabled={isSubmitLoading || wasSubmitted}
        />
      </div>
      <Button
        className="w-72"
        isLoading={isSubmitLoading}
        disabled={
          !selectedRating || isSubmitLoading || wasSubmitted || isOrdersLoading
        }
        onClick={onSendFeedback}
        title={t("submit")}
      />
    </div>
  );
}

export default FeedbackItem;
