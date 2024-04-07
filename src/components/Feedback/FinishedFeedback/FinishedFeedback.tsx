import "./style.scss";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import happyFeedbackSvg from "../icons/happy-feedback.svg";
import sadFeedbackSvg from "../icons/sad-feedback.svg";
import { LogoIcon } from "@/components/Header/icons/Logo";

interface FinishedFeedbackProps {
  finishedRating: { [key: string]: number };
  t: (text: string) => string;
}

function FinishedFeedback({ finishedRating, t }: FinishedFeedbackProps) {
  const router = useRouter();
  const { lang } = useParams();

  const isBadRating = Object.values(finishedRating).some(
    (rating) => rating < 4
  );

  return (
    <div className="feedback-result _h-screen _py-20 _px-16 _flex _flex-col _items-center _justify-center _gap-10">
      <>
        <Image src={isBadRating ? sadFeedbackSvg : happyFeedbackSvg} alt="" />
        <span className="text-center">
          {isBadRating ? (
            <>
              <span className="_font-semibold _mr-1">
                {t("feedback_thank_you")}.
              </span>
              {t("feedback_bad")}
            </>
          ) : (
            <>
              <span className="_font-semibold _mr-1">
                {t("feedback_thank_you_happy")!}
              </span>
              {t("feedback_good")}
            </>
          )}
        </span>
        <div onClick={() => router.replace(`/${lang}`)}>
          <LogoIcon className="_cursor-pointer feedback-logo" />
        </div>
      </>
    </div>
  );
}

export default FinishedFeedback;
