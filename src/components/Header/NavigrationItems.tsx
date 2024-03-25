import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface NavigationItemsProps {
  t: (text: string) => string;
}

const NavigationItems = ({ t }: NavigationItemsProps) => {
  const pathname = usePathname();

  const navigation = [
    { href: "/subscription", title: "Subscription header" },
    { href: "/career", title: "Career header" },
    { href: "/gift", title: "Gift header" },
  ];

  return navigation.map((navItem) => (
    <div
      className={`navigation-wrapper mobile-none ${
        pathname === navItem.href ? "navigation-wrapper-active" : ""
      } _flex _flex-col _justify-center`}
      key={navItem.title}
    >
      <Link href={navItem.href || "/"} className="_px-4 _py-2">
        <div className="nav-link">{t(navItem.title)}</div>
      </Link>
    </div>
  ));
};

export default NavigationItems;
