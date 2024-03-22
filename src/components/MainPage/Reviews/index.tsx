import "./style.scss";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import ReviewItem from "./ReviewItem";
import SliderInfinite from "@/components/common/Slider/SliderInfinite";
import Swiper from "@/components/common/Swiper";
import { Review } from "@/components/MainPage/Reviews/types";
import { fetchReviews } from "./action";

const GOOGLE_REVIEW_REDIRECT_LINK = "https://g.page/r/CW4tBwhrljwjEBI/review";

const WHAT_CLIENTS_SAY_KEY = "what_clients_say";
const LEAVE_YOUR_REVIEW_KEY = "leave_your_review";

interface Props {
  t: (text: string) => string;
}

const Reviews = ({ t }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const getReviews = async () => {
    const reviewsResponse = await fetchReviews();

    setReviews(reviewsResponse);
  };

  useEffect(() => {
    getReviews();
  }, []);

  const visibleReviews = useMemo(
    () => reviews.filter(({ visible }) => visible),
    [reviews]
  );

  return reviews.length ? (
    <section className="reviews-wrapper">
      <section className="title _font-semibold">
        {t(WHAT_CLIENTS_SAY_KEY)}
      </section>
      <section className="slider-wrapper mobile-none">
        <SliderInfinite
          elements={visibleReviews.map((review) => (
            <ReviewItem key={review.id} review={review} t={t} />
          ))}
        />
      </section>
      <section className="mobile-only">
        <Swiper
          elements={visibleReviews.map((review) => (
            <ReviewItem key={review.id} review={review} t={t} />
          ))}
        />
      </section>
      <section className="_flex _justify-center">
        <a
          className="review-button _flex _justify-center _cursor-pointer"
          href={GOOGLE_REVIEW_REDIRECT_LINK}
          target="_blank"
        >
          {t(LEAVE_YOUR_REVIEW_KEY)}
        </a>
      </section>
    </section>
  ) : null;
};

export default Reviews;
