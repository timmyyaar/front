import Image from "next/image";
import starIcon from "@/components/MainPage/Reviews/icons/star.svg";
import { useState } from "react";
import { Review } from "@/components/MainPage/Reviews/types";

interface Props {
  t: (text: string, defaultText?: string) => string;
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
    <section className="h-64 bg-light rounded-xl lg:m-2.5 p-5 text-center flex flex-col w-full">
      <span
        ref={element => {
          setReviewItem(element);
        }}
        className="line-clamp-4 text-ellipsis"
        title={isEllipsis ? review.text : ""}
      >
        {reviewText}
      </span>
      <section className="mt-auto">
        <section className="flex justify-center">
          {Array.from({ length: 5 }).map((_, ratingIndex) => (
            <Image src={starIcon} alt="" key={ratingIndex} />
          ))}
        </section>
        <span className="text-2xl font-semibold">{review.name}</span>
      </section>
    </section>
  );
}

export default ReviewItem;
