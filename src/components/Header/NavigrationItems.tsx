import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

interface NavigationItemsProps {
  t: (text: string) => string;
}

const NavigationItems = ({ t }: NavigationItemsProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useParams();

  const navigation = [
    { href: "/subscription", title: "Subscription header" },
    { href: "/career", title: "Career header" },
    { href: "/gift", title: "Gift header" },
    { href: "#blog", title: "Blog" },
  ];

  return navigation.map((navItem) => (
    <div
      className={`navigation-wrapper mobile-none ${
        pathname === navItem?.href ? "navigation-wrapper-active" : ""
      } _flex _flex-col _justify-center`}
      key={navItem.title}
    >
      <div
        onClick={() => {
          router.push(`/${lang}${navItem.href}`);
        }}
        className="_px-4 _py-2 link"
      >
        <div className="nav-link text-gradient">{t(navItem.title)}</div>
      </div>
    </div>
  ));
};

export default NavigationItems;
