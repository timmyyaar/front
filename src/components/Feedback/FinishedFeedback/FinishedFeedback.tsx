import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import happyFeedbackSvg from "../icons/happy-feedback.svg";
import sadFeedbackSvg from "../icons/sad-feedback.svg";
import { LogoIcon } from "@/components/common/icons/components/Logo";

interface FinishedFeedbackProps {
  finishedRating: { [key: string]: number };
  t: (text: string, defaultText?: string) => string;
}

function FinishedFeedback({ finishedRating, t }: FinishedFeedbackProps) {
  const router = useRouter();
  const { lang } = useParams();

  const isBadRating = Object.values(finishedRating).some(
    (rating) => rating < 4
  );

  return (
    <div className="_bg-light _h-screen _py-20 _px-16 _flex _flex-col _items-center _justify-center _gap-10">
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
        <div onClick={() => router.push(`/${lang}`)}>
          <LogoIcon className="_cursor-pointer hover:_opacity-80" />
        </div>
      </>
    </div>
  );
}

export default FinishedFeedback;
