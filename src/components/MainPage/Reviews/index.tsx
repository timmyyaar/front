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
    [reviews]
  );

  return reviews.length ? (
    <section className="_px-5-percents-mobile lg:_px-24 _mb-14 lg:_mb-0">
      <section className="_main-title">
        {t(WHAT_CLIENTS_SAY_KEY)}
      </section>
      <section className="_py-8 mobile-none">
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
          className="_w-1/2 lg:_w-1/4 _bg-primary hover:_bg-primary-dark active:_bg-primary-dark _text-white _px-6 _py-4 _transition-all _text-center _font-medium _border-40 _cursor-pointer"
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
