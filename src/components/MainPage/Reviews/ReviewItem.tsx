import Image from "next/image";
import starIcon from "@/components/MainPage/Reviews/icons/star.svg";
import { useEffect, useRef, useState } from "react";
import { Review } from "@/components/MainPage/Reviews/types";

interface Props {
  t: (text: string) => string;
  review: Review;
}

function isEllipsisActive(element: HTMLSpanElement | null) {
  const { offsetHeight, scrollHeight } = element as HTMLSpanElement;

  return offsetHeight < scrollHeight;
}

function ReviewItem({ review, t }: Props) {
  const [reviewItem, setReviewItem] = useState<HTMLSpanElement | null>(null);

  const isEllipsis = reviewItem ? isEllipsisActive(reviewItem) : false;

  const reviewTextKey = `review_${review.id}`;
  const translatedReviewText = t(reviewTextKey);
  const reviewText =
    translatedReviewText === reviewTextKey ? review.text : translatedReviewText;

  return (
    <section className="review _p-5 _text-center _flex _flex-col _w-full">
      <span
        ref={(element) => setReviewItem(element)}
        className="four-lines-text"
        title={isEllipsis ? review.text : ""}
      >
        {reviewText}
      </span>
      <section className="_mt-auto">
        <section className="_flex _justify-center">
          {Array.from({ length: 5 }).map((_, ratingIndex) => (
            <Image src={starIcon} alt="" key={ratingIndex} />
          ))}
        </section>
        <span className="_text-2xl _font-semibold">{review.name}</span>
      </section>
    </section>
  );
}

export default ReviewItem;
