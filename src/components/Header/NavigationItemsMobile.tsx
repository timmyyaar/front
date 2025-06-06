import React, { Dispatch, SetStateAction, useContext } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { TelegramIcon } from "@/components/common/icons/components/Telegram";
import { WhatsappIcon } from "@/components/common/icons/components/Whatsapp";
import { InstIcon } from "@/components/common/icons/components/Inst";
import PhoneIcon from "@/components/common/icons/components/PhoneIcon";
import MailIcon from "@/components/common/icons/components/MailIcon";
import GoogleIcon from "@/components/common/icons/components/Google";
import { sendGAEvent } from "@/google-analytics";

interface NavigationItemsMobileProps {
  t: (text: string, defaultText?: string) => string;
  setIsMenuOpened: Dispatch<SetStateAction<boolean>>;
}

const NavigationItemsMobile = ({
  t,
  setIsMenuOpened,
}: NavigationItemsMobileProps) => {
  const { lang } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigation = [
    { href: "/order", title: "Services header" },
    { href: "/subscription", title: "Subscription header" },
    { href: "/career", title: "Career header" },
    { href: "/gift", title: "Gift header" },
    { href: "#blog", title: "Blog" },
  ];

  const trackSocialMediaClick = (socialMedia: string) => {
    sendGAEvent({
      action: "social_media_click",
      category: "social_media",
      label: "Clicked on social media icon",
      value: socialMedia,
    });
  };

  const city = searchParams.get("city");

  return (
    <div className="mt-4 flex flex-col gap-10">
      <div>
        {navigation.map((navItem) => (
          <div
            className={`mobile-only-flex font-semibold ${
              pathname.includes(navItem.href) ? "text-dark" : ""
            } flex flex-col justify-center`}
            key={navItem.title}
          >
            <div
              className="flex justify-center py-2"
              onClick={() => {
                if (pathname.includes(navItem.href)) {
                  setIsMenuOpened(false);
                } else {
                  router.push(
                    `/${lang}${navItem.href}${city ? `?city=${city}` : ""}`,
                  );
                  setIsMenuOpened(false);
                }
              }}
            >
              <div className="nav-link">{t(navItem.title)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 flex-col items-center justify-center">
        <span className="text-base">Contact info</span>
        <div className="flex gap-3">
          <a
            className="icon flex flex-col justify-center"
            href="https://t.me/takeyourtime_pln"
            target="_blank"
            onClick={() => trackSocialMediaClick("Telegram")}
          >
            <TelegramIcon />
          </a>
          <a
            className="icon flex flex-col justify-center"
            href="https://wa.me/48730003997"
            target="_blank"
            onClick={() => trackSocialMediaClick("WhatsApp")}
          >
            <WhatsappIcon />
          </a>
          <a
            className="icon flex flex-col justify-center"
            href="https://www.instagram.com/takeyourtime_pln/"
            target="_blank"
            onClick={() => trackSocialMediaClick("Instagram")}
          >
            <InstIcon />
          </a>
          <a
            className="icon flex flex-col justify-center"
            href="https://maps.app.goo.gl/uTEhCrLkdEXG6DDd8"
            target="_blank"
            onClick={() => trackSocialMediaClick("Google")}
          >
            <GoogleIcon />
          </a>
        </div>
        <div
          className={`flex gap-2.5 justify-center items-center text-lg
            text-dark px-4 py-2`}
        >
          <span className="text-gradient">
            <PhoneIcon />
          </span>
          <span className="font-semibold text-gradient">+48 730 003 997</span>
        </div>
        <div
          className={`flex gap-2.5 justify-center items-center
            text-lg text-dark px-4 py-2`}
        >
          <MailIcon />
          <span className="font-semibold text-gradient">
            Mail: tytimeinbox@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavigationItemsMobile;
