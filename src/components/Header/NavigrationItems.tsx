import React from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface NavigationItemsProps {
  t: (text: string, defaultText?: string) => string;
}

const NavigationItems = ({ t }: NavigationItemsProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useParams();
  const searchParams = useSearchParams();

  const navigation = [
    { href: "/subscription", title: "Subscription header" },
    { href: "/career", title: "Career header" },
    { href: "/gift", title: "Gift header" },
    { href: "/blogs", title: "Blog" },
  ];

  const city = searchParams.get("city");

  return navigation.map((navItem) => (
    <div
      className={`mobile-none relative text-dark ml-[10%]
        lg:ml-0 cursor-pointer group ${
          pathname === navItem?.href ? "navigation-wrapper-active" : ""
        } flex flex-col justify-center`}
      key={navItem.title}
    >
      <div
        onClick={() => {
          router.push(`/${lang}${navItem.href}${city ? `?city=${city}` : ""}`);
        }}
        className={`px-4 py-2 group-hover:rounded-full group-hover:outline
          group-hover:outline-1 group-hover:outline-primary-light`}
      >
        <div className="nav-link text-gradient">{t(navItem.title)}</div>
      </div>
    </div>
  ));
};

export default NavigationItems;
