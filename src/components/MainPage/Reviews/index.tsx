import "./style.scss";
import { useEffect, useState } from "react";
import ReviewItem from "@/components/MainPage/Reviews/ReviewItem";
import SliderInfinite from "@/components/common/Slider/SliderInfinite";
import Swiper from "@/components/common/Swiper";
import { fetchReviews, Review } from "@/components/MainPage/Reviews/action";

const GOOGLE_REVIEW_REDIRECT_LINK = "https://g.page/r/CW4tBwhrljwjEBI/review";

const WHAT_CLIENTS_SAY_KEY = "what_clients_say";
const LEAVE_YOUR_REVIEW_KEY = "leave_your_review";

const Reviews = ({ t }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const getReviews = async () => {
    const reviewsResponse = await fetchReviews();

    setReviews(reviewsResponse);
  };

  useEffect(() => {
    getReviews();
  }, []);

  const visibleReviews = reviews.filter(({ visible }) => visible);

  return reviews.length ? (
    <section className="reviews-wrapper">
      <section className="title _font-semibold">
        {t(WHAT_CLIENTS_SAY_KEY)}
      </section>
      <section className="slider-wrapper mobile-none">
        <SliderInfinite
          elements={visibleReviews.map((review) => ({
            id: review.id,
            content: (): JSX.Element => <ReviewItem review={review} t={t} />,
          }))}
        />
      </section>
      <section className="mobile-only">
        <Swiper
          elements={visibleReviews.map((review) => ({
            id: review.id,
            content: (): JSX.Element => <ReviewItem review={review} t={t} />,
          }))}
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
