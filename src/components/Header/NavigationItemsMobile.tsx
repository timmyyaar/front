import React, { Dispatch, SetStateAction, useContext } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { TelegramIcon } from "@/components/common/icons/components/Telegram";
import { WhatsappIcon } from "@/components/common/icons/components/Whatsapp";
import { MessengerIcon } from "@/components/common/icons/components/Messenger";
import { InstIcon } from "@/components/common/icons/components/Inst";
import PhoneIcon from "@/components/common/icons/components/PhoneIcon";
import MailIcon from "@/components/common/icons/components/MailIcon";

interface NavigationItemsMobileProps {
  t: (text: string) => string;
  setIsMenuOpened: Dispatch<SetStateAction<boolean>>;
}

const NavigationItemsMobile = ({
  t,
  setIsMenuOpened,
}: NavigationItemsMobileProps) => {
  const { lang } = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { href: "/order", title: "Services header" },
    { href: "/subscription", title: "Subscription header" },
    { href: "/career", title: "Career header" },
    { href: "/gift", title: "Gift header" },
  ];

  return (
    <div className="_mt-4 _flex _flex-col _gap-10">
      <div>
        {navigation.map((navItem) => (
          <div
            className={`navigation-wrapper-mobile mobile-only-flex _font-semibold ${
              pathname.includes(navItem.href) ? "active" : ""
            } _flex _flex-col _justify-center`}
            key={navItem.title}
          >
            <div
              className="_flex _justify-center _py-2 link"
              onClick={() => {
                if (pathname.includes(navItem.href)) {
                  setIsMenuOpened(false);
                } else {
                  router.push(`/${lang}${navItem.href}`);
                }
              }}
            >
              <div className="nav-link">{t(navItem.title)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="_flex _gap-4 _flex-col _items-center _justify-center">
        <span className="_text-base">Contact info</span>
        <div className="_flex _gap-3">
          <a
            className="icon _flex _flex-col _justify-center"
            href="https://t.me/takeyoourtime"
            target="blanc"
          >
            <TelegramIcon />
          </a>
          <a
            className="icon _flex _flex-col _justify-center"
            href="https://wa.me/48730003997"
            target="blanc"
          >
            <WhatsappIcon />
          </a>
          <a
            className="icon _flex _flex-col _justify-center"
            href="https://m.me/227130810472971"
            target="blanc"
          >
            <MessengerIcon />
          </a>
          <a
            className="icon _flex _flex-col _justify-center"
            href="https://www.instagram.com/takeyourtime_krakow/"
            target="blanc"
          >
            <InstIcon />
          </a>
        </div>
        <div className="_flex _gap-2.5 _justify-center _items-center mobile-sub-header _px-4 _py-2">
          <PhoneIcon />
          <span className="_font-semibold">+48 730 003 997</span>
        </div>
        <div className="_flex _gap-2.5 _justify-center _items-center mobile-sub-header _px-4 _py-2">
          <MailIcon />
          <span className="_font-semibold">Mail: tytimeinbox@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationItemsMobile;
