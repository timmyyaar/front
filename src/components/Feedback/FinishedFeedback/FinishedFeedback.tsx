import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const isBadRating = Object.values(finishedRating).some(
    (rating) => rating < 4,
  );

  return (
    <div className="bg-light h-screen py-20 px-16 flex flex-col items-center justify-center gap-10">
      <>
        <Image src={isBadRating ? sadFeedbackSvg : happyFeedbackSvg} alt="" />
        <span className="text-center">
          {isBadRating ? (
            <>
              <span className="font-semibold mr-1">
                {t("feedback_thank_you")}.
              </span>
              {t("feedback_bad")}
            </>
          ) : (
            <>
              <span className="font-semibold mr-1">
                {t("feedback_thank_you_happy")!}
              </span>
              {t("feedback_good")}
            </>
          )}
        </span>
        <div onClick={() => router.push(`/${lang}?${searchParams.toString()}`)}>
          <LogoIcon className="cursor-pointer hover:opacity-80" />
        </div>
      </>
    </div>
  );
}

export default FinishedFeedback;
