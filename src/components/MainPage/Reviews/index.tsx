import { useMemo } from "react";
import ReviewItem from "./ReviewItem";
import SliderInfinite from "@/components/common/Slider/SliderInfinite";
import Swiper from "@/components/common/Swiper";
import { Review } from "@/components/MainPage/Reviews/types";

const GOOGLE_REVIEW_REDIRECT_LINK = "https://g.page/r/CW4tBwhrljwjEBI/review";

const WHAT_CLIENTS_SAY_KEY = "what_clients_say";
const LEAVE_YOUR_REVIEW_KEY = "leave_your_review";

interface Props {
  t: (text: string, defaultText?: string) => string;
  reviews: Review[];
}

const Reviews = ({ t, reviews }: Props) => {
  const visibleReviews = useMemo(
    () => reviews.filter(({ visible }) => visible),
    [reviews],
  );

  return reviews.length ? (
    <section className="px-5-percents-mobile lg:px-24 mb-14 lg:mb-0">
      <section className="main-title">
        <span className="text-gradient">{t(WHAT_CLIENTS_SAY_KEY)}</span>
      </section>
      <section className="py-8 mobile-none">
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
      <section className="flex justify-center">
        <a
          className="w-1/2 lg:w-1/4 bg-primary hover:bg-primary-dark active:bg-primary-dark text-white px-6 py-4 transition-all text-center font-medium rounded-40-px cursor-pointer"
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
