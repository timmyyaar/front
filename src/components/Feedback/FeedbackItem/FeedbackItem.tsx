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
  t: (text: string) => string;
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
    <div className="feedback-wrapper  _h-full _w-full _flex _flex-col _items-center">
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
      <div className="title _text-center _pb-6">
        {t("feedback_how_was_your_experience")}
        {orders.length > 1 ? <span className="_ml-1">({t(title)})</span> : ""}
      </div>
      <div
        className={`_flex _justify-center rating-wrapper ${
          orders.length > 1 ? "rating-multi-orders" : ""
        }`}
      >
        {icons.map(({ image, rating }) => (
          <Image
            src={image}
            alt={`${rating}`}
            className={`_cursor-pointer rating-image ${
              rating === selectedRating ? "selected" : ""
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
        className={`_py-10 _w-full ${
          orders.length > 1 ? "text-wrapper-multi" : "text-wrapper"
        }`}
      >
        <textarea
          className="_w-full feedback-text _h-full"
          placeholder={t("feedback_add_more_details")}
          value={feedback}
          onChange={({ target: { value } }) => setFeedback(value)}
          disabled={isSubmitLoading || wasSubmitted}
        />
      </div>
      <button
        className={`submit-feedback-button ${isSubmitLoading ? "loading" : ""}`}
        disabled={
          !selectedRating || isSubmitLoading || wasSubmitted || isOrdersLoading
        }
        onClick={onSendFeedback}
      >
        {t("submit")}
      </button>
    </div>
  );
}

export default FeedbackItem;
